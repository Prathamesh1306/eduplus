import "../../css/searchrecruiter.css";
import Header from "../../compo/header_recruiter.tsx";
import Footer from "../../compo/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Breadcrumbs from "../../compo/breadcrumbs.tsx";

function Recruiter() {

  const [email,setEmail] = useState("")
  useEffect(() => {
    const token = Cookies.get("eduplus");
    const cookie = jwtDecode(token);
setEmail(cookie.email)
    const pressed = async () => {
      await axios.post("https://localhost:3000/verifier-students", {
        email: email,
      });
    };
    pressed();

  });
  return (
    <div className="container">
      <Header role="RECRUITER" />
      <Breadcrumbs/>
      <div className="hub-section">
        <h1>Verify Academic Credentials with Confidence</h1>
        <p>
          Streamlined credential verification for recruiters, ensuring
          authenticity and reliability.
        </p>
      </div>

      <div className="form-container">
        <form className="credential-form"></form>
      </div>

      <Footer />
    </div>
  );
}

export default Recruiter;
