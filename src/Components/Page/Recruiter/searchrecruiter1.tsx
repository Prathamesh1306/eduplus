import "../../css/searchrecruiter.css";
import Header from "../../compo/header_recruiter.tsx";
import Footer from "../../compo/footer";

function Recruiter() {
  return (
    <div className="container">
      <Header  role="RECRUITER" />
      <div className="hub-section">
        <h1>Verify Academic Credentials with Confidence</h1>
        <p>Streamlined credential verification for recruiters, ensuring authenticity and reliability.</p>
      </div>


      <div className="form-container">

        <form className="credential-form">
          
          
        </form>
        <button className="initiate-button">INITIATE PAYMENT</button>
      </div>

  

      
<Footer />
    </div>
  );
}

export default Recruiter;
