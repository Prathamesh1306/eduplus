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

// import React, { useState } from "react";
// import Header from "../../compo/header";
// import Footer from "../../compo/footer";
// import "../../css/studentcredential.css";

// import axios from "axios";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode"; // Correct import

// function Studentcredential() {
//   const [error, setError] = useState(""); // State for handling errors
//   const [students, setStudents] = useState<any>(null); // State for fetched student data
//   const [pdfUrl, setPdfUrl] = useState(""); // State for PDF URL

//   // Decode JWT from cookie
//   const cookies = Cookies.get("eduplus");
//   if (!cookies) {
//     setError("JWT token not found in cookies.");
//     return null; // Bail out if cookies are missing
//   }

//   let prn = "";
//   let name = "";

//   try {
//     const decoded = jwtDecode(cookies); // Safely decode JWT
//     prn = (decoded as any).prn; // Explicit casting
//     name = (decoded as any).username;
//   } catch (e) {
//     setError("Invalid JWT token.");
//     console.error("JWT decoding error:", e);
//     return null; // Bail out if decoding fails
//   }

//   // Fetch all students from the API
//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/student/${prn}`);
//       setStudents(response.data); // Set the fetched students
//     } catch (err) {
//       console.error("Failed to fetch students:", err);
//       console.error(students);
//       setError("Failed to fetch student data.");
//     }
//   };

//   // Fetch and render the PDF
//   const fetchPdf = async () => {
//     try {
//       setPdfUrl(`http://localhost:3000/student/pdf/${prn}`);
//     } catch (err) {
//       console.error("Error fetching PDF:", err);
//       alert("Failed to fetch the PDF. Please try again.");
//     }
//   };

//   // Handle submit action (freeze student)
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

//         <button onClick={fetchStudents} className="deploy-button" style={{width:"10%"}}>View Details</button>

//         {/* Render Student Details
//         {students && (
//           <div>
//             <h3>Student Details</h3>
//             <p>PRN: {students.prn}</p>
//             <p>Name: {students.name}</p>
//             <p>Email: {students.email}</p>
//           </div>
//         )} */}

// {students && (
//   <div className="">
//     <br />
//     {/* <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#02897a" }}>Student Details</h3> */}
//     <table style={{
//       width: "80%",
//       borderCollapse: "collapse",
//       margin: "0 auto",
//       backgroundColor: "#f9f9f9",
//       boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
//     }}>
//       <thead style={{ backgroundColor: "#02897a", color: "white" }}>
//         <tr>
//           <th style={{ padding: "10px", textAlign: "center" }}>Field</th>
//           <th style={{ padding: "10px", textAlign: "center" }}>Value</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr style={{ borderBottom: "1px solid #ddd" }}>
//           <td style={{ padding: "10px", fontWeight: "bold" }}>PRN</td>
//           <td style={{ padding: "10px" }}>{students.prn}</td>
//         </tr>
//         <tr style={{ borderBottom: "1px solid #ddd" }}>
//           <td style={{ padding: "10px", fontWeight: "bold" }}>Name</td>
//           <td style={{ padding: "10px" }}>{students.name}</td>
//         </tr>
//         <tr style={{ borderBottom: "1px solid #ddd" }}>
//           <td style={{ padding: "10px", fontWeight: "bold" }}>Email</td>
//           <td style={{ padding: "10px" }}>{students.email}</td>
//         </tr>
//         <tr style={{ borderBottom: "1px solid #ddd" }}>
//           <td style={{ padding: "10px", fontWeight: "bold" }}>Programme</td>
//           <td style={{ padding: "10px" }}>{students.programme || "N/A"}</td>
//         </tr>
//         <tr style={{ borderBottom: "1px solid #ddd" }}>
//           <td style={{ padding: "10px", fontWeight: "bold" }}>Semester</td>
//           <td style={{ padding: "10px" }}>{students.semester || "N/A"}</td>
//         </tr>
//         <tr style={{ borderBottom: "1px solid #ddd" }}>
//           <td style={{ padding: "10px", fontWeight: "bold" }}>CGPA</td>
//           <td style={{ padding: "10px" }}>{students.cgpa || "N/A"}</td>
//         </tr>
//         <tr style={{ borderBottom: "1px solid #ddd" }}>
//           <td style={{ padding: "10px", fontWeight: "bold" }}>Contact</td>
//           <td style={{ padding: "10px" }}>{students.contact || "N/A"}</td>
//         </tr>
//         <tr>
//           <td style={{ padding: "10px", fontWeight: "bold" }}>Address</td>
//           <td style={{ padding: "10px" }}>{students.address || "N/A"}</td>
//         </tr>
//       </tbody>
//     </table>
//       {/* Search Form */}
//       <br />
//       <div className="container-search">
//           <div className="input-group">
//             <button onClick={handleSubmit} className="deploy-button">
//               Freeze
//             </button>
//           </div>
//         </div>

//         {error && <p className="error-message">{error}</p>}
//   </div>
// )}

//       </div>

