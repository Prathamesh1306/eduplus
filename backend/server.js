const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
app.use(cors());
app.use(express.json());

const studentModel = require("./models/student");
const authModel = require("./models/authentication");


const generateAndSaveHashes = require('./models/generateAllStudentsHash'); // Import the function

app.get('/hash/generate-and-save', async (req, res) => {
    try {
        const result = await generateAndSaveHashes();
        res.status(200).send(result);
    } catch (error) {
        console.error('Error generating and saving hashes:', error);
        res.status(500).send('Error generating and saving hashes');
    }
});



//middlewares:

function isLoggedin(req, res, next) {
    if (!req.cookies.token) return res.status(401).send("You must be logged in");
    try {
        let data = jwt.verify(req.cookies.token, "shhh");
        req.user = data;
        next();
    } catch (err) {
        res.status(401).send("Invalid Token");
    }
}

function isStudent(req, res, next){
    if (req.user.role === 'student') {
        return next();
    }
    return res.status(403).json({ message: "Access Denied. User is not a Student." });
};

function isAdmin(req, res, next){
    if (req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: "Access Denied. User is not an Admin." });
};

function isEmployer(req, res, next){
    if (req.user.role === 'employer') {
        return next();
    }
    return res.status(403).json({ message: "Access Denied. User is not an Employer." });
};



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/edu", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.get("/", (req, res) => {
    res.send("Page 1");
});


//route1(Adding new data if few, in case needed in future)
// app.post("/add", isLoggedin, isAdmin, async (req, res) => {
app.post("/add",  async (req, res) => {
    const { username, email, password, role } = req.body;
    try {        
        const existingUser = await authModel.findOne({ email });
        if (existingUser) return res.status(400).send("User Already Exists!");        
        
        
        const createdUser = await authModel.create({
            username,
            email,
            password,
            role,
        });
       
        const token = jwt.sign(
            { email: email, user: createdUser._id, username: username, role: createdUser.role },
            "shhh"
        );
        
        res.cookie("token", token);
        res.status(201).send("Registered Successfully");
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send("Internal Server Error");
    }
});





app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(404).send("No User Found!");
        }


        if (password !== user.password) {
            return res.status(401).send("Invalid Credentials");
        }
        
        const token = jwt.sign(
            {
                email: user.email,
                user: user._id,
                username: user.username,
                role: user.role,
            },
            "shhh", 
            { expiresIn: "1h" } 
        );
        
        res.cookie("token", token, {httpOnly: false, secure: false, sameSite: 'lax'});
        res.status(200).send({message:"Logged In Successfully", role:user.role});
        
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
    console.log("login succesful")
});


app.get("/logout", (req, res) => {
    res.clearCookie('token');
    res.redirect("/login");
});

// route 3(all students)
// app.get("/students", isLoggedin, isAdmin, async (req, res) => {
  app.get("/students",  async (req, res) => {
    try {
        const students = await studentModel.find(); 
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).send("An error occurred while fetching students.");
    }
    console.log("/students ")
});



