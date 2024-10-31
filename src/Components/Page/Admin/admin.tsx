import "../../../App.css";
import Header from "../../compo/header_admin.tsx";
import Footer from "../../compo/footer.tsx";
import Card from "../../compo/card.tsx";
import studentManagementImage from "../../../assets/Studentmanage.png";
import deployedStudentsImage from "../../../assets/Deployedstud.png";
import credentialValidationImage from "../../../assets/Createvalida.png";
import cardimage from "../../../assets/card.png"; 


function Admin() {
  return (
    <div className="container">
      <Header role="ADMIN" />

      <div className="hub-section">
        <h1>Your One-Stop Hub for Verified Academic Credentials</h1>
        <p>With EduPlus, managing and sharing your academic achievements has never been easier. Explore the benefits and features below!</p>
      </div>

      <div className="card-container">
        <Card
          image={studentManagementImage}
          image2={cardimage}
          title="Student Management"
          description="Manage student credentials and deployment status"
        />
        <Card
          image={deployedStudentsImage}
          image2={cardimage}
          title="Deployed Students"
          description="View students with successfully deployed credentials and access transaction details"
        />
        <Card
          image={credentialValidationImage}
          image2={cardimage}
          title="Credential Validation"
          description="Manage and validate credential requests from recruiters or institutions"
        />
      </div>

       
      <Footer />
    </div>
  );
}

export default Admin;












    // <div className="card1">
    //       <div className="card-image">
    //         <img src={studentManagementImage} alt="p" />
    //       </div>
    //       <div className="card-content">
    //         {/* <div className="student-avatars">
    //            <img src={cardimage} alt="Student avatar" />
    //         </div> */}
    //         <h2>Student Management</h2>
    //         <p>Manage student credentials and deployment status</p>
    //         <button className="view-button">View</button>
    //      </div>
    //     </div>
 
    //     <div className="card2">
    //       <div className="card-image">
    //         <img src={deployedStudentsImage} alt="p" />
    //       </div>
    //       <div className="card-content">
    //         {/* <div className="student-avatars">
    //            <img src={cardimage} alt="Student avatar" />
    //         </div> */}
    //         <h2>Deployed Students</h2>
    //         <p>View students with successfully deployed credentials and access transaction details</p>
    //         <button className="view-button">View</button>
    //      </div>
    //     </div>

    //     <div className="card3">
    //       <div className="card-image">
    //         <img src={credentialValidationImage} alt="p" />
    //       </div>
    //       <div className="card-content">
    //         {/* <div className="student-avatars">
    //            <img src={cardimage} alt="Student avatar" />
    //         </div> */}
    //         <h2>Credential Validation</h2>
    //         <p>Manage and validate credential requests from recruiters or institutions</p>
    //         <button className="view-button">View</button>
    //      </div>
    //     </div>