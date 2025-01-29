import Header from "../../compo/header";
import Footer from "../../compo/footer";
import "../../css/studnetverify.css";
import image from "../../../assets/pana.png";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Breadcrumbs from "../../compo/breadcrumbs";


function Studentverify() {
  const [verify, setVerify] = useState(false); 
  // const cookies = Cookies.get("eduplus");
  // const decoded = jwtDecode(cookies);
  // const response= axios.get("https://3082be90-5530-44d0-82fe-4c58123a0d44-00-2pynytxp6y3na.pike.replit.dev/students");
   
  // // console.log(decoded);
  // console.log(response.data.username);
  // // if(decoded.username === response.data.username){

  // // }


  return (
    <div>
      <Header />
      <Breadcrumbs/>
      <div className="mainStatusDiv">
        <h3>STATUS</h3>
        <div className="statusResult">
          <h4 className="statusBool">{verify ? "Verified" : "Not Verified"}</h4>
        </div>
        <div className="statusImage">
          <img src={image} alt="not found" className="image-pana"></img>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Studentverify;
