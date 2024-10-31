import "../../css/student1.css";
import Header from "../../compo/header";
import Footer from "../../compo/footer";
import image from "../../../assets/image.png"; 
import personcard from "../../../assets/personcard.png"; 
import card from "../../../assets/card.png"; 
function Student1() {
  return (
    <div className="container">
      <Header name="Harsh" year="3rd year" role="STUDENT" />

      <div className="hub-section">
        <h1>Your One-Stop Hub for Verified Academic Credentials</h1>
        <p>With EduPlus, managing and sharing your academic achievements has never been easier. Explore the benefits and features below!</p>
      </div>

      <div className="card-container">
        <div className="card">
          <div className="card-image">
            <img src={personcard} alt="Avatar" />
          </div>
          <div className="card-content">
            <h2>My Credentials</h2>
            <p>Access your academic credentials securely and share them with potential employers.</p>
            <button className="view-button">View</button>
            <div className="student-avatars">
              <img src={card} alt="Student 1" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-image">
            <img src={image} alt="Verification" />
          </div>
          <div className="card-content">
            <h2>Verification Status</h2>
            <p>Track the status of your credential verifications requested by recruiters or institutions.</p>
            <button className="view-button">View</button>
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

export default Student1;
