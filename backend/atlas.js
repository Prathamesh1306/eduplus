const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const QRCode = require("qrcode");
const crypto = require("crypto");
const path = require("path");
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));
const multer = require("multer");
app.use(express.json());
const port = 3000;
const hostname = "localhost";
const { MongoClient } = require("mongodb");
const uri ="mongodb+srv://mmn:W6vZGtD7Mek6lCN4@cluster0.0z7r0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);
const db = client.db("edu");
//const studentModel = require("./models/student");
const studentModel = db.collection("students");
const verifierModel = db.collection("verifier");
//const authModel = require("./models/authentication");
const authModel = db.collection("authentications");
const Transaction = db.collection("transactions");
// const PDFDocument = require('pdfkit');

// =================================================================
// const generateAndSaveHashes = require("./models/generateAllStudentsHash"); // Import the function

/*app.get("/hash/generate-and-save", async (req, res) => {
      try {
        const result = await generateAndSaveHashes();
        res.status(200).send(result);
      } catch (error) {
        console.error("Error generating and saving hashes:", error);
        res.status(500).send("Error generating and saving hashes");
      }
    });*/
app.post("/change-verifier", async (req, res) => {
  try {
    // Extract email from request body
    const { email } = req.body;

    if (!email) {
      return res.status(400).send("Verifier email is required.");
    }

    // Find the verifier by email
    const verifier = await verifierModel.findOne({ email });
    if (!verifier) {
      return res.status(404).send("Verifier not found.");
    }

    // Toggle the `verify` status
    const updatedVerifier = await verifierModel.updateOne(
      { email }, // Filter by email
      { $set: { verify: !verifier.verify } } // Toggle the `verify` status
    );

    res
      .status(200)
      .send(
        `Verifier status updated to ${!verifier.verify ? "true" : "false"}.`
      );
  } catch (error) {
    console.error("Error updating verifier status:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Define the POST endpoint to handle the update
app.post("/update-transaction", async (req, res) => {
  const { prn, transactionHash } = req.body;

  if (!prn || !transactionHash) {
    return res.status(400).send("Missing required fields.");
  }

  try {
    // Update student `deployed` status
    const student = await studentModel.findOneAndUpdate(
      { prn: prn },
      { $set: { deployed: true } },
      { returnDocument: "after" }
    );

    if (!student.value) {
      return res.status(404).send("Student not found.");
    }

    // Save the transaction
    // await Transaction.insertOne({ prn, transactionHash });

    res.status(200).send("Transaction saved and student status updated.");
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).send("Internal server error.");
  }
});

// app.post("/update-transaction", async (req, res) => {
//   const { prn, deployed } = req.body;

//   console.log("Received PRN:", prn); // Debugging: Ensure we are receiving the correct PRN.

//   try {
//     const student = await studentModel.findOne({ prn });
//     if (!student) {
//       console.log("Student not found with PRN:", prn); // Debugging: Log if student not found.
//       return res.status(404).send("Student not found");
//     }

//     student.deployed = deployed;
//     await student.save();

//     res.status(200).send("Student deployment status updated successfully");
//   } catch (error) {
//     console.error("Error updating transaction:", error); // Log the actual error.
//     res.status(500).send("Error updating transaction");
//   }
// });

// export default app;
// =================================================================
app.get("/get-deployed-prns", async (req, res) => {
  try {
    const transactions = await Transaction.find(
      {},
      { projection: { prn: 1 } }
    ).toArray();
    const prns = transactions.map((transaction) => transaction.prn);

    res.status(200).json(prns);
  } catch (error) {
    console.error("Error fetching deployed PRNs:", error);
    res.status(500).json({ message: "Failed to fetch deployed PRNs." });
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

function isStudent(req, res, next) {
  if (req.user.role === "student") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access Denied. User is not a Student." });
}

function isAdmin(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access Denied. User is not an Admin." });
}

function isverifier(req, res, next) {
  if (req.user.role === "verifier") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access Denied. User is not an verifier." });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());

/*mongoose.connect("mongodb://localhost:27017/edu", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });*/

app.get("/", (req, res) => {
  res.send("Page 1");
});

//route1(Adding new data if few, in case needed in future)
// app.post("/add", isLoggedin, isAdmin, async (req, res) => {
app.post("/add", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await authModel.findOne({ email });
    if (existingUser) return res.status(400).send("User Already Exists!");
    const role = "verifier";
    const createdUser = await authModel.insertOne({
      username,
      email,
      password,
      role,
    });

    const token = jwt.sign(
      {
        email: email,
        user: createdUser._id,
        username: username,
        role: createdUser.role,
      },
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
    const student = await studentModel.findOne({ email });
    if (!user) {
      return res.status(404).send("No User Found!");
    }

    if (password !== user.password) {
      return res.status(401).send("Invalid Credentials");
    }
    if (student) {
      const token = jwt.sign(
        {
          email: user.email,
          user: user._id,
          prn: student.prn,
          username: user.username,
          role: user.role,
        },
        "shhh",
        { expiresIn: "1h" }
      );
      res.cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "lax",
      });
      res
        .status(200)
        .send({ message: "Logged In Successfully", role: user.role, token });
    } else {
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
      res.cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "lax",
      });
      res
        .status(200)
        .send({ message: "Logged In Successfully", role: user.role, token });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
  console.log("login succesful");
});
app.get("/get-verifier", async (req, res) => {
  try {
    const verifier = await authModel.find({ role: "verifier" }).toArray();

    if (!verifier || verifier.length === 0) {
      return res.status(404).send("No verifier");
    }

    res.status(200).json(verifier);
  } catch (error) {
    console.error("Error fetching verifier:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get-not-verifier", async (req, res) => {
  try {
    const verifier = await verifierModel.find({ verify: false }).toArray();

    if (!verifier || verifier.length === 0) {
      return res.status(404).send("No verifier");
    }

    res.status(200).json(verifier);
  } catch (error) {
    console.error("Error fetching verifier:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.post("/add-all-verifiers", async (req, res) => {
  try {
    // Fetch all users with the role "verifier" from authModel
    const verifiers = await authModel.find({ role: "verifier" }).toArray();

    if (!verifiers || verifiers.length === 0) {
      return res.status(404).send("No verifiers found in authModel.");
    }

    // Loop through verifiers and add to verifierModel if not already present
    console.log(verifiers);
    for (const verifier of verifiers) {
      const existingVerifier = await verifierModel.findOne({
        email: verifier.email,
      });

      if (!existingVerifier) {
        await verifierModel.insertOne({
          email: verifier.email,
          verify: false, // Default value for verify field
          students: [], // Initialize students array as empty
        });
      }
    }

    res.status(201).send("Verifiers added to verifierModel successfully.");
  } catch (error) {
    console.error("Error adding verifiers to verifierModel:", error);
    res.status(500).send("Internal Server Error.");
  }
});
app.get("/get-all-verifiers", async (req, res) => {
  try {
    // Fetch all verifiers from the verifierModel
    const verifiers = await verifierModel.find({}).toArray();

    if (!verifiers || verifiers.length === 0) {
      return res.status(404).send("No verifiers found in verifierModel.");
    }

    res.status(200).json(verifiers);
  } catch (error) {
    console.error("Error fetching verifiers from verifierModel:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// route 3(all students)
// app.get("/students", isLoggedin, isAdmin, async (req, res) => {
app.get("/students", async (req, res) => {
  try {
    const students = await studentModel.find().toArray();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).send("An error occurred while fetching students.");
  }
  console.log("/students ");
});

// ==============================new logic

// const path = require("path");
// const fs = require("fs");

app.get("/student/:prn", async (req, res) => {
  const { prn } = req.params;
  try {
    const student = await studentModel.findOne({ prn });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the student." });
  }
});

app.get("/student/pdf/:prn", async (req, res) => {
  const { prn } = req.params;
  const filePath = path.join(__dirname, `GradeCard_${prn}.pdf`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "PDF not found" });
  }
  res.sendFile(filePath);
});

// ==============================new logic end

app.get("/view/students", async (req, res) => {
  try {
    const students = await studentModel
      .find({}, { projection: { prn: 1, name: 1, status: 1, dataHash: 1 } })
      .toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.post("/students/update-status", async (req, res) => {
  const { prns } = req.body;
  if (!prns || prns.length === 0) {
    return res.status(400).json({ error: "No PRNs provided" });
  }
  try {
    const updatedStudents = await studentModel.updateMany(
      { prn: { $in: prns } },
      { $set: { status: true } }
    );

    if (updatedStudents.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "No students found with the provided PRNs" });
    }
    res.json({ success: true, message: "Statuses updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

app.get("/view/students/updated", async (req, res) => {
  try {
    const students = await studentModel
      .find(
        { status: true, deployed: false },
        { projection: { prn: 1, name: 1, status: 1, dataHash: 1, deployed: 1 } }
      )
      .toArray();

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.get("/view/students/updated-to-verify-student", async (req, res) => {
  try {
    // Fetch all students without filters
    const students = await studentModel
      .find(
        {},
        {
          projection: {
            prn: 1,
            name: 1,
            seatNo: 1,
            motherName: 1,
            programme: 1,
            cgpa: 1,
            semesters: 1,
            dataHash: 1,
            deployed: 1,
            status: 1,
          },
        }
      )
      .toArray();

    // Respond with the full student data
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.post("/students/update-deployed", async (req, res) => {
  const { prns } = req.body;
  if (!prns || prns.length === 0) {
    return res.status(400).json({ error: "No PRNs provided" });
  }
  try {
    const updatedStudents = await studentModel.updateMany(
      { prn: { $in: prns } },
      { $set: { deployed: true } }
    );

    if (updatedStudents.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "No students found with the provided PRNs" });
    }
    res.json({ success: true, message: "deployed updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update deployed" });
  }
});

// Route to get student by PRN
// app.get("/student/:prn", isLoggedin, isAdmin, async (req, res) => {
app.get("/student/", async (req, res) => {
  const { prn } = req.body;
  try {
    const student = await studentModel.findOne({ prn });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the student." });
  }
});

app.get("/freezed", async (req, res) => {
  try {
    const freezedStudents = await studentModel
      .find(
        {
          status: true,
          deployed: false,
        },
        {
          projection: {
            prn: 1,
            name: 1,
            seatNo: 1,
            motherName: 1,
            programme: 1,
            cgpa: 1,
            semesters: 1,
            dataHash: 1,
            deployed: 1,
            status: 1,
          },
        }
      )
      .toArray();
    res.status(200).json(freezedStudents);
  } catch (err) {
    console.error("Error fetching freezed students:", err);
    res.status(500).json({ message: "Error fetching freezed students" });
  }
});

app.post("/freeze-student", async (req, res) => {
  const { prn } = req.body;
  if (!prn) {
    return res.status(400).json({ error: "No PRNs provided" });
  }
  try {
    /* const updatedStudents = await studentModel.updateOne(
      { prn: { $in: prns } },
      [{ $set: { status: { $not: "$status" } } }],
    );*/

    const updatedStudents = await studentModel.updateOne(
      { prn },
      { $set: { status: true } }
    );
    if (updatedStudents.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "No students found with the provided PRN" });
    }
    res.json({ success: true, message: "Statuses updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});
//findOneAndUpdate;
// route 6(all deployed students)
// app.get('/deployed', isLoggedin, isAdmin, async (req, res) => {
app.get("/deployed", async (req, res) => {
  try {
    const deployedStudents = await studentModel
      .find(
        { deployed: true },
        { projection: { prn: 1, name: 1, dataHash: 1 } }
      )
      .toArray();

    res.json(deployedStudents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching deployed students" });
  }
});

// Route to update student details by PRN
// app.put('/studentup/:prn', isLoggedin, isAdmin, async (req, res) => {
app.put("/studentup/:prn", async (req, res) => {
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
    res
      .status(500)
      .json({ message: "An error occurred while updating the student." });
  }
});
//encryption functions to encrypt & decrypt student's prn in qr code
//currently only prn and name is being encrypted
const encryptionKey = "0123456789abcdef0123456789abcdef";
const iv = Buffer.from("f2645f16b9c8808f41ea777eda8283bb", "hex");
function encryptData(data) {
  const iv = Buffer.from("f2645f16b9c8808f41ea777eda8283bb", "hex");
  console.log(iv);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv
  );
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { encryptedData: encrypted, iv: iv.toString("hex") };
}

function decryptData(encryptedData, iv) {
  console.log("Encrypted data:", encryptedData);
  console.log("IV", iv);
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  console.log("Decrypted data:", decrypted);
  return decrypted;
}

app.get("/scan-qrcode/:encryptedData", async (req, res) => {
  const iv = "f2645f16b9c8808f41ea777eda8283bb";

  const { encryptedData } = req.params;
  console.log("Received Encrypted Data:", encryptedData);

  try {
    const prn = decryptData(encryptedData, iv);
    console.log("Decrypted PRN:", prn);

    const student = await studentModel.findOne({ prn });
    if (!student) {
      console.error(`Student with PRN ${prn} not found`);
      return res.status(404).json({ message: "Student not found" });
    }

    const filePath = path.join(__dirname, `GradeCard_${prn}.pdf`);
    return res.download(filePath, `GradeCard_${prn}.pdf`, (err) => {
      if (err) {
        res.status(500).send("Error downloading PDF");
      }
    });
    const downloadLink = `http://${hostname}:3000/download-pdf/${prn}`;
    //return res.status(200).json({ downloadUrl: downloadLink });
  } catch (error) {
    console.error("Dal main kuch kala hai:");
    res.status(400).json({ message: "Kuch to Gadbad hai daya" });
  }
});
//dont change pdf routes
app.post("/generate-pdf", async (req, res) => {
  const { prn } = req.body;

  console.log("Received PRN for PDF generation:", req.body);

  try {
    const student = await studentModel.findOne({ prn });
    if (!student) {
      console.error(`Student with PRN ${prn} not found`);
      return res.status(404).send("Student not found");
    }

    const { iv: encryptedIv, encryptedData } = encryptData(prn);

    const qrCodeText = `http://${hostname}:3000/scan-qrcode/${encryptedData}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeText);
    const pdfDoc = await PDFDocument.create();
    const width = 600;
    const height = 800;

    for (const semester of student.semesters) {
      const page = pdfDoc.addPage([width, height]);

      const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl);
      const qrCodeDims = qrCodeImage.scale(0.5);

      page.drawImage(qrCodeImage, {
        x: 450,
        y: height - 150,
        width: qrCodeDims.width,
        height: qrCodeDims.height,
      });

      page.drawText(`Grade Card`, {
        x: 50,
        y: height - 50,
        size: 20,
        color: rgb(0, 0, 0),
      });
      page.drawText(`PRN: ${student.prn}`, { x: 50, y: height - 80, size: 10 });
      page.drawText(`Seat No: ${student.seatNo}`, {
        x: 50,
        y: height - 100,
        size: 10,
      });
      page.drawText(`Name: ${student.name}`, {
        x: 50,
        y: height - 120,
        size: 10,
      });
      page.drawText(`Mother's Name: ${student.motherName}`, {
        x: 50,
        y: height - 140,
        size: 10,
      });
      page.drawText(`Programme: ${student.programme}`, {
        x: 50,
        y: height - 160,
        size: 10,
      });

      let yOffset = height - 190;
      page.drawText(`Semester ${semester.semester}`, {
        x: 50,
        y: yOffset,
        size: 14,
      });
      page.drawText(`Exam Date: ${semester.examDate}`, {
        x: 50,
        y: yOffset - 20,
        size: 10,
      });
      if (semester.sgpa != null) {
        page.drawText(`SGPA: ${semester.sgpa}`, {
          x: 50,
          y: yOffset - 40,
          size: 10,
        });
      }

      page.drawText("Course Code", { x: 50, y: yOffset - 60, size: 10 });
      page.drawText("Course Title", { x: 110, y: yOffset - 60, size: 10 });
      page.drawText("Credits", { x: 380, y: yOffset - 60, size: 10 });
      page.drawText("CIE", { x: 435, y: yOffset - 60, size: 10 });
      page.drawText("ESE", { x: 475, y: yOffset - 60, size: 10 });
      page.drawText("Final Grade", { x: 510, y: yOffset - 60, size: 10 });
      yOffset -= 80;

      for (const course of semester.courses) {
        page.drawText(course.code, { x: 50, y: yOffset, size: 9 });
        page.drawText(course.title, { x: 110, y: yOffset, size: 9 });
        page.drawText(course.credits.toString(), {
          x: 390,
          y: yOffset,
          size: 10,
        });
        page.drawText(course.cie, { x: 440, y: yOffset, size: 10 });
        page.drawText(course.ese, { x: 480, y: yOffset, size: 10 });
        page.drawText(course.finalGrade, { x: 520, y: yOffset, size: 10 });
        yOffset -= 20;
      }
    }
    let yOffset = height - 190;
    const lastPage = pdfDoc.getPages().at(-1);
    lastPage.drawText(`CGPA: ${student.cgpa}`, {
      x: 110,
      y: yOffset - 40,
      size: 10,
    });

    pdfDoc.setTitle("");
    pdfDoc.setAuthor("");
    pdfDoc.setSubject("");
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer("");
    pdfDoc.setCreator("");
    const fixedDate = new Date("2024-01-01T00:00:00Z");
    pdfDoc.setCreationDate(fixedDate);
    pdfDoc.setModificationDate(fixedDate);
    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(__dirname, `GradeCard_${prn}.pdf`);
    fs.writeFileSync(filePath, pdfBytes);
    if (student.isHashGenerated) {
      console.log(`Hash already generated for PRN: ${prn}`);
      res.json({
        pdfUrl: `http://${hostname}:3000/download-pdf/${prn}`,
        Hash: student.dataHash,
      });
    } else {
      const pdfHash = crypto
        .createHash("sha256")
        .update(pdfBytes)
        .digest("hex");
      console.log(`Generated hash: ${pdfHash}`);

      await studentModel.updateOne(
        { prn },
        { $set: { dataHash: pdfHash, isHashGenerated: true } }
      );
      console.log(`PDF generated successfully for PRN: ${prn}`);
      res.json({
        pdfUrl: `http://${hostname}:3000/download-pdf/${prn}`,
        Hash: pdfHash,
      });
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.post("/generate-pdf-admin", async (req, res) => {
  const { prn } = req.body;

  console.log("Received PRN for PDF generation:", req.body);

  try {
    const student = await studentModel.findOne({ prn });
    if (!student) {
      console.error(`Student with PRN ${prn} not found`);
      return res.status(404).send("Student not found");
    }

    const { iv: encryptedIv, encryptedData } = encryptData(prn);

    const qrCodeText = `http://${hostname}:3000/scan-qrcode/${encryptedData}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeText);
    const pdfDoc = await PDFDocument.create();
    const width = 600;
    const height = 800;

    for (const semester of student.semesters) {
      const page = pdfDoc.addPage([width, height]);

      const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl);
      const qrCodeDims = qrCodeImage.scale(0.5);

      page.drawImage(qrCodeImage, {
        x: 450,
        y: height - 150,
        width: qrCodeDims.width,
        height: qrCodeDims.height,
      });

      page.drawText(`Grade Card`, {
        x: 50,
        y: height - 50,
        size: 20,
        color: rgb(0, 0, 0),
      });
      page.drawText(`PRN: ${student.prn}`, { x: 50, y: height - 80, size: 10 });
      page.drawText(`Seat No: ${student.seatNo}`, {
        x: 50,
        y: height - 100,
        size: 10,
      });
      page.drawText(`Name: ${student.name}`, {
        x: 50,
        y: height - 120,
        size: 10,
      });
      page.drawText(`Mother's Name: ${student.motherName}`, {
        x: 50,
        y: height - 140,
        size: 10,
      });
      page.drawText(`Programme: ${student.programme}`, {
        x: 50,
        y: height - 160,
        size: 10,
      });

      let yOffset = height - 190;
      page.drawText(`Semester ${semester.semester}`, {
        x: 50,
        y: yOffset,
        size: 14,
      });
      page.drawText(`Exam Date: ${semester.examDate}`, {
        x: 50,
        y: yOffset - 20,
        size: 10,
      });
      if (semester.sgpa != null) {
        page.drawText(`SGPA: ${semester.sgpa}`, {
          x: 50,
          y: yOffset - 40,
          size: 10,
        });
      }

      page.drawText("Course Code", { x: 50, y: yOffset - 60, size: 10 });
      page.drawText("Course Title", { x: 110, y: yOffset - 60, size: 10 });
      page.drawText("Credits", { x: 380, y: yOffset - 60, size: 10 });
      page.drawText("CIE", { x: 435, y: yOffset - 60, size: 10 });
      page.drawText("ESE", { x: 475, y: yOffset - 60, size: 10 });
      page.drawText("Final Grade", { x: 510, y: yOffset - 60, size: 10 });
      yOffset -= 80;

      for (const course of semester.courses) {
        page.drawText(course.code, { x: 50, y: yOffset, size: 9 });
        page.drawText(course.title, { x: 110, y: yOffset, size: 9 });
        page.drawText(course.credits.toString(), {
          x: 390,
          y: yOffset,
          size: 10,
        });
        page.drawText(course.cie, { x: 440, y: yOffset, size: 10 });
        page.drawText(course.ese, { x: 480, y: yOffset, size: 10 });
        page.drawText(course.finalGrade, { x: 520, y: yOffset, size: 10 });
        yOffset -= 20;
      }
    }
    let yOffset = height - 190;
    const lastPage = pdfDoc.getPages().at(-1);
    lastPage.drawText(`CGPA: ${student.cgpa}`, {
      x: 110,
      y: yOffset - 40,
      size: 10,
    });

    pdfDoc.setTitle("");
    pdfDoc.setAuthor("");
    pdfDoc.setSubject("");
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer("");
    pdfDoc.setCreator("");
    const fixedDate = new Date("2024-01-01T00:00:00Z");
    pdfDoc.setCreationDate(fixedDate);
    pdfDoc.setModificationDate(fixedDate);
    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(__dirname, `GradeCard_${prn}.pdf`);
    fs.writeFileSync(filePath, pdfBytes);
    if (student.isHashGenerated) {
      res.json({
        pdfUrl: `http://${hostname}:3000/download-pdf/${prn}`,
      });
    } else {
      console.log(`PDF generated successfully for PRN: ${prn}`);
      res.json({
        pdfUrl: `http://${hostname}:3000/download-pdf/${prn}`,
      });
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.post("/make-payment", async (req, res) => {
  const { prn } = req.body;

  if (!prn) {
    return res.status(400).send("PRN is required.");
  }

  try {
    const result = await studentModel.updateOne(
      { prn }, // Match the student by PRN
      { $set: { payment: true } } // Set the payment field to true
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("Student not found.");
    }

    res.status(200).send("Payment status updated successfully.");
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).send("Internal server error.");
  }
});
app.post("/check-payment", async (req, res) => {
  const { prn } = req.body;

  if (!prn) {
    return res.status(400).send("PRN is required.");
  }

  try {
    const student = await studentModel.findOne({ prn });

    if (!student) {
      return res.status(404).send("Student not found.");
    }

    return res.status(200).json({
      paymentStatus: student.payment || false,
    });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    return res.status(500).send("Internal server error.");
  }
});

app.post("/check-student-verif", async (req, res) => {
  const { email, prn } = req.body;

  if (!email || !prn) {
    return res.status(400).send("Email and PRN are required.");
  }

  try {
    const verifier = await verifierModel.findOne(
      { email },
      { students: { $elemMatch: { prn } } }
    );

    if (!verifier || !verifier.students || verifier.students.length === 0) {
      return res
        .status(404)
        .send("Student not found under the specified verifier.");
    }

    return res.status(200).json({
      status: verifier.students[0].status,
    });
  } catch (error) {
    console.error("Error fetching student status:", error);
    return res.status(500).send("Internal server error.");
  }
});

//upload
const upload = multer({ dest: "uploads/" });

app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = file.path;

  try {
    const fileBuffer = fs.readFileSync(filePath);

    const pdfDoc = await PDFDocument.load(fileBuffer);
    pdfDoc.setTitle("");
    pdfDoc.setAuthor("");
    pdfDoc.setSubject("");
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer("");
    pdfDoc.setCreator("");
    const fixedDate = new Date("2024-01-01T00:00:00Z");
    pdfDoc.setCreationDate(fixedDate);
    pdfDoc.setModificationDate(fixedDate);

    const sanitizedPdfBytes = await pdfDoc.save();

    const hash = crypto
      .createHash("sha256")
      .update(sanitizedPdfBytes)
      .digest("hex");

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });

    res.status(200).json({ hash });
  } catch (err) {
    console.error("Error processing PDF:", err);
    res.status(500).send("Error processing file.");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authModel.findOne({ email });
    const student = await studentModel.findOne({ email });
    if (!user) {
      return res.status(404).send("No User Found!");
    }

    if (password !== user.password) {
      return res.status(401).send("Invalid Credentials");
    }
    if (student) {
      const token = jwt.sign(
        {
          email: user.email,
          user: user._id,
          prn: student.prn,
          username: user.username,
          role: user.role,
        },
        "shhh",
        { expiresIn: "1h" }
      );
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
    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
    });
    res
      .status(200)
      .send({ message: "Logged In Successfully", role: user.role, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
  console.log("login succesful");
});
//get hash of prn
app.get("/get-hash/:prn", async (req, res) => {
  const { prn } = req.params;

  try {
    const student = await studentModel.findOne({ prn });

    if (!student) {
      console.error(`Student with PRN ${prn} not found`);
      return res.status(404).send("Student not found");
    }

    if (!student.isHashGenerated) {
      console.error(`Hash not generated for PRN: ${prn}`);
      return res.status(400).send("Hash not generated for this PRN");
    }

    console.log(`Retrieved hash for PRN: ${prn}`);
    res.json({ dataHash: student.dataHash });
  } catch (error) {
    console.error("Error fetching hash:", error);
    res.status(500).send("Error fetching hash");
  }
});

app.post("/apply", async (req, res) => {
  const { email, prn } = req.body;

  if (!email || !prn) {
    return res.status(400).send("Missing required fields or invalid data.");
  }

  try {
    let verifier = await verifierModel.findOne({ email });

    if (!verifier) {
      return res.status(404).send("Verifier not found.");
    }

    const verifierUpdate = await verifierModel.updateOne(
      { email, "students.prn": { $ne: prn } },
      {
        $push: { students: { prn, status: false } },
      }
    );

    let student = await studentModel.findOneAndUpdate(
      { prn },
      { $setOnInsert: { prn, verifiers: [] } },
      { upsert: true, returnDocument: "after" }
    );

    const studentUpdate = await studentModel.updateOne(
      { prn, verifiers: { $ne: verifier.email } },
      {
        $push: { verifiers: verifier.email },
      }
    );

    if (verifierUpdate.modifiedCount > 0 || studentUpdate.modifiedCount > 0) {
      return res.status(200).send("Application successfully processed.");
    } else {
      return res
        .status(400)
        .send("No changes were made. Data may already exist.");
    }
  } catch (error) {
    console.error("Error in /apply route:", error);
    res.status(500).send("Internal server error.");
  }
});

app.post("/chaange", async (req, res) => {
  const { email, prn } = req.body;

  if (!email || !prn) {
    return res.status(400).send("Missing required fields or invalid data.");
  }

  try {
    const verifierUpdate = await verifierModel.updateOne(
      { email, "students.prn": prn },
      {
        $set: { "students.$.status": true },
      }
    );

    if (verifierUpdate.modifiedCount > 0) {
      return res.status(200).send("Student status successfully updated.");
    } else {
      return res.status(400).send("kuch gadbad hai Daya!!");
    }
  } catch (error) {
    console.error("Error in /chaange route:", error);
    res.status(500).send("Internal server error.");
  }
});

// Route for verifier to see applied students
app.post("/verifier-students", async (req, res) => {
  const { email } = req.body;

  try {
    const verifier = await verifierModel.findOne({ email });

    if (!verifier || !verifier.students || verifier.students.length === 0) {
      return res.status(404).send("No students found for this verifier.");
    }

    const prns = verifier.students.map((student) => student.prn);

    const students = await studentModel
      .find({ prn: { $in: prns } }, { projection: { prn: 1, name: 1 } })
      .toArray();

    const studentList = students.map((student) => ({
      prn: student.prn,
      name: student.name,
    }));

    res.status(200).json(studentList);
  } catch (error) {
    console.error("Error in /verifier-students route:", error);
    res.status(500).send("Internal server error.");
  }
});

app.post("/upload-pdf-student", upload.single("pdf"), async (req, res) => {
  const file = req.file;
  const { prn } = req.body;
  const filePath = path.join(__dirname, `uploads/student_${prn}.pdf`);
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const uploadedFileBytes = fs.readFileSync(file.path);

    const pdfDoc = await PDFDocument.load(uploadedFileBytes);

    pdfDoc.setTitle("");
    pdfDoc.setAuthor("");
    pdfDoc.setSubject("");
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer("");
    const fixedDate = new Date("2024-01-01T00:00:00Z");
    pdfDoc.setCreationDate(fixedDate);
    pdfDoc.setModificationDate(fixedDate);

    const sanitizedBytes = await pdfDoc.save();
    fs.writeFileSync(filePath, sanitizedBytes);
    return res.status(200).send("PDF successfully uploaded and verified.");
  } catch (error) {
    console.error("Error processing uploaded PDF:", error);
    res.status(500).send("Error processing uploaded PDF.");
  }
});

app.post("/download-pdf-verifier", (req, res) => {
  const { prn } = req.body;
  const filePath = path.join(__dirname, `uploads/student_${prn}.pdf`);
  res.download(filePath, `user${prn}.pdf`, (err) => {
    if (err) {
      res.status(500).send("Error downloading PDF");
    }
  });
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
app.get("/get-all-datahashes", async (req, res) => {
  try {
    // Query to retrieve all documents and only return PRN and dataHash fields
    const students = await studentModel
      .find({}, { projection: { prn: 1, dataHash: 1, _id: 0 } })
      .toArray();

    if (students.length === 0) {
      return res.status(404).send("No students found");
    }

    res.json(students);
  } catch (error) {
    console.error("Error fetching data hashes:", error);
    res.status(500).send("Error fetching data hashes");
  }
});
app.post("/student-verifiers", async (req, res) => {
  const { prn } = req.body;

  if (!prn) {
    return res.status(400).send("PRN is required.");
  }

  try {
    const student = await studentModel.findOne({ prn });

    if (!student || !student.verifiers || student.verifiers.length === 0) {
      return res.status(404).send("No verifiers found for this student.");
    }

    res.status(200).json(student.verifiers);
  } catch (error) {
    console.error("Error in /student-verifiers route:", error);
    res.status(500).send("Internal server error.");
  }
});
/*app.listen(3000, () => {
      console.log("Working!");
    });
    */

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
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
// 10. http://localhost:3000/scan-qrcode/encryptedData  get   //encryptedData you get from scanning qrcode in
//                                                      //pdf or you can use this for test:91572cf2919f87777a4248d9e9e0627
// 11.http://localhost:3000/get-verifier get
//12.http://10.10.8.10:3000/get-hash/prn get
//13. http://10.10.8.10:3000/upload-pdf post pdf key name
//14. http://10.10.8.10:3000/get-all-datahashes
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
/*
    db.students.insertMany([
      {
        prn: "2280030653",
        seatNo: "2280030653",
        name: "Mustafa",
        motherName: "Alefiya",
        programme: "BACHELOR OF TECHNOLOGY (COMPUTER ENGINEERING)",
        year: "Second Year",
        registrationYear: "2022-23",
        cgpa: 8.5,
        status: true,
        deployed: false,
        semesters: [
          {
            semester: 4,
            examDate: "MAY 2024",
            sgpa: 8.84,
            courses: [
              {
                code: "BTECECE22401",
                title: "THEORY OF COMPUTATION",
                credits: 3,
                cie: "A",
                ese: "A",
                finalGrade: "A",
              },
              {
                code: "BTECECE22402",
                title: "DBMS",
                credits: 3,
                cie: "O",
                ese: "O",
                finalGrade: "O",
              },
            ],
          },
        ],
      },
      {
        prn: "2280030656",
        seatNo: "2280030656",
        name: "Aryan",
        motherName: "mother",
        programme: "BACHELOR OF TECHNOLOGY (COMPUTER ENGINEERING)",
        year: "Third Year",
        registrationYear: "2021-22",
        cgpa: 9.1,
        status: true,
        deployed: true,
        semesters: [
          {
            semester: 6,
            examDate: "MAY 2024",
            sgpa: 9.2,
            courses: [
              {
                code: "BTECECE22601",
                title: "ARTIFICIAL INTELLIGENCE",
                credits: 4,
                cie: "O",
                ese: "O",
                finalGrade: "O",
              },
              {
                code: "BTECECE22602",
                title: "COMPUTER NETWORKS",
                credits: 3,
                cie: "A",
                ese: "A",
                finalGrade: "A",
              },
            ],
          },
        ],
      },
      {
        prn: "2280030657",
        seatNo: "2280030657",
        name: "Prathamesh",
        motherName: "mother",
        programme: "BACHELOR OF TECHNOLOGY (MECHANICAL ENGINEERING)",
        year: "First Year",
        registrationYear: "2023-24",
        cgpa: 7.5,
        status: false,
        deployed: false,
        semesters: [
          {
            semester: 2,
            examDate: "DEC 2023",
            sgpa: 7.3,
            courses: [
              {
                code: "BTMECE22301",
                title: "ENGINEERING MECHANICS",
                credits: 3,
                cie: "B",
                ese: "B",
                finalGrade: "B",
              },
              {
                code: "BTMECE22302",
                title: "MATERIAL SCIENCE",
                credits: 3,
                cie: "B",
                ese: "B",
                finalGrade: "B",
              },
              {
                code: "BTMECE22301",
                title: "ENGINEERING MECHANICS",
                credits: 3,
                cie: "B",
                ese: "B",
                finalGrade: "B",
              },
              {
                code: "BTMECE22302",
                title: "MATERIAL SCIENCE",
                credits: 3,
                cie: "B",
                ese: "B",
                finalGrade: "B",
              },
              {
                code: "BTMECE22301",
                title: "ENGINEERING MECHANICS",
                credits: 3,
                cie: "B",
                ese: "B",
                finalGrade: "B",
              },
              {
                code: "BTMECE22302",
                title: "MATERIAL SCIENCE",
                credits: 3,
                cie: "B",
                ese: "B",
                finalGrade: "B",
              },
              {
                code: "BTMECE22301",
                title: "ENGINEERING MECHANICS",
                credits: 3,
                cie: "B",
                ese: "B",
                finalGrade: "B",
              },
              {
                code: "BTMECE22302",
                title: "MATERIAL SCIENCE",
                credits: 3,
                cie: "B",
                ese: "B",
                finalGrade: "B",
              },
            ],
          },
        ],
      },
      {
        prn: "2280030658",
        seatNo: "2280030658",
        name: "Harsh",
        motherName: "mother",
        programme: "BACHELOR OF TECHNOLOGY (ELECTRONICS ENGINEERING)",
        year: "Final Year",
        registrationYear: "2020-21",
        cgpa: 8.0,
        status: true,
        deployed: true,
        semesters: [
          {
            semester: 8,
            examDate: "MAY 2024",
            sgpa: 8.5,
            courses: [
              {
                code: "BTEECE22801",
                title: "DIGITAL SIGNAL PROCESSING",
                credits: 3,
                cie: "O",
                ese: "O",
                finalGrade: "O",
              },
              {
                code: "BTEECE22802",
                title: "CONTROL SYSTEMS",
                credits: 3,
                cie: "A",
                ese: "A",
                finalGrade: "A",
              },
            ],
          },
        ],
      },
      {
        prn: "2280030659",
        seatNo: "2280030659",
        name: "Priya",
        motherName: "mother",
        programme: "BACHELOR OF TECHNOLOGY (INFORMATION TECHNOLOGY)",
        year: "Second Year",
        registrationYear: "2022-23",
        cgpa: 8.75,
        status: true,
        deployed: false,
        semesters: [
          {
            semester: 4,
            examDate: "MAY 2024",
            sgpa: 8.9,
            courses: [
              {
                code: "BTITCE22401",
                title: "OPERATING SYSTEMS",
                credits: 3,
                cie: "O",
                ese: "O",
                finalGrade: "O",
              },
              {
                code: "BTITCE22402",
                title: "SOFTWARE ENGINEERING",
                credits: 3,
                cie: "A",
                ese: "A",
                finalGrade: "A",
              },
            ],
          },
        ],
      },
    ]);
    // *dummy data authentication collection:

    // db.authentications.insertMany([
    //   {
    //     username: "Aryan Giri",
    //     email: "aryan@test.com",
    //     password: "aryan@test.com",
    //     role: "verifier"
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
    */
/*status:Boolean,
    students: [
      {
        prn: String,
        status: Boolean,
      },
    ],*/
