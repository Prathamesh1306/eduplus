const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mmn", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  prn: String,
  seatNo: String,
  name: String,
  motherName: String,
  programme: String,
  year: String,
  registrationYear: String,
  cgpa: Number,
  semesters: [
    {
      semester: Number,
      examDate: String,
      sgpa: Number,
      courses: [
        {
          code: String,
          title: String,
          credits: Number,
          cie: String,
          ese: String,
          finalGrade: String,
        },
      ],
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

app.get("/student/:prn", async (req, res) => {
  const { prn } = req.params;
  try {
    const student = await Student.findOne({ prn });
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.json(student);
  } catch (error) {
    res.status(500).send("Error fetching student data");
  }
});

app.get("/generate-pdf/:prn", async (req, res) => {
  const { prn } = req.params;
  try {
    const student = await Student.findOne({ prn });
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
    page.drawText(PRN: ${student.prn}, { x: 50, y: height - 80, size: 12 });
    page.drawText(Seat No: ${student.seatNo}, {
      x: 50,
      y: height - 100,
      size: 12,
    });
    page.drawText(Name: ${student.name}, {
      x: 50,
      y: height - 120,
      size: 12,
    });
    page.drawText(Mother's Name: ${student.motherName}, {
      x: 50,
      y: height - 140,
      size: 12,
    });
    page.drawText(Programme: ${student.programme}, {
      x: 50,
      y: height - 160,
      size: 12,
    });

    let yOffset = height - 190;
    student.semesters.forEach((semester) => {
      page.drawText(Semester ${semester.semester}, {
        x: 50,
        y: yOffset,
        size: 14,
      });
      page.drawText(Exam Date: ${semester.examDate}, {
        x: 50,
        y: yOffset - 20,
        size: 12,
      });
      page.drawText(SGPA: ${semester.sgpa}, {
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

    page.drawText(CGPA: ${student.cgpa}, { x: 50, y: yOffset, size: 14 });

    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(__dirname, GradeCard_${prn}.pdf);
    fs.writeFileSync(filePath, pdfBytes);

    res.json({ pdfUrl: http://192.168.6.165:5000/download-pdf/${prn} });
  } catch (error) {
    res.status(500).send("Error generating PDF");
  }
});

app.get("/download-pdf/:prn", (req, res) => {
  const { prn } = req.params;
  const filePath = path.join(__dirname, GradeCard_${prn}.pdf);
  res.download(filePath, GradeCard_${prn}.pdf, (err) => {
    if (err) {
      res.status(500).send("Error downloading PDF");
    }
  });
});

app.listen(port, "192.168.6.165", () => {
  console.log(Server running at http://192.168.6.165:${port});
});
