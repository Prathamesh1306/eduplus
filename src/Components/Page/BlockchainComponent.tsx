import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import contractABI from "../../contracts/Blockchain.json"; // Import ABI (ensure the file path is correct)
// import contractABI from "../../contracts/Blockchain.json";
console.log(contractABI); // Ensure it logs the JSON object


const contractAddress: string = "0xf116A59bbB31e86a9a403a8057761C8A8eEbc627"; // Replace with your deployed contract address

const BlockchainComponent: React.FC = () => {
  // State hooks
  const [contract, setContract] = useState<Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [hashValue, setHashValue] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<string>("");

  // Initialize Ethereum provider and contract
  useEffect(() => {
    const initBlockchain = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          // const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const blockchainContract =  new ethers.Contract(
            contractAddress,
            contractABI,
            await signer
          );

          setContract(blockchainContract);

          const accounts = await provider.send("eth_requestAccounts", []);
          setAccount(accounts[0]);
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

  // Issue credentials
  const issueCredentials = async () => {
    if (!contract) {
      setStatus("Contract not initialized.");
      return;
    }

    try {
      const tx = await contract.issueCredentials(hashValue);
      await tx.wait(); // Wait for the transaction to be mined
      setStatus("Credential issued successfully!");
      setHashValue(""); // Clear the input field
    } catch (error) {
      console.error("Error issuing credential:", error);
      setStatus("Error issuing credential. Please try again.");
    }
  };

  // Verify credentials
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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Blockchain Credential System</h1>
      <p style={styles.status}>Connected Account: {account || "Not connected"}</p>
      <p style={styles.status}>Status: {status}</p>

      <div style={styles.section}>
        <h2>Issue Credential</h2>
        <input
          type="text"
          placeholder="Enter unique hash value"
          value={hashValue}
          onChange={(e) => setHashValue(e.target.value)}
          style={styles.input}
        />
        <button onClick={issueCredentials} style={styles.button}>
          Issue
        </button>
      </div>

      <div style={styles.section}>
        <h2>Verify Credential</h2>
        <input
          type="text"
          placeholder="Enter unique hash value"
          value={hashValue}
          onChange={(e) => setHashValue(e.target.value)}
          style={styles.input}
        />
        <button onClick={verifyCredentials} style={styles.button}>
          Verify
        </button>
        {verificationResult && <p style={styles.result}>{verificationResult}</p>}
      </div>
    </div>
  );
};

// Inline styling for a cleaner and consistent UI
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center" as const,
    padding: "20px",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
  },
  status: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#666",
  },
  section: {
    margin: "20px 0",
  },
  input: {
    padding: "10px",
    width: "80%",
    marginBottom: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  result: {
    fontSize: "18px",
    marginTop: "10px",
    color: "#007BFF",
  },
};

export default BlockchainComponent;