//       <br />
//       <button onClick={fetchPdf} className="deploy-button">
//         View Certificate
//       </button>
//       <div className="credential-card">
//         {/* Render PDF */}
//         {pdfUrl ? (
//           <iframe
//             src={pdfUrl}
//             title="Student Certificate"
//             width="100%"
//             height="500px"
//           ></iframe>
//         ) : (
//           <img
//             src={" "}
//             alt="PDF will be rendered here"
//             className="id-card-image"
//           />
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Studentcredential;

import { useState } from "react";
import Header from "../../compo/header";
import Footer from "../../compo/footer";
import "../../css/studentcredential.css";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Breadcrumbs from "../../compo/breadcrumbs";

function Studentcredential() {
  const [error, setError] = useState(""); // Error state
  const [students, setStudents] = useState<any>(null); // Student data state
  const [pdfUrl, setPdfUrl] = useState(""); // PDF URL state
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isPaid, setIsPaid] = useState(false); // Payment status state
  const [isFrozen, setIsFrozen] = useState(false);

  // Decode JWT
  const cookies = Cookies.get("token");
  if (!cookies) {
    setError("JWT token not found in cookies.");
    return null;
  }

  let prn = "";
  let name = "";

  try {
    const decoded = jwtDecode(cookies);
    prn = (decoded as any).prn;
    name = (decoded as any).username;
  } catch (e) {
    setError("Invalid JWT token.");
    console.error("JWT decoding error:", e);
    return null;
  }

  // Fetch student details
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/student/${prn}`);
      setStudents(response.data);
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

  // Handle modal payment confirmation
  const handlePayment = async () => {
    try {
      await axios.post("http://localhost:3000/freeze-student", {
        prn: prn,
      });
      alert("Payment successful! Request sent.");
      setIsPaid(true); // Mark payment as done
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error sending student request:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  // Close modal logic
  const closeModal = () => setShowModal(false);

  return (
    <div className="student-credential" style={{ justifyContent: "start" }}>
      <Header name={name} year="3rd year" role="STUDENT" />
      <div style={{
        justifySelf:"start"
      }}>
        <Breadcrumbs />
      </div>
      <div className="credential-content">
        <h2>Student Credentials</h2>

        <button
          onClick={fetchStudents}
          className="deploy-button"
          style={{ width: "10%" }}
        >
          View Details
        </button>

        {students && (
          <div className="">
            <br />
            <table
              style={{
                width: "80%",
                borderCollapse: "collapse",
                margin: "0 auto",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <thead style={{ backgroundColor: "#02897a", color: "white" }}>
                <tr>
                  <th style={{ padding: "10px", textAlign: "center" }}>
                    Field
                  </th>
                  <th style={{ padding: "10px", textAlign: "center" }}>
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>PRN</td>
                  <td style={{ padding: "10px" }}>{students.prn}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>
                    Seat No
                  </td>
                  <td style={{ padding: "10px" }}>
                    {students.seatNo || "N/A"}
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>Name</td>
                  <td style={{ padding: "10px" }}>{students.name}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>
                    Mothers Name
                  </td>
                  <td style={{ padding: "10px" }}>
                    {students.motherName || "N/A"}
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>Email</td>
                  <td style={{ padding: "10px" }}>{students.email}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>
                    Programme
                  </td>
                  <td style={{ padding: "10px" }}>
                    {students.programme || "N/A"}
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>CGPA</td>
                  <td style={{ padding: "10px" }}>{students.cgpa || "N/A"}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>Year</td>
                  <td style={{ padding: "10px" }}>{students.year || "N/A"}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>
                    Registration Year
                  </td>
                  <td style={{ padding: "10px" }}>
                    {students.registrationYear || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <div className="container-search">
              <div className="input-group">
                {/* <button
                  onClick={() => setShowModal(true)}
                  className="deploy-button"
                >
                  Freeze
                </button> */}

                <button
                  onClick={() => {
                    setShowModal(true);
                    setIsFrozen(true); // Disable the button and update text
                  }}
                  className="deploy-button"
                  disabled={isFrozen} // Disable the button if frozen
                  style={{
                    backgroundColor: isFrozen ? "#f44336" : "#02897a", // Change color when frozen
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: isFrozen ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {isFrozen ? "Frozen" : "Freeze"}
                </button>
              </div>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{
              maxWidth: "400px",
              margin: "50px auto",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                fontSize: "22px",
                color: "#333",
              }}
            >
              Confirm Payment
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#666",
                marginBottom: "15px",
              }}
            >
              You are about to freeze student PRN: <strong>{prn}</strong>.
            </p>

            <p
              style={{
                fontSize: "14px",
                color: "#f44336",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Warning: Once frozen, the details cannot be changed.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <button
                onClick={handlePayment}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#02897a",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Pay Now
              </button>
              <button
                onClick={closeModal}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <br />
      {isPaid && ( // Show only if payment is done
        <button onClick={fetchPdf} className="deploy-button">
          View Certificate
        </button>
      )}
      <div className="credential-card">
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
