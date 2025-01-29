// import React, { useState, useEffect } from "react";
// import { ethers,Contract } from "ethers";
// // import { utils } from "ethers";
// import "../../css/searchrecruiter.css";
// import Header from "../../compo/header_recruiter";
// import Footer from "../../compo/footer";

// const contractAddress: string = "0xf116A59bbB31e86a9a403a8057761C8A8eEbc627"; // Replace with your contract address
// // const contractAddress: string = "0x5f44edf49edf6014d791e327ef57045f99ea83b2";

// import contractABI from "../../../contract/abi.json";

// function Recruiter() {
//   const [contract, setContract] = useState<Contract | null>(null);
//   const [account, setAccount] = useState<string | null>(null);
//   const [hashValue, setHashValue] = useState<string>(""); // Hash input
//   const [verificationResult, setVerificationResult] = useState<string>(""); // Result of verification
//   const [status, setStatus] = useState<string>(""); // Connection status

//   useEffect(() => {
//     const initBlockchain = async () => {
//       if (window.ethereum) {
//         try {
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           const signer = await provider.getSigner();
//           // console.log("Signer:", signer);
//           // Attempt to load contract
//           const blockchainContract = new ethers.Contract(
//             contractAddress,
//             contractABI,
//             await signer
//           );
//           console.log("contract:", contract);

//           // console.log("Contract instance:", blockchainContract);

//           // Set contract instance
//           setContract(blockchainContract);

//           // Request accounts from MetaMask
//           const accounts = await provider.send("eth_requestAccounts", []);
//           if (accounts.length === 0) {
//             setStatus("No MetaMask account found.");
//           } else {
//             setAccount(accounts[0]);
//             setStatus("Connected to MetaMask.");
//           }
//         } catch (error) {
//           console.error("Error initializing blockchain:", error);
//           setStatus("Failed to connect to MetaMask.");
//         }
//       } else {
//         setStatus("MetaMask is not installed.");
//       }
//     };

//     initBlockchain();
//   }, []);

//   const verifyCredentials = async () => {
//     if (!contract) {
//       setStatus("Contract not initialized.");
//       return;
//     }

//     try {
//       const isValid: boolean = await contract.verifyCredentials(hashValue);
//       setVerificationResult(isValid ? "✅ Credential verified!" : "❌ Credential not found.");
//     } catch (error) {
//       console.error("Error verifying credential:", error);
//       setStatus("Error verifying credential. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <Header role="RECRUITER" />
//       <div className="hub-section">
//         <h1>Verify Academic Credentials with Confidence</h1>
//         <p>
//           Streamlined credential verification for recruiters, ensuring
//           authenticity and reliability.
//         </p>
//       </div>

//       <div className="form-container">
//         <form className="credential-form">
//           <h2>Verify Credential</h2>
//           <p>Connected Account: {account || "Not connected"}</p>
//           <p>Status: {status}</p>
//           <input
//             type="text"
//             placeholder="Enter unique hash value"
//             value={hashValue}
//             onChange={(e) => setHashValue(e.target.value)}
//             className="form-input"
//           />

//           <input
//             type="file"
//             placeholder="upload pdf"

//           />
//           <button
//             type="button"
//             onClick={() => verifyCredentials()}
//             className="verify-button"
//             disabled={!hashValue || status === "Verifying..."}
//           >
//             {status === "Verifying..." ? "Verifying..." : "Verify"}
//           </button>

//           {verificationResult && (
//             <p className="verification-result">{verificationResult}</p>
//           )}

//         </form>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Recruiter;

import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import "../../css/searchrecruiter.css";
import Header from "../../compo/header_recruiter";
import Footer from "../../compo/footer";
import axios from "axios";

// const contractAddress: string = "0xf116A59bbB31e86a9a403a8057761C8A8eEbc627"; // Replace with your contract address
const contractAddress: string = "0xc85A55b5b79795761793ADF00CFD2aFe16BF850e"; // Replace with your contract address
import contractABI from "../../../contract/abi.json";
import Breadcrumbs from "../../compo/breadcrumbs";

function Recruiter() {
  const [contract, setContract] = useState<Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [hashValue, setHashValue] = useState<string>(""); // Hash input
  const [verificationResult, setVerificationResult] = useState<string>(""); // Result of verification
  const [status, setStatus] = useState<string>(""); // Connection status
  const [, setFile] = useState<File | null>(null); // File state

  useEffect(() => {
    const initBlockchain = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          // Attempt to load contract
          const blockchainContract = new ethers.Contract(
            contractAddress,
            contractABI,
            await signer
          );

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

  const verifyCredentials = async () => {
    if (!contract) {
      setStatus("Contract not initialized.");
      return;
    }

    try {
      const isValid: boolean = await contract.verifyCredentials(hashValue);
      setVerificationResult(
        isValid ? "✅ Credential verified!" : "❌ Credential not found."
      );
    } catch (error) {
      console.error("Error verifying credential:", error);
      setStatus("Error verifying credential. Please try again.");
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("pdf", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:3000/upload-pdf",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.data.hash) {
          setHashValue(response.data.hash);
        } else {
          setStatus("Failed to get hash from the server.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setStatus("Error uploading file. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <Header role="RECRUITER" />
      <Breadcrumbs/>
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

          <input
            type="file"
            onChange={handleFileUpload}
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

