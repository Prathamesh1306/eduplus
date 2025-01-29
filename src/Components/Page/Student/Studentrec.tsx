import Header from "../../compo/header";
import Footer from "../../compo/footer";
import "../../css/studnetverify.css";
import { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { useNavigate } from "react-router-dom"; // Ensure this is imported
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Breadcrumbs from "../../compo/breadcrumbs";

function StudentRecruiter() {
  const [recruiter, setRecruiter] = useState([]); // State to store verifier data
  const cookie = Cookies.get("eduplus");
  const decoded = jwtDecode(cookie);
  const prn = decoded.prn;
  useEffect(() => {
    const fetchVerifier = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-all-verifiers"
        );

        const verifiedVerifiers = response.data.filter(
          (recruiter) => recruiter.verify === true
        );
        setRecruiter(verifiedVerifiers);
      } catch (error) {
        console.error("Error fetching verifiers:", error);
      }
    };

    fetchVerifier();
  }, []);

  const handlePDFUpload = (prn) => {
    
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf";
    fileInput.style.display = "none";

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("prn", prn); // Append PRN to FormData

        try {
          await axios.post(
            "http://localhost:3000/upload-pdf-student",
            formData
          );
          alert("PDF uploaded successfully!");
        } catch (error) {
          console.error("Error uploading PDF:", error);
          alert("Failed to upload PDF. Please try again.");
        }
      }
    };

    fileInput.click();
  };


  const AppyBtn = async(email)=>{
    await axios.post("http://localhost:3000/apply",{
      email:email,
      prn:prn
    })

    alert("Applied")


  } 
  return (
    <div>
      <Header />
      <Breadcrumbs/>
      <div className="admin-student-list-main">
        <div className="admin-student-list-title">Verifier List</div>
        <div
          style={{
            backgroundColor: "#028978",
            width: "80%",
            justifyItems: "center",
            borderRadius: "20px",
            padding: "20px 0px",
            overflowX: "auto",
          }}
        >
          {recruiter.length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#026b56", color: "#fff" }}>
                  <th style={{ padding: "10px" }}>Email</th>
                  <th style={{ padding: "10px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recruiter.map((verifier) => (
                  <tr
                    key={verifier._id}
                    style={{
                      backgroundColor: verifier.verify ? "#e7f6f2" : "#f6f2e7",
                      color: "#333",
                    }}
                  >
                    <td style={{ padding: "10px" }}>{verifier.email}</td>
                    <td style={{ padding: "10px" }}>
                      <div
                        style={{
                          color: "#000",
                          backgroundColor: "#68cfd9",
                          margin: "10px 25px",
                          borderRadius: "8px",
                          textAlign: "center",
                          width: "50%",
                          fontSize: "30px",
                          userSelect:"none",
                          cursor:"pointer"
                        }}
                        onClick={() => handlePDFUpload(decoded.prn)}
                      >
                        Upload PDF
                      </div>
                    </td>
                    <div
                      style={{
                        color: "#000",
                        backgroundColor:"#68cfd9",
                        textAlign: "center",
                        margin: "20px 25px",
                        borderRadius: "10px",
                        width: "50%",
                        fontSize: "30px",
                        userSelect:"none",
                        cursor:"pointer"
                      }}

                      onClick={()=>{
                        AppyBtn(verifier.email)
                        console.log(verifier.email)
                      }}
                    >
                      Apply
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No verifiers found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentRecruiter;
