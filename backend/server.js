const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const studentModel = require("./models/student");
const authModel = require("./models/authentication");


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
app.post("/add", isLoggedin, isAdmin, async (req, res) => {
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
        
        res.cookie("token", token);
        res.status(200).send("Logged In Successfully");
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/logout", (req, res) => {
    res.clearCookie('token');
    res.redirect("/login");
});

// route 3(all students)
app.get("/students", isLoggedin, isAdmin, async (req, res) => {
    try {
        const students = await studentModel.find(); 
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).send("An error occurred while fetching students.");
    }
});



// Route to get student by PRN
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
  app.get('/deployed', isLoggedin, isAdmin, async (req, res) => {
    try {
      const deployedStudents = await studentModel.find({ deployed: true });
      res.json(deployedStudents);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching deployed students' });
    }
  });   
  

  // Route to update student details by PRN
app.put("/studentup/:prn", isLoggedin, isAdmin, async (req, res) => {
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


app.listen(3000, () => {
    console.log("Working!");
});


//apis:
// 1. localhost:3000/login?email=admin@test.com&password=admin@test.com
// 2. localhost:3000/logout
// 3. localhost:3000/students
// 4. localhost:3000/student/:prn
// 5. localhost:3000/freezed
// 6. localhost:3000/deployed
// 7. localhost:3000/studentup

//Points to be covered:
//koni tari ekda department wise, class wise, year wise, kasa segration karaychay te bgha pls.
//Authentication module(Done).
//Students Module(Done).
//Render all students(Done).
// Render prn, Freezed and deployed students(Done).
// Update student info(Done).
// add new students login details(done);
// Ajun konala kahi watla tr changes kara cause me bhi sikh hi raha hu basics se.
