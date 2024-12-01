import "../../css/searchrecruiter.css";
import Header from "../../compo/header_recruiter.tsx";
import Footer from "../../compo/footer";
import { useNavigate } from "react-router-dom";

function Recruiter() {
  const navigate = useNavigate(); 
  return (
    <div className="container">
      <Header  role="RECRUITER" />
      <div className="hub-section">
        <h1>Verify Academic Credentials with Confidence</h1>
        <p>Streamlined credential verification for recruiters, ensuring authenticity and reliability.</p>
      </div>


      <div className="form-container">
      <h2>Search and Verify Student Credentials</h2>
        <form className="credential-form">
          <label>
            <input type="text" placeholder="Enter name" />
          </label>
          <label>
            <input type="text" placeholder="Unique ID" />
          </label>
        </form>
        
        <button className="initiate-button" onClick={()=>navigate('/searchrecruiter1')} >INITIATE PAYMENT</button>
      </div>

  

      
<Footer />
    </div>
  );
}

export default Recruiter;
