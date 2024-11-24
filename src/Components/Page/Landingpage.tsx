import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Header from "../compo/header-landingpage";
import Footer from "../compo/footer";
import Certificate from "../../assets/certificate";
import Image12 from "../../assets/image12";
import Image13 from "../../assets/image13";
import Image14 from "../../assets/image14";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Landingpage() {
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const navigate=useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlesubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
      
      alert("Login Successful!");
      
      const {role} = response.data
      console.log("Response:", response.data);
      
      // Redirect or save token if necessary
      if (role === "admin") {
        navigate("/admin-home");
      } else if (role === "student") {
        navigate("/student");
      } else if (role === "employer") {
        navigate("/employer-dashboard");
      } else {
        alert("Invalid role. Please contact support.");
      }
    } catch (error:any) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("No User Found! Please check your email.");
        } else if (error.response.status === 401) {
          alert("Invalid Credentials! Please check your password.");
        } else {
          alert("An error occurred: " + error.response.data);
        }
      } else {
        alert("Unable to connect to the server. Please try again later.");
      }
      console.error("Error during login:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="landing-page">
      <Header />
      <div
        style={{
          marginTop: 50,
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-around",
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <div>
          <div
            style={{
              color: "#0B7077",
              backgroundColor: "#F5F5F5",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 12,
              paddingBottom: 12,
              borderRadius: 15,
              width: "15%",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Benefits
          </div>
          <div id="why-eduplus" style={{ fontSize: 50, color: "#0B7077", fontWeight: "bolder" }}>
            Why Choose EduPlus?
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#0B7077",
              fontWeight: "bold",
              marginTop: 20,
              paddingLeft: 20,
            }}
          >
            Trusted Credentials, Verified in Seconds.
          </div>
          <div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                width: "60%",
                marginTop: 20,
              }}
            >
              <Image12 size={360} />
              <div style={{ color: "#696984", width: "80%", fontSize: 25 }}>
                Unbreakable Trust: Credentials are securely locked on the
                blockchain, making them 100% tamper-proof for ultimate peace of
                mind.
              </div>
            </div>

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                width: "60%",
                marginTop: 10,
                justifyContent: "space-around",
              }}
            >
              <Image13 size={360} />
              <div style={{ color: "#696984", width: "100%", fontSize: 25 }}>
                Lightning-Fast Verification: Recruiters can verify academic
                records instantly, saving time and hiring costs.
              </div>
            </div>

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                width: "60%",
                marginTop: 10,
                justifyContent: "space-around",
              }}
            >
              <Image14 size={360} />
              <div style={{ color: "#696984", width: "80%", fontSize: 25 }}>
                All-in-One Access: Students have everything in one place to
                easily share with employers, while recruiters enjoy a smooth,
                centralized verification process.
              </div>
            </div>
          </div>
        </div>
        <div style={{ alignContent: "center" }}>
          <Certificate size={500} />
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#0B7077",
          marginTop: 20,
          width: "30%",
          paddingTop: 30,
          paddingBottom: 30,
          paddingLeft: 40,
          paddingRight: 40,
          borderRadius: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div id="sign-in" style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}>
          Sign in
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 5,
            padding: 10,
          }}
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{ marginRight: 15, color: "#0B7077" }}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleEmailChange}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              padding: 10,
              fontSize: 16,
              borderRadius: 5,
            }}
          />
        </div>
        
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 5,
            padding: 10,
          }}
        >
          <FontAwesomeIcon
            icon={faLock}
            style={{ marginRight: 15, color: "#0B7077" }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              padding: 10,
              fontSize: 16,
              borderRadius: 5,
            }}
          />
        </div>

        <div
          onClick={handlesubmit}
          style={{
            color: "#000",
            backgroundColor: "#D2E6E4",
            padding: "10px 20px",
            marginTop: 20,
            borderRadius: 15,
            textAlign: "center",
            width: "100%",
            cursor: "pointer",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Sign in
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Landingpage;