app.get('/view/students', async (req, res) => {
  try {
    const students = await studentModel.find({}, 'prn name status'); 
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});



app.post('/students/update-status',  async (req, res) => {
  const { prns } = req.body;
  if (!prns || prns.length === 0) {
    return res.status(400).json({ error: 'No PRNs provided' });
  }
  try {    
    const updatedStudents = await studentModel.updateMany(
      { prn: { $in: prns } },
      [{ $set: { status: { $not: '$status' } } }] 
    );
    if (updatedStudents.matchedCount === 0) {
      return res.status(404).json({ error: 'No students found with the provided PRNs' });
    }
    res.json({ success: true, message: 'Statuses updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
    }
  });


app.get('/view/students/updated', async (req, res) => {
  try {
    const students = await studentModel.find({status: true, deployed: false}, 'prn name status deployed'); 
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.post('/students/update-deployed',  async (req, res) => {
  const { prns } = req.body;
  if (!prns || prns.length === 0) {
    return res.status(400).json({ error: 'No PRNs provided' });
  }
  try {    
    const updatedStudents = await studentModel.updateMany(
      { prn: { $in: prns } },
      [{ $set: { status: { $not: '$deployed' } } }] 
    );
    if (updatedStudents.matchedCount === 0) {
      return res.status(404).json({ error: 'No students found with the provided PRNs' });
    }
    res.json({ success: true, message: 'deployed updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update deployed' });
    }
  });

// Route to get student by PRN
// app.get("/student/:prn", isLoggedin, isAdmin, async (req, res) => {
  app.get("/student/:prn", isLoggedin, isAdmin, async (req, res) => {
    const { prn } = req.params;    
    try {        
        const student = await studentModel.findOne({ prn });    
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }        
        res.status(200).json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "An error occurred while fetching the student." });
    }
});



// route 4(all freezed students)
// app.get('/freezed', isLoggedin, isAdmin, async (req, res) => {
  app.get('/freezed', isLoggedin, isAdmin, async (req, res) => {
    try {        
        const freezedStudents = await studentModel.find({ status: true }); 
        res.status(200).json(freezedStudents);
    } catch (err) {
        console.error("Error fetching freezed students:", err);
        res.status(500).json({ message: 'Error fetching freezed students' });
    }
});



// route 6(all deployed students)  
  // app.get('/deployed', isLoggedin, isAdmin, async (req, res) => {
    app.get('/deployed', async (req, res) => {
    try {
      const deployedStudents = await studentModel.find({ deployed: true });
      res.json(deployedStudents);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching deployed students' });
    }
  });   
  

  // Route to update student details by PRN
// app.put('/studentup/:prn', isLoggedin, isAdmin, async (req, res) => {
  app.put("/studentup/:prn",  async (req, res) => {
    const { prn } = req.params; 
    const updateData = req.body;
    
    try {
        const updatedStudent = await studentModel.findOneAndUpdate(
            { prn },
            { $set: updateData }, 
            { new: true } 
        );        
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        
        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "An error occurred while updating the student." });
    }
});


app.get("/generate-pdf/:prn", async (req, res) => {
  const { prn } = req.params;
  try {
    const student = await studentModel.findOne({ prn });
    if (!student) {
      return res.status(404).send("Student not found");
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    page.drawText("Grade Card", {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`PRN: ${student.prn}`, { x: 50, y: height - 80, size: 12 });
    page.drawText(`Seat No: ${student.seatNo}`, {
      x: 50,
      y: height - 100,
      size: 12,
    });
    page.drawText(`Name: ${student.name}`, {
      x: 50,
      y: height - 120,
      size: 12,
    });
    page.drawText(`Mother's Name: ${student.motherName}`, {
      x: 50,
      y: height - 140,
      size: 12,
    });
    page.drawText(`Programme: ${student.programme}`, {
      x: 50,
      y: height - 160,
      size: 12,
    });

    let yOffset = height - 190;
    student.semesters.forEach((semester) => {
      page.drawText(`Semester ${semester.semester}`, {
        x: 50,
        y: yOffset,
        size: 14,
      });
      page.drawText(`Exam Date: ${semester.examDate}`, {
        x: 50,
        y: yOffset - 20,
        size: 12,
      });
      page.drawText(`SGPA: ${semester.sgpa}`, {
        x: 50,
        y: yOffset - 40,
        size: 12,
      });

      page.drawText("Course Code", { x: 50, y: yOffset - 60, size: 12 });
      page.drawText("Course Title", { x: 150, y: yOffset - 60, size: 12 });
      page.drawText("Credits", { x: 300, y: yOffset - 60, size: 12 });
      page.drawText("CIE", { x: 350, y: yOffset - 60, size: 12 });
      page.drawText("ESE", { x: 400, y: yOffset - 60, size: 12 });
      page.drawText("Final Grade", { x: 450, y: yOffset - 60, size: 12 });

      yOffset -= 80;
      semester.courses.forEach((course) => {
        page.drawText(course.code, { x: 50, y: yOffset, size: 12 });
        page.drawText(course.title, { x: 150, y: yOffset, size: 12 });
        page.drawText(course.credits.toString(), {
          x: 300,
          y: yOffset,
          size: 12,
        });
        page.drawText(course.cie, { x: 350, y: yOffset, size: 12 });
        page.drawText(course.ese, { x: 400, y: yOffset, size: 12 });
        page.drawText(course.finalGrade, { x: 450, y: yOffset, size: 12 });
        yOffset -= 20;
      });

      yOffset -= 30;
    });

    page.drawText(`CGPA: ${student.cgpa}`, { x: 50, y: yOffset, size: 14 });

    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(__dirname, `GradeCard_${prn}.pdf`);
    fs.writeFileSync(filePath, pdfBytes);

    res.json({ pdfUrl: `http://localhost:3000/download-pdf/${prn}` });
  } catch (error) {
    res.status(500).send("Error generating PDF");
  }
});

app.get("/download-pdf/:prn", (req, res) => {
  const { prn } = req.params;
  const filePath = path.join(__dirname, `GradeCard_${prn}.pdf`);
  res.download(filePath, `GradeCard_${prn}.pdf`, (err) => {
    if (err) {
      res.status(500).send("Error downloading PDF");
    }
  });
});

app.listen(3000, () => {
  console.log("Working!");
});

// app.listen(3000, () => {
//     console.log("Working!");
// });


//apis:
// 1. localhost:3000/login?email=admin@test.com&password=admin@test.com  post
// 2. localhost:3000/logout  post
// 3. localhost:3000/students get
// 4. localhost:3000/student/:prn get
// 5. localhost:3000/freezed get
// 6. localhost:3000/deployed get 
// 7. localhost:3000/studentup put 
// 8. localhost:3000/generate-pdf/:prn get 
// 9. localhost:3000/download-pdf/:prn get

//Points to be covered:
//koni tari ekda department wise, class wise, year wise, kasa segration karaychay te bgha pls.
//Authentication module(Done).
//Students Module(Done).
//Render all students(Done).
// Render prn, Freezed and deployed students(Done).
// Update student info(Done).
// add new students login details(done);
// Ajun konala kahi watla tr changes kara cause me bhi sikh hi raha hu basics se.


// database name: edu
// dummy data students collection:
// Insert multiple dummy data
// db.students.insertMany([
//   {
//     prn: "1",
//     seatNo: "1",
//     name: "John Doe",
//     motherName: "Jane Doe",
//     programme: "BACHELOR OF TECHNOLOGY (COMPUTER ENGINEERING)",
//     year: "Second Year",
//     registrationYear: "2022-23",
//     cgpa: 8.50,
//     status: true,
//     deployed: false,
//     semesters: [
//       {
//         semester: 4,
//         examDate: "MAY 2024",
//         sgpa: 8.84,
//         courses: [
//           { code: "BTECECE22401", title: "THEORY OF COMPUTATION", credits: 3, cie: "A", ese: "A", finalGrade: "A" },
//           { code: "BTECECE22402", title: "DBMS", credits: 3, cie: "O", ese: "O", finalGrade: "O" }
//         ]
//       }
//     ]
//   },
//   {
//     prn: "2",
//     seatNo: "2",
//     name: "Alice Smith",
//     motherName: "Maria Smith",
//     programme: "BACHELOR OF TECHNOLOGY (COMPUTER ENGINEERING)",
//     year: "Third Year",
//     registrationYear: "2021-22",
//     cgpa: 9.10,
//     status: true,
//     deployed: true,
//     semesters: [
//       {
//         semester: 6,
//         examDate: "MAY 2024",
//         sgpa: 9.20,
//         courses: [
//           { code: "BTECECE22601", title: "ARTIFICIAL INTELLIGENCE", credits: 4, cie: "O", ese: "O", finalGrade: "O" },
//           { code: "BTECECE22602", title: "COMPUTER NETWORKS", credits: 3, cie: "A", ese: "A", finalGrade: "A" }
//         ]
//       }
//     ]
//   },
//   {
//     prn: "3",
//     seatNo: "3",
//     name: "Bob Johnson",
//     motherName: "Emily Johnson",
//     programme: "BACHELOR OF TECHNOLOGY (MECHANICAL ENGINEERING)",
//     year: "First Year",
//     registrationYear: "2023-24",
//     cgpa: 7.50,
//     status: false,
//     deployed: false,
//     semesters: [
//       {
//         semester: 2,
//         examDate: "DEC 2023",
//         sgpa: 7.30,
//         courses: [
//           { code: "BTMECE22301", title: "ENGINEERING MECHANICS", credits: 3, cie: "B", ese: "B", finalGrade: "B" },
//           { code: "BTMECE22302", title: "MATERIAL SCIENCE", credits: 3, cie: "B", ese: "B", finalGrade: "B" }
//         ]
//       }
//     ]
//   },
//   {
//     prn: "4",
//     seatNo: "4",
//     name: "Charlie Davis",
//     motherName: "Laura Davis",
//     programme: "BACHELOR OF TECHNOLOGY (ELECTRONICS ENGINEERING)",
//     year: "Final Year",
//     registrationYear: "2020-21",
//     cgpa: 8.00,
//     status: true,
//     deployed: true,
//     semesters: [
//       {
//         semester: 8,
//         examDate: "MAY 2024",
//         sgpa: 8.50,
//         courses: [
//           { code: "BTEECE22801", title: "DIGITAL SIGNAL PROCESSING", credits: 3, cie: "O", ese: "O", finalGrade: "O" },
//           { code: "BTEECE22802", title: "CONTROL SYSTEMS", credits: 3, cie: "A", ese: "A", finalGrade: "A" }
//         ]
//       }
//     ]
//   },
//   {
//     prn: "5",
//     seatNo: "5",
//     name: "Diana Perez",
//     motherName: "Sophia Perez",
//     programme: "BACHELOR OF TECHNOLOGY (INFORMATION TECHNOLOGY)",
//     year: "Second Year",
//     registrationYear: "2022-23",
//     cgpa: 8.75,
//     status: true,
//     deployed: false,
//     semesters: [
//       {
//         semester: 4,
//         examDate: "MAY 2024",
//         sgpa: 8.90,
//         courses: [
//           { code: "BTITCE22401", title: "OPERATING SYSTEMS", credits: 3, cie: "O", ese: "O", finalGrade: "O" },
//           { code: "BTITCE22402", title: "SOFTWARE ENGINEERING", credits: 3, cie: "A", ese: "A", finalGrade: "A" }
//         ]
//       }
//     ]
//   }
// ]);


// *dummy data authentication collection:

// db.authentications.insertMany([
//   {
//     username: "Aryan Giri",
//     email: "aryan@test.com",
//     password: "aryan@test.com",
//     role: "student"
//   },
//   {
//     username: "Mustafa Nasikwala",
//     email: "mustafa@test.com",
//     password: "mustafa@test.com",
//     role: "student"
//   },
//   {
//     username: "admin",
//     email: "admin@test.com",
//     password: "admin@test.com",
//     role: "admin"
//   }
// ]);
