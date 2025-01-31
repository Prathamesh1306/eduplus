import Header from "../../compo/header";
import Footer from "../../compo/footer";
import "../../css/studnetverify.css";
import { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { useNavigate } from "react-router-dom"; // Ensure this is imported
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Breadcrumbs from "../../compo/breadcrumbs";
import { log } from "handlebars";

function StudentRecruiter() {
  const [recruiter, setRecruiter] = useState([]); // State to store verifier data
  const cookie = Cookies.get("eduplus");
  const decoded = jwtDecode(cookie);
  const prn = decoded.prn;
  const email = decoded.email;
  useEffect(() => {
    const fetchVerifier = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-all-verifiers"
        );

        const verifiedVerifiers = response.data.filter(
          (recruiter: any) => recruiter.verify === true
        );
        setRecruiter(verifiedVerifiers);
      } catch (error) {
        console.error("Error fetching verifiers:", error);
      }
    };

    fetchVerifier();
  }, []);

  const handlePDFUpload = (prn: any) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf";
    fileInput.style.display = "none";

    fileInput.onchange = async (event: any) => {
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

  const AppyBtn = async ({ email, prn }: any) => {
    alert(`Email: ${email}, PRN: ${prn}`);

    try {
      alert("start applying");

      const payload = { email, prn };
      console.log("Request Payload:", payload);

      const response = await axios.post("http://localhost:3000/apply", payload);

      console.log("Response received:", response);
      alert("Applied successfully");
    } catch (error: any) {
      console.error("Error during API call:", error);

      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Error: No response from the server");
      } else {
        console.error("Error message:", error.message);
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <Breadcrumbs />
      <div className="admin-student-list-main">
        <div className="admin-student-list-title">Verifier List</div>
        <div
          style={{
            backgroundColor: "#028978",
            width: "80%",
            justifyItems: "center",
            borderRadius: "20px",
            padding: "10px 2px 30px 1px",
            overflowX: "auto",
            flexDirection: "row",
          }}
        >
          {recruiter.length > 0 ? (
            <div
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
                <div
                  style={{
                    color: "#fff",
                   display:"flex",
                   justifyContent:"space-around",
                   width:"70%"

                  }}
                >
                  <div style={{ padding: "10px" }}>Email</div>
                  <div style={{ padding: "10px" }}>Action</div>
              </div>
              <div
              style={{borderRadius:"10px",backgroundColor:"#e7f6f2"}}
              >
                {recruiter.map((verifier: any) => (
                  <div
                    key={verifier._id}
                    style={{
                      // backgroundColor: verifier.verify ? "#e7f6f2" : "#f6f2e7",
                      color: "#333",
                      display:"flex",
                      
                    }}
                  >
                    <div style={{ padding: "10px" ,width:"30%"}}>{verifier.email}</div>
                    <div style={{width:"70%" , display:"flex",alignItems:"center",padding:"10px 40px"}}>

                    <div style={{ padding: "10px",width:"80%",justifyItems:"center"}}>
                      <div
                        style={{
                          color: "#000",
                          backgroundColor: "#68cfd9",
                          borderRadius: "8px",
                          textAlign: "center",
                          width: "50%",
                          fontSize: "30px",
                          userSelect: "none",
                          cursor: "pointer",
                          alignSelf:"center",
                        }}
                        onClick={() => handlePDFUpload(decoded.prn)}
                        >
                        Upload PDF
                      </div>
                    </div>
                    <div style={{ padding: "10px",width:"80%",justifyItems:"center"}}>
                    <div
                      style={{
                        color: "#000",
                        backgroundColor: "#68cfd9",
                        textAlign: "center",
                        borderRadius: "10px",
                        width: "50%",
                        fontSize: "30px",
                        userSelect: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        AppyBtn({ email: verifier.email, prn });
                      }}
                      >
                      Apply
                      </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
