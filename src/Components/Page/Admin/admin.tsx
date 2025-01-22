import { useState, useEffect } from "react";
import "../../../App.css";
import Header from "../../compo/header_admin.tsx";
import Footer from "../../compo/footer.tsx";
import Card from "../../compo/card.tsx";
import studentManagementImage from "../../../assets/Studentmanage.png";
import deployedStudentsImage from "../../../assets/Deployedstud.png";
import cardimage from "../../../assets/card.png";
import verified from "../../../assets/verifiedstudent.png";


import axios from "axios";
function Admin() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const response = axios.get("/").then(() => {
      console.log(response);
    });
  }, []);

  // Function to connect to MetaMask
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);

        // Replace history to prevent navigation back
        window.history.replaceState(null, "", window.location.href);
      } catch (error) {
        console.error("MetaMask connection failed:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  // Prevent back navigation
  useEffect(() => {
    const handlePopState = () => {
      if (!account) {
        // Push the current location back into the history stack
        window.history.pushState(null, "", window.location.href);
      }
    };

    // Initialize the history stack for this page
    window.history.pushState(null, "", window.location.href);

    // Listen for browser back/forward buttons
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [account]);

  return (
    <div className="container">
      <Header role="ADMIN" />

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <h1
          style={{
            fontSize: "2.2em",
            color: "#006666",
            marginBottom: "10px",
            position: "relative",
          }}
        >
          Your One-Stop Hub for Verified Academic Credentials
        </h1>
        <p
          style={{ fontSize: " 1.3em", color: "#666666", marginBottom: "15px" }}
        >
          With EduPlus, managing and sharing your academic achievements has
          never been easier. Explore the benefits and features below!
        </p>

        <button onClick={connectWallet} className="metamask-button">
          {account ? `Connected: ${account}` : "Connect to MetaMask"}
        </button>
      </div>

      <div className="card-container">
        <Card
          image={studentManagementImage}
          image2={cardimage}
          title="Verifier List"
          description="Manage and validate credential requests from recruiters or institutions"
        />
        <Card
          image={verified}
          image2={cardimage}
          title="Freezed student"
          description="Manage student verifications"
        />
        <Card
          image={deployedStudentsImage}
          image2={cardimage}
          title="Deployed Students"
          description="View students with successfully deployed credentials and access transaction details"
        />
      </div>

      <Footer />
    </div>
  );
}

export default Admin;
