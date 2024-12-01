import "../../css/student1.css";
import Header from "../../compo/header";
import Footer from "../../compo/footer";
import image from "../../../assets/image.png";
import personcard from "../../../assets/personcard.png";
import card from "../../../assets/card.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import InvalidRole from "../../InvalidRole";

function Student1() {
  const [name, setName] = useState<string>();
  const [invalidRole, setInvalidRole] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the history stack for this page
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Prevent navigation back or forward
      window.history.pushState(null, "", window.location.href);
    };

    // Listen for browser back/forward buttons
    window.addEventListener("popstate", handlePopState);

    return () => {
      // Clean up listener on unmount
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);



  useEffect(() => {

    try {


      const value = Cookies.get("eduplus");
      console.log(value);

      const decoded = jwtDecode(value);
      console.log(decoded);

      if(decoded.role == "student"){
       setName(decoded.username);
       setInvalidRole(1);
      }
      else{
        setInvalidRole(0);   
      }
     
    } catch (error) {
      setInvalidRole(0);
      
    }
  }, []);
  return (
    invalidRole ? (
      <div className="container">
        <Header name={name} year="3rd year" role="STUDENT" />
  
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h1
            style={{
              fontSize: "2.2em",
              color: "#006666",
              marginBottom: "10px",
              position: "relative",
            }}
          >
            Your One-Stop Hub for Verified Academic Credentials
          </h1>
          <p style={{ fontSize: "1.3em", color: "#666666" }}>
            With EduPlus, managing and sharing your academic achievements has
            never been easier. Explore the benefits and features below!
          </p>
        </div>
  
        <div className="card-container-harsh">
          <div className="card-harsh">
            <div className="card-image">
              <img src={personcard} alt="Avatar" />
            </div>
            <div className="card-content">
              <h2>My Credentials</h2>
              <p>
                Access your academic credentials securely and share them with
                potential employers.
              </p>
              <button
                className="view-button"
                onClick={() => navigate("/studentcredential")}
              >
                View
              </button>
              <div className="student-avatars">
                <img src={card} alt="Student 1" />
              </div>
            </div>
          </div>
  
          <div className="card-harsh">
            <div className="card-image">
              <img src={personcard} alt="Avatar" />
            </div>
            <div className="card-content">
              <h2>Verification</h2>
              <p>Send your credential verifications to recruiters</p>
              <button
                className="view-button"
                onClick={() => navigate("/student-rec")}
              >
                View
              </button>
              <div className="student-avatars">
                <img src={card} alt="Student 1" />
              </div>
            </div>
          </div>
  
          <div className="card-harsh">
            <div className="card-image">
              <img src={image} alt="Verification" />
            </div>
            <div className="card-content">
              <h2>Verification Status</h2>
              <p>
                Track the status of your credential verifications requested by
                recruiters or institutions.
              </p>
              <button
                className="view-button1"
                onClick={() => navigate("/student-verify")}
              >
                View
              </button>
              <div className="student-avatars">
                <img src={card} alt="Student 1" />
              </div>
            </div>
          </div>
        </div>
  
        <Footer />
      </div>
    ) : (
      <InvalidRole />
    )
  );
}
export default Student1
