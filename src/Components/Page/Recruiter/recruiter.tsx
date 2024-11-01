import "../../css/recruiter.css";
import Header from "../../compo/header_recruiter.tsx";
import Footer from "../../compo/footer";


function Recruiter() {
    return (
      <div className="container">
        <Header role="RECRUITER" />
        
        <div className="form-container">
          <h2 className="form-heading">Search and Verify Student Credentials</h2> {/* Add a heading here */}
          
          <form className="credential-form">
            <label>
              <input type="text" placeholder="Enter name" />
            </label>
            <label>
              <input type="text" placeholder="Unique ID" />
            </label>
          </form>
          <button className="initiate-button">INITIATE PAYMENT</button>
        </div>
  
        <Footer />
      </div>
    );
  }
  
  export default Recruiter;