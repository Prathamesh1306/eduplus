
import Header from "../../compo/header";
import Footer from "../../compo/footer";
import "../../css/studnetverify.css"
import image from '../../../assets/pana.png'

function Studentverify(){
    return(
    <div>
    <Header />
    <div className="mainStatusDiv">
    <h3>STATUS</h3>
    <div className="statusResult">
        <h4 className="statusBool">VERIFIED</h4>
    </div>
    <div className="statusImage">
      <img src={image} alt="not found" className="image-pana"></img>
    </div>
    </div>
    <Footer />
    </div>
    )
}

export default Studentverify;