import "../../css/recruiter.css";
import card from "../../../assets/card.png"; 
import Header from "../../compo/header_recruiter.tsx";
import Footer from "../../compo/footer";
import personcard from "../../../assets/personcard.png"; 
import { useNavigate } from "react-router-dom";
import image from "../../../assets/image.png"; 
import image1 from "../../../assets/t.webp"



function Recruiter() {
  const navigate = useNavigate(); 
  return (
    <div className="container">
      <Header  role="RECRUITER" />
      <div className="hub-section">
        <h1>Verify Academic Credentials with Confidence</h1>
        <p>Streamlined credential verification for recruiters, ensuring authenticity and reliability.</p>
      </div>

      <div className="card-container-harsh">
        <div className="card-harsh">
          <div className="card-image">
            <img src={image1} alt="Avatar" />
          </div>
          <div className="card-content">
            <h2>Search and Verify Student Credentials</h2>
            
            <button className="view-button" onClick={()=>navigate('/searchrecruiter1 ')} >View</button>
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
           
            <button className="view-button1"  onClick={()=>navigate('/verifyrecruiter')} >View</button>
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