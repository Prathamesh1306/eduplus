// import React, { useEffect, useState } from "react";
// import Header from "../../compo/header";
// import Footer from "../../compo/footer";
// import "../../css/studentcredential.css";

// import axios from "axios";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// function Studentcredential() {

//   const [error, setError] = useState(""); // State for handling errors

//   // Decode JWT from cookie
//   const cookies = Cookies.get("eduplus");
//   const decoded = jwtDecode(cookies);
//   const prn = decoded.prn; // Extracted PRN from JWT
//   const name= decoded.username;
//   // Fetch all students from the API
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/student",{
//                 prn: prn
//           }
//         );

//         const data = response.data
//         setStudents(data); // Set the fetched students
//       } catch (err) {
//         console.error("Failed to fetch students:", err);
//         setError("Failed to fetch student data.");
//       }
//     };

//   // Handle submit action
//   const handleSubmit = async () => {
//     try {
//       // Sending PRN from JWT to the API
//       await axios.post("http://localhost:3000/freeze-student", {
//         prn: prn, // Use the PRN fetched from decoded JWT
//       });
//       alert("Request sent successfully!");
//     } catch (error) {
//       console.error("Error sending student request:", error);
//       alert("Failed to send request. Please try again.");
//     }
//   };

//   return (
//     <div className="student-credential">
//       <Header name={name} year="3rd year" role="STUDENT" />

//       <div className="credential-content">
//         <h2>Student Credentials</h2>

//         {/* Search Form */}
//         <div className="container-search">
//           <div className="input-group">

//             <button onClick={handleSubmit} className="deploy-button">
//               Freeze and fetch certificate
//             </button>
//           </div>
//         </div>

//         Student Details
//         {error && <p className="error-message">{error}</p>}
//         <button onClick={fetchStudents}>Fetch</button>

//       </div>

//       <br />
//       <div className="credential-card">
//         <img src={" "} alt="pdf will be render" className="id-card-image" />
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Studentcredential;

import React, { useState } from "react";
import Header from "../../compo/header";
import Footer from "../../compo/footer";
import "../../css/studentcredential.css";

import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Correct import

function Studentcredential() {
  const [error, setError] = useState(""); // State for handling errors
  const [students, setStudents] = useState<any>(null); // State for fetched student data
  const [pdfUrl, setPdfUrl] = useState(""); // State for PDF URL

  // Decode JWT from cookie
  const cookies = Cookies.get("eduplus");
  if (!cookies) {
    setError("JWT token not found in cookies.");
    return null; // Bail out if cookies are missing
  }

  let prn = "";
  let name = "";

  try {
    const decoded = jwtDecode(cookies); // Safely decode JWT
    prn = (decoded as any).prn; // Explicit casting
    name = (decoded as any).username;
  } catch (e) {
    setError("Invalid JWT token.");
    console.error("JWT decoding error:", e);
    return null; // Bail out if decoding fails
  }

  // Fetch all students from the API
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/student/${prn}`);
      setStudents(response.data); // Set the fetched students
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setError("Failed to fetch student data.");
    }
  };

  // Fetch and render the PDF
  const fetchPdf = async () => {
    try {
      setPdfUrl(`http://localhost:3000/student/pdf/${prn}`);
    } catch (err) {
      console.error("Error fetching PDF:", err);
      alert("Failed to fetch the PDF. Please try again.");
    }
  };

  // Handle submit action (freeze student)
  const handleSubmit = async () => {
    try {
      // Sending PRN from JWT to the API
      await axios.post("http://localhost:3000/freeze-student", {
        prn: prn, // Use the PRN fetched from decoded JWT
      });
      alert("Request sent successfully!");
    } catch (error) {
      console.error("Error sending student request:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  return (
    <div className="student-credential">
      <Header name={name} year="3rd year" role="STUDENT" />

      <div className="credential-content">
        <h2>Student Credentials</h2>

        {/* Search Form */}
        <div className="container-search">
          <div className="input-group">
            <button onClick={handleSubmit} className="deploy-button">
              Freeze and Fetch Certificate
            </button>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button onClick={fetchStudents} className="deploy-button">Fetch Student Details</button>

        {/* Render Student Details */}
        {students && (
          <div>
            <h3>Student Details</h3>
            <p>PRN: {students.prn}</p>
            <p>Name: {students.name}</p>
            <p>Email: {students.email}</p>
          </div>
        )}
      </div>

      <br />
      <button onClick={fetchPdf} className="deploy-button">
        View Certificate
      </button>
      <div className="credential-card">
        {/* Render PDF */}
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="Student Certificate"
            width="100%"
            height="500px"
          ></iframe>
        ) : (
          <img
            src={" "}
            alt="PDF will be rendered here"
            className="id-card-image"
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Studentcredential;
