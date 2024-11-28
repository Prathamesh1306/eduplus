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
import { ethers,Contract } from "ethers";
// import { utils } from "ethers";
import "../../css/searchrecruiter.css";
import Header from "../../compo/header_recruiter";
import Footer from "../../compo/footer";

const contractAddress: string = "0xf116A59bbB31e86a9a403a8057761C8A8eEbc627"; // Replace with your contract address
// const contractABI = [
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "_uniqueHashValue",
//         type: "string",
//       },
//     ],
//     name: "issueCredentials",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getIssuedCredentials",
//     outputs: [
//       {
//         components: [
//           {
//             internalType: "string",
//             name: "uniqueHashValue",
//             type: "string",
//           },
//         ],
//         internalType: "struct Blockchain.Student[]",
//         name: "",
//         type: "tuple[]",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "owner",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "hashValue",
//         type: "string",
//       },
//     ],
//     name: "verifyCredentials",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "found",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];


import contractABI from "../../../contract/abi.json";


function Recruiter() {
  const [contract, setContract] = useState<Contract | null>(null);
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
          // console.log("Signer:", signer);
          // Attempt to load contract
          const blockchainContract = new ethers.Contract(
            contractAddress,
            contractABI,
            await signer
          );
          console.log("contract:", contract);


          // console.log("Contract instance:", blockchainContract);

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

  // Fetch and compare the hash value correctly
  // const verifyCredentials = async () => {
  //   if (!contract) {
  //     setStatus("Contract not initialized.");
  //     return;
  //   }
  
  //   if (!hashValue) {
  //     setStatus("Please enter a hash value.");
  //     return;
  //   }
  
  //   try {
  //     const result = await contract.verifyCredentials(hashValue);
      
  //     if (result === undefined || result === null) {
  //       setVerificationResult("❌ No result from contract.");
  //       return;
  //     }
  
  //     console.log("Verification result:", result);
  //     if (typeof result === "boolean") {
  //       setVerificationResult(result ? "✅ Hash verified!" : "❌ Hash does not match.");
  //     } else {
  //       setVerificationResult("❌ Unexpected result format.");
  //     }
  
  //     setStatus("Verification completed.");
  //   } catch (error) {
  //     console.error("Error verifying hash:", error);
  //     setStatus("Error verifying hash. Please try again.");
  //     setVerificationResult("❌ Something went wrong.");
  //   }
  // };
  

  const verifyCredentials = async () => {
    if (!contract) {
      setStatus("Contract not initialized.");
      return;
    }

    try {
      const isValid: boolean = await contract.verifyCredentials(hashValue);
      setVerificationResult(isValid ? "✅ Credential verified!" : "❌ Credential not found.");
    } catch (error) {
      console.error("Error verifying credential:", error);
      setStatus("Error verifying credential. Please try again.");
    }
  };

  // const getIssuedCredentials = async () => {
  //   if (!contract) {
  //     setStatus("Contract not initialized.");
  //     return;
  //   }

  //   // try {
  //   //   // Fetch all issued credentials from the contract
  //   //   const credentials = await contract.getIssuedCredentials();

  //   //   if (credentials && credentials.length > 0) {
  //   //     console.log("Issued credentials:", credentials);

  //   //     // Example of comparing the hash value
  //   //     credentials.forEach((credential: any) => {
  //   //       const storedHashValue = ethers.toUtf8String(credential.uniqueHashValue);
  //   //       if (storedHashValue === hashValue) {
  //   //         setVerificationResult("✅ Hash found in stored credentials!");
  //   //       } else {
  //   //         setVerificationResult("❌ Hash not found in stored credentials.");
  //   //       }
  //   //     });
  //   //   } else {
  //   //     setVerificationResult("❌ No credentials issued.");
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Error fetching credentials:", error);
  //   //   setVerificationResult("❌ Failed to fetch credentials.");
  //   // }
  // };

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

    
          {/* <button
            type="button"
            onClick={() => getIssuedCredentials()}
            className="verify-button"
          >
            Get Issued Credentials
          </button> */}
        </form>
      </div>



      <Footer />
    </div>
  );
}



export default Recruiter;
