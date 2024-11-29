import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import Header from "../compo/header-landingpage";
import Footer from "../compo/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Landingpage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false); // Toggle between Sign In and Sign Up
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  const handlesubmit = async () => {
    try {
      const endpoint = isSignUp ? "http://localhost:3000/signup" : "http://localhost:3000/login";

      const data = isSignUp
        ? { username, email, password }
        : { email, password };

      const response = await axios.post(endpoint, data);

      alert(isSignUp ? "Sign Up Successful!" : "Login Successful!");

      if (!isSignUp) {
        const { role } = response.data;
        console.log("Response:", response.data);

        if (role === "admin") {
          navigate("/admin-home");
        } else if (role === "student") {
          navigate("/student");
        } else if (role === "employer") {
          navigate("/recruiter");
        } else {
          alert("Invalid role. Please contact support.");
        }
      }
    } catch (error: any) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="landing-page">
      <Header />
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
        <div
          id={isSignUp ? "sign-up" : "sign-in"}
          style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}
        >
          {isSignUp ? "Sign Up as Verifier" : "Sign In"}
        </div>

        {isSignUp ? (
          <>
            
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
                icon={faUser}
                style={{ marginRight: 15, color: "#0B7077" }}
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={handleUsernameChange}
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
          </>
        ) : (
          <>
          
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
          </>
        )}

      
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
          {isSignUp ? "Sign Up" : "Sign In"}
        </div>

     
        <div
          onClick={toggleSignUp}
          style={{
            color: "#D2E6E4",
            marginTop: 10,
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: 16,
          }}
        >
          {isSignUp ? "Already have an account? Sign In" : " Sign Up as Verifier"}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landingpage;
