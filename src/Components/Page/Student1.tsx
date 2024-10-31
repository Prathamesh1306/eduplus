import "../../App.css";
import Header from "../compo/header";
import image from '../../assets/image.png';
import personcard from '../../assets/personcard.png';
import card from  '../../assets/card.png';

function Student1() {
  return (
    <div className="container">
      <Header name="Harsh" year="3rd year" role="STUDENT"/>
    

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
      <img src={image}  alt="Verification" /> 
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
     


<footer className="footer">
  <div className="footer-content">
    <div className="footer-section contact-info">
      <h4>Contact Us</h4>
      <p>Tel: +9226262590</p>
      <p>Address:<br/>34/b1, Suyog Centre, Shivneri Peth,<br/>Gultekadi, Pune, Maharashtra 411037</p>
      <p>Response hours: 8:00 AM  to 5:00 PM</p>
      <p>Email: <a href="mailto:sales@edupluscampus.com ">sales@edupluscampus.com </a></p>
    </div>
    <div className="footer-section categories">
      <h4>Categories</h4>
      <p><a href="#">Counseling</a></p>
      <p><a href="#">Individual Development</a></p>
      <p><a href="#">More</a></p>
    </div>
    <div className="footer-section links">
      <h4>Links</h4>
      <p><a href="#">About Us</a></p>
      <p><a href="#">Blog</a></p>
    </div>
    <div className="footer-section query-form">
      <form>
         <p>Have query?</p>
        <input type="text" placeholder=" Write to us" />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
  <div className="footer-bottom">
    <p> © Copyright EduplusCampus 2024. All Rights Reserved.</p>
    <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
  </div>
</footer>

    
    </div>
  );
}

export default Student1;
