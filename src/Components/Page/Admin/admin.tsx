import { useState } from "react";
import "../../../App.css";
import Header from "../../compo/header_admin.tsx";
import Footer from "../../compo/footer.tsx";
import Card from "../../compo/card.tsx";
import studentManagementImage from "../../../assets/Studentmanage.png";
import deployedStudentsImage from "../../../assets/Deployedstud.png";
import credentialValidationImage from "../../../assets/Createvalida.png";
import cardimage from "../../../assets/card.png";

function Admin() {
  const [account, setAccount] = useState<string | null>(null);

  // Function to connect to MetaMask
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("MetaMask connection failed:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div className="container">
      <Header role="ADMIN" />

      <div className="hub-section">
        <h1>Your One-Stop Hub for Verified Academic Credentials</h1>
        <p>With EduPlus, managing and sharing your academic achievements has never been easier. Explore the benefits and features below!</p>

        <button onClick={connectWallet} className="metamask-button">
          {account ? `Connected: ${account}` : "Connect to MetaMask"}
        </button>
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
