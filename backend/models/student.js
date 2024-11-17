const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    prn: String,
    seatNo: String,
    name: String,
    motherName: String,
    programme: String,
    year: String,
    registrationYear: String,
    cgpa: Number, 
    status: Boolean,
    deployed: Boolean,
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
  
module.exports = mongoose.model("student", studentSchema);
  