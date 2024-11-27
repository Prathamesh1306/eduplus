// import "../../css/searchrecruiter.css";
// import Header from "../../compo/header_recruiter.tsx";
// import Footer from "../../compo/footer";

// function Recruiter() {
//   return (
//     <div className="container">
//       <Header  role="RECRUITER" />
//       <div className="hub-section">
//         <h1>Verify Academic Credentials with Confidence</h1>
//         <p>Streamlined credential verification for recruiters, ensuring authenticity and reliability.</p>
//       </div>

//       <div className="form-container">

//         <form className="credential-form">

//         </form>

//       </div>

// <Footer />
//     </div>
//   );
// }

// export default Recruiter;



import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../../css/searchrecruiter.css";
import Header from "../../compo/header_recruiter";
import Footer from "../../compo/footer";

const contractAddress: string = "0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005"; // Replace with your contract address
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_uniqueHashValue",
        "type": "string"
      }
    ],
    "name": "issueCredentials",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getIssuedCredentials",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "uniqueHashValue",
            "type": "string"
          }
        ],
        "internalType": "struct Blockchain.Student[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "hashValue",
        "type": "string"
      }
    ],
    "name": "verifyCredentials",
    "outputs": [
      {
        "internalType": "bool",
        "name": "found",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function Recruiter() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [hashValue, setHashValue] = useState<string>(""); // Hash input
  const [verificationResult, setVerificationResult] = useState<string>(""); // Result of verification
  const [status, setStatus] = useState<string>(""); // Connection status

  useEffect(() => {
    const initBlockchain = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          console.log("Signer:", signer);
  
          // Attempt to load contract
          const blockchainContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
  
          console.log("Contract instance:", blockchainContract);
  
          // Set contract instance
          setContract(blockchainContract);
  
          // Request accounts from MetaMask
          const accounts = await provider.send("eth_requestAccounts", []);
          if (accounts.length === 0) {
            setStatus("No MetaMask account found.");
          } else {
            setAccount(accounts[0]);
            setStatus("Connected to MetaMask.");
          }
  
        } catch (error) {
          console.error("Error initializing blockchain:", error);
          setStatus("Failed to connect to MetaMask.");
        }
      } else {
        setStatus("MetaMask is not installed.");
      }
    };
  
    initBlockchain();
  }, []);
  

  //dnisdncdnfc
  const verifyCredentials = async () => {
    if (!contract) {
      setStatus("Contract not initialized.");
      return;
    }
  
    if (!hashValue) {
      setStatus("Please enter a hash value.");
      return;
    }
  
    try {
      // Call the verifyCredentials function from the contract
      const result = await contract.verifyCredentials(hashValue);
  
      console.log("Verification result:", result);
  
      if (typeof result === "boolean") {
        if (result) {
          setVerificationResult("✅ Hash verified!");
        } else {
          setVerificationResult("❌ Hash does not match.");
        }
      } else {
        setVerificationResult("❌ Unexpected result format.");
      }
  
      setStatus("Verification completed.");
    } catch (error) {
      console.error("Error verifying hash:", error);
      setStatus("Error verifying hash. Please try again.");
      setVerificationResult("❌ Something went wrong.");
    }
  };
  
  return (
    <div className="container">
      <Header role="RECRUITER" />
      <div className="hub-section">
        <h1>Verify Academic Credentials with Confidence</h1>
        <p>
          Streamlined credential verification for recruiters, ensuring
          authenticity and reliability.
        </p>
      </div>

      <div className="form-container">
        <form className="credential-form">
          <h2>Verify Credential</h2>
          <p>Connected Account: {account || "Not connected"}</p>
          <p>Status: {status}</p>
          <input
            type="text"
            placeholder="Enter unique hash value"
            value={hashValue}
            onChange={(e) => setHashValue(e.target.value)}
            className="form-input"
          />
          <button
            type="button"
            onClick={() => verifyCredentials()} 
            className="verify-button"
            disabled={!hashValue || status === "Verifying..."}
          >
            {status === "Verifying..." ? "Verifying..." : "Verify"}
          </button>

          {verificationResult && (
            <p className="verification-result">{verificationResult}</p>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Recruiter;
