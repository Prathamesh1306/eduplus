import Header from "../../compo/header";
import Footer from "../../compo/footer";
import "../../css/studentcredential.css";


function Studentcredential() {
    return (
        <div className="student-credential">
            <Header name="Harsh" year="3rd year" role="STUDENT" />
            
            <div className="credential-content">
                <h2>Credentials</h2>
                
                <div className="credential-card">
                    <img src={ ' '} alt="pdf will be render" className="id-card-image" />
                </div>
                
                <div className="unique-id">
                    <span>Unique ID:</span> 
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Studentcredential;
