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
  const [responseData, setResponseData] = useState("");
  const [toggleNotFound,setToggleNotFound ]=useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const cookie = jwtDecode(token);
      setEmail(cookie.email);
    }
  }, []);
  
  useEffect(() => {
    console.log(email)
    console.log("token")
    if (email) {
      const fetchData = async () => {
        try {
          setToggleNotFound(true);
          console.log(response)
          const response = await axios.post(
            "http://localhost:3000/verifier-students",
            {
              email: email,
            }
          );
          setResponseData(response.data); // Store the response data
          console.log(response);
        } catch (error) {
          setToggleNotFound(false);
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
          {toggleNotFound ? (
  responseData?.length > 0 ? (
    responseData.map((item) => (
      <div key={item.prn} style={{ color: "#000000" }}>
        {item.prn}
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
