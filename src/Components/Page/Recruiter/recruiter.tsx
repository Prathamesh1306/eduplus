import "../../css/recruiter.css";
import card from "../../../assets/card.png";
import Header from "../../compo/header_recruiter.tsx";
import Footer from "../../compo/footer";
import { useNavigate } from "react-router-dom";
import image from "../../../assets/image.png";
import image1 from "../../../assets/t.webp";

function Recruiter() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "15vh",
      }}
    >
      <Header role="RECRUITER" />
      <div style={{ textAlign: "center", margin: "20px 0" ,}}>
        <h1
          style={{
            fontSize: "2.2em",
            color: "#006666",
            marginBottom: "10px",
            position: "relative",
          }}
        >
          Verify Academic Credentials with Confidence
        </h1>
        <p style={{ fontSize: " 1.3em", color: "#666666" }}>
          Streamlined credential verification for recruiters, ensuring
          authenticity and reliability.
        </p>
      </div>

      <div className="card-container-harsh">
        <div className="card-harsh">
          <div className="card-image">
            <img src={image1} alt="Avatar" />
          </div>
          <div className="card-content">
            <h2>Search and Verify Student Credentials</h2>

            <button
              className="view-button"
              onClick={() => navigate("/searchrecruiter1 ")}
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
            <h2>Verify Academic Credentials with Confidence</h2>

            <button
              className="view-button1"
              onClick={() => navigate("/verifyrecruiter")}
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
  );
}

export default Recruiter;
