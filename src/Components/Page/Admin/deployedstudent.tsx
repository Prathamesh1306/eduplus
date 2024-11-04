import Header from "../../compo/header_admin";
import Footer from "../../compo/footer";
import "../../css/deployedstudent.css"
import william from "../../../assets/William cdegree.png"

function Deploystudent(){
    return(
    <div className="main">
    <Header role="Admin" />
    <h1 className="title">Deployed Student</h1>
    <div className="deployed-container">

      <div className="input-group">
        <input type="text" id="Input-search" name='input-search' placeholder="Enter the name of student" />
      </div>
      <button className="generate-btn">Generate QR</button>
      <div className="frame-pdf">
        <img src={william} alt="pdf Front" />
      </div>
    </div>
    <Footer />
    </div>
    )
}

export default Deploystudent;