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
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const cookie = jwtDecode(token);
      setEmail(cookie.email);
    }
  }, []);

  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:3000/verifier-students",
            {
              email: email,
            }
          );
          setResponseData(response.data); // Store the response data
        } catch (error) {
          console.error("Error fetching data:", error);
          setResponseData("Error fetching data");
        }
      };
      fetchData();
    }
  }, [email]); // Runs when 'email' is updated

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
          {/* <pre>{responseData ? JSON.stringify(responseData, null, 2) : "Loading..."}</pre> */}
          {responseData?.map((item, index) => (
            <div key={item.prn} style={{color:"#000000"}}>{item.prn}</div>
          ))}
          {/* {console.log(responseData)} */}
        </form>
      </div>

      <Footer />  
    </div>
  );
}

export default Recruiter;
