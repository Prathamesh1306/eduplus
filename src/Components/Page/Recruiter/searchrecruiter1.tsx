import "../../css/searchrecruiter.css";
import Header from "../../compo/header_recruiter.tsx";
import Footer from "../../compo/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Breadcrumbs from "../../compo/breadcrumbs.tsx";

function Recruiter() {
  const [email, setEmail] = useState("");
  const [prn, setPrn] = useState();
  const [pdfUrl, setPdfUrl] = useState("");
  const [responseData, setResponseData] = useState("");
  const [toggleNotFound, setToggleNotFound] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const cookie = jwtDecode(token);
      setEmail(cookie.email);
      setPrn(cookie.prn);
      console.log("Hekko world");

      console.log(cookie.email);
      console.log(cookie.user);
      console.log(cookie.role);
    }
  }, []);

  useEffect(() => {
    console.log(email);
    console.log("token");
    if (email) {
      const fetchData = async () => {
        try {
          setToggleNotFound(true);
          const response = await axios.post(
            "http://localhost:3000/verifier-students",
            {
              email: email,
            }
          );
          setResponseData(response.data); // Store the response data
          console.log(response.data);
        } catch (error) {
          setToggleNotFound(false);
          console.error("Error fetching data:", error);
          setResponseData("Error fetching data");
        }
      };

      fetchData();
    }
  }, [email]); // Runs when 'email' is updated

  const fetchPdf = (prn: string) => {
    try {
      setPdfUrl(`http://localhost:3000/download-pdf-verifier?prn=${prn}`);
      window.open(
        `http://localhost:3000/download-pdf-verifier?prn=${prn}`,
        "_blank"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Header role="RECRUITER" />
      <Breadcrumbs />
      <div className="hub-section">
        <h1>Verify Academic Credentials with Confidence</h1>
        <p>
          Streamlined credential verification for recruiters, ensuring
          authenticity and reliability.
        </p>
      </div>

      <div className="form-container">
        <form className="credential-form">
          <h2>Verification Response:</h2>
          <div
            className=""
            style={{
              color: "#000",
              justifyContent: "space-around",
              display: "flex",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <div className="">Name</div>
            <div className="">PRN</div>
            <div className="">pdf</div>
          </div>
          {toggleNotFound ? (
            responseData?.length > 0 ? (
              responseData?.map((item: any) => (
                <div
                  key={item.prn}
                  className=""
                  style={{ justifyContent: "space-around", display: "flex" }}
                >
                  <div style={{ color: "#000000" }}>{item.name}</div>
                  <div style={{ color: "#000000" }}>{item.prn}</div>
                  <div
                    className=""
                    style={{
                      backgroundColor: "#159879",
                      color: "#000",
                      borderRadius: "10px",
                      padding: "1px 5px",
                      cursor: "pointer",
                    }}
                    onClick={() => fetchPdf(item.prn)}
                  >
                    Download PDF
                  </div>
                </div>
              ))
            ) : (
              <div>No data found</div>
            )
          ) : (
            <div>Not found</div>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Recruiter;
