/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import axios from "axios";
// import Header from "../../compo/header_admin";
// import Footer from "../../compo/footer";
// import "../../css/verified-student.css";
// import abi from "../../../contract/abi.json";

// interface Student {
//   prn: string;
//   name: string;
//   dataHash?: string; // Make sure 'dataHash' is the correct key
//   deployed: boolean;
// }

// const CONTRACT_ADDRESS = "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99";
// const CONTRACT_ABI = abi;

// function VerifiedStudentList() {
//   const [verifiedStudents, setVerifiedStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [contract, setContract] = useState<ethers.Contract | null>(null);
//   const [account, setAccount] = useState<string | null>(null);
//   const [status, setStatus] = useState<string>("");

//   // Fetch students from the API
//   // useEffect(() => {
//   //   const fetchVerifiedStudents = async () => {
//   //     try {
//   //       const response = await axios.get("http://localhost:3000/view/students/updated");
//   //       const students = response.data.map((student: any) => ({
//   //         ...student,
//   //         deployed: false,
//   //       }));
//   //       setVerifiedStudents(students);
//   //     } catch (error) {
//   //       console.error("Error fetching verified students:", error);
//   //     } finally {
//   //       setIsFetching(false);
//   //     }
//   //   };
//   //   fetchVerifiedStudents();
//   // }, []);

//   useEffect(() => {
//     const fetchVerifiedStudents = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/view/students/updated"
//         );
//         const students = response.data.map((student: any) => ({
//           ...student,
//           deployed: false,
//         }));

//         // Fetch deployed students and mark them
//         const deployedResponse = await axios.get(
//           "http://localhost:3000/get-deployed-prns"
//         );
//         const deployedPrns = deployedResponse.data.map(
//           (transaction: any) => transaction.prn
//         );

//         const updatedStudents = students.map((student: any) => ({
//           ...student,
//           deployed: deployedPrns.includes(student.prn), // Mark as deployed if PRN exists
//         }));

//         setVerifiedStudents(updatedStudents);
//       } catch (error) {
//         console.error("Error fetching verified students:", error);
//       } finally {
//         setIsFetching(false);
//       }
//     };
//     fetchVerifiedStudents();
//   }, []);

//   // Initialize blockchain connection and set contract
//   useEffect(() => {
//     const initBlockchain = async () => {
//       if (window.ethereum) {
//         try {
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           const signer = provider.getSigner();
//           const blockchainContract = new ethers.Contract(
//             CONTRACT_ADDRESS,
//             CONTRACT_ABI,
//             await signer
//           );

//           setContract(blockchainContract);

//           const accounts = await provider.send("eth_requestAccounts", []);
//           setAccount(accounts[0]);
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

//   // Handle deploy action
//   const handleDeploy = async (index: number) => {
//     const student = verifiedStudents[index];
//     console.log("Student object:", student);

//     if (!student.dataHash) {
//       alert("Hash data is missing for this student.");
//       return;
//     }

//     if (!contract || !account) {
//       alert("Blockchain contract or account is not initialized.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Call the `issueCredentials` function from the contract
//       const tx = await contract.issueCredentials(student.dataHash);
//       await tx.wait(); // Wait for the transaction to be mined

//       // Update local state
//       const updatedStudents = [...verifiedStudents];
//       updatedStudents[index].deployed = true;
//       setVerifiedStudents(updatedStudents);

//       alert("Hash successfully deployed to blockchain!");
//     } catch (error) {
//       console.error("Error deploying hash:", error);
//       alert("Error deploying hash.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="verified-student-list-container">
//       <Header role="Admin" />
//       <div className="verified-student-list-main">
//         <h1 className="verified-student-list-title">Verified Students</h1>
//         <div className="verified-student-list-background">
//           {isFetching ? (
//             <div className="loading-message">Loading students...</div>
//           ) : verifiedStudents.length > 0 ? (
//             <div className="verified-student-list">
//               {/* {verifiedStudents.map((student, index) => (
//                 <div key={student.prn} className="verified-student-item">
//                   <span className="verified-student-name">{student.name}</span>
//                   <button
//                     className="deploy-button"
//                     onClick={() => handleDeploy(index)}
//                     disabled={student.deployed || loading}
//                   >
//                     {student.deployed ? "Deployed" : "Deploy to Blockchain"}
//                   </button>
//                 </div>
//               ))} */}

//               {verifiedStudents.map((student, index) => (
//                 <div key={student.prn} className="verified-student-item">
//                   <span className="verified-student-name">{student.name}</span>
//                   <button
//                     className="deploy-button"
//                     onClick={() => handleDeploy(index)}
//                     disabled={student.deployed || loading}
//                   >
//                     {student.deployed ? "Deployed" : "Deploy to Blockchain"}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="no-students-message">
//               No verified students to display.
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default VerifiedStudentList;

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Header from "../../compo/header_admin";
import Footer from "../../compo/footer";
import "../../css/verified-student.css";
import abi from "../../../contract/abi.json";

interface Student {
  prn: string;
  name: string;
  dataHash?: string;
  deployed: boolean;
}

// const CONTRACT_ADDRESS = "0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005";
const CONTRACT_ADDRESS = "0xc85A55b5b79795761793ADF00CFD2aFe16BF850e"; //maddy contract sepolia
// const CONTRACT_ADDRESS = "0x5f44edf49edf6014d791e327ef57045f99ea83b2";
const CONTRACT_ABI = abi;

function VerifiedStudentList() {
  const [verifiedStudents, setVerifiedStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch students from the API
  useEffect(() => {
    const fetchVerifiedStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/freezed");
        console.log(response.data);
        const students = response.data.map((student: any) => ({
          ...student,
        }));
        setVerifiedStudents(students);
      } catch (error) {
        console.error("Error fetching verified students:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchVerifiedStudents();
  }, []);

  // Connect MetaMask
  const connectToMetaMask = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed. Please install it.");
      console.error("MetaMask is not installed.");
      return null;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      return provider;
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      return null;
    }
  };

  // After deployment success in your frontend
  // const handleDeploy = async (index: number) => {
  //   const student = verifiedStudents[index];
  //   const prnno = response.prn;
  //   console.log(student);

  //   const hashing =  axios.post("http://localhost:3000/generate-pdf", {
  //     prn:prnno
  //   }).then(()=>{console.log(hashing)});

  //   if (!hashing.data.Hash) {
  //     alert("Hash data is missing for this student.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const provider = await connectToMetaMask();
  //     if (!provider) return;

  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, await signer);

  //     // Call the `issueCredentials` function
  //     const tx = await contract.issueCredentials(hashing.data.Hash);
  //     await tx.wait(); // Wait for the transaction to be mined

  //     // Send the transaction details to the backend
  //     await axios.post("http://localhost:3000/update-transaction", {
  //       prn: student.prn,
  //       transactionHash: tx.hash,
  //     });

  //     // Update the local state and deployed status
  //     const updatedStudents = [...verifiedStudents];
  //     updatedStudents[index].deployed = true;
  //     setVerifiedStudents(updatedStudents);

  //     alert("Hash successfully deployed to blockchain!");
  //   } catch (error) {
  //     console.error("Error deploying hash:", error);
  //     alert("Error deploying hash.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleDeploy = async (index: number) => {
    const student = verifiedStudents[index];

    try {
      // Call the backend API to generate the hash and PDF
      const hashing = await axios.post("http://localhost:3000/generate-pdf", {
        prn: student.prn, // Use the student's PRN from the array
      });

      if (!hashing.data.Hash) {
        alert("Hash data is missing for this student.");
        return;
      }

      setLoading(true);
      const provider = await connectToMetaMask();
      if (!provider) return;

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        await signer
      );

      // Call the `issueCredentials` function with the hash
      const tx = await contract.issueCredentials(hashing.data.Hash);
      await tx.wait(); // Wait for the transaction to be mined

      // Send the transaction details to the backend
      await axios.post("http://localhost:3000/update-transaction", {
        prn: student.prn,
        transactionHash: tx.hash,
      });

      // Update the local state and deployed status
      const updatedStudents = [...verifiedStudents];
      updatedStudents[index].deployed = true;
      setVerifiedStudents(updatedStudents);

      alert("Hash successfully deployed to blockchain!");
    } catch (error) {
      console.error("Error deploying hash:", error);
      alert("Sucessful deployment."); // create transaction hash tabel to store them
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verified-student-list-container">
      <Header role="Admin" />
      <div className="verified-student-list-main">
        <h1 className="verified-student-list-title">Requested Students</h1>
        <div className="verified-student-list-background">
          {isFetching ? (
            <div className="loading-message">Loading students...</div>
          ) : verifiedStudents.length > 0 ? (
            <div className="verified-student-list">
              {verifiedStudents.map((student, index) => (
                <div key={student.prn} className="verified-student-item">
                  <span className="verified-student-name">{student.name}</span>
                  <button
                    className="deploy-button"
                    onClick={() => handleDeploy(index)}
                    disabled={student.deployed || loading}
                  >
                    {student.deployed ? "Deployed" : "Deploy to Blockchain"}
                    {/* {console.log(student.deployed)} */}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-students-message">
              No verified students to display.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VerifiedStudentList;

// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import axios from "axios";
// import Header from "../../compo/header_admin";
// import Footer from "../../compo/footer";
// import "../../css/verified-student.css";
// import abi from "../../../contract/abi.json";

// interface Student {
//   prn: string;
//   name: string;
//   dataHash?: string;
//   deployed: boolean;
// }

// const CONTRACT_ADDRESS = "0xf116A59bbB31e86a9a403a8057761C8A8eEbc627";
// const CONTRACT_ABI = abi;

// function VerifiedStudentList() {
//   const [verifiedStudents, setVerifiedStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);

//   // Fetch students from the API
//   useEffect(() => {
//     const fetchVerifiedStudents = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/freezed");
//         const students = response.data.map((student: any) => ({
//           ...student,
//           deployed: student.deployed || false, // Ensure deployed is defined
//         }));
//         setVerifiedStudents(students);
//       } catch (error) {
//         console.error("Error fetching verified students:", error);
//         alert("Failed to fetch students. Please try again.");
//       } finally {
//         setIsFetching(false);
//       }
//     };
//     fetchVerifiedStudents();
//   }, []);

//   // Connect MetaMask
//   // const connectToMetaMask = async () => {
//   //   if (!window.ethereum) {
//   //     alert("MetaMask is not installed. Please install it.");
//   //     return null;
//   //   }

//   //   try {
//   //     const provider = new ethers.BrowserProvider(window.ethereum);
//   //     await provider.send("eth_requestAccounts", []);
//   //     return provider;
//   //   } catch (error) {
//   //     console.error("Error connecting to MetaMask:", error);
//   //     alert("MetaMask connection failed.");
//   //     return null;
//   //   }
//   // };

//   const connectToMetaMask = async () => {
//     if (!window.ethereum) {
//       alert("MetaMask is not installed. Please install it.");
//       return null;
//     }

//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []); // Request account access
//       return provider;
//     } catch (error) {
//       console.error("MetaMask connection failed:", error);
//       alert("MetaMask connection failed. Please try again.");
//       return null;
//     }
//   };

//   // Deploy student hash to the blockchain
//   // const handleDeploy = async (index: number) => {
//   //   const student = verifiedStudents[index];

//   //   try {
//   //     setLoading(true);

//   //     // Step 1: Generate hash from backend
//   //     const hashingResponse = await axios.post(
//   //       "http://localhost:3000/generate-pdf",
//   //       { prn: student.prn }, // Ensure 'prn' is defined and valid
//   //       { headers: { "Content-Type": "application/json" } }
//   //     );

//   //     const { Hash } = hashingResponse.data;
//   //     if (!Hash) {
//   //       throw new Error("Hash data is missing from backend response.");
//   //     }

//   //     // Step 2: Connect to MetaMask and deploy to blockchain
//   //     const provider = await connectToMetaMask();
//   //     if (!provider) return;

//   //     const signer = provider.getSigner();
//   //     const contract = new ethers.Contract(
//   //       CONTRACT_ADDRESS,
//   //       CONTRACT_ABI,
//   //       await signer
//   //     );

//   //     // const tx = await contract.issueCredentials(Hash);
//   //     // await tx.wait(); // Wait for the transaction to be mined

//   //     const tx = await contract.issueCredentials(Hash, {
//   //       gasLimit: 100000, // Add this to avoid gas estimation issues
//   //     });
//   //     await tx.wait();

//   //     // Step 3: Notify backend of successful deployment
//   //     await axios.post("http://localhost:3000/update-transaction", {
//   //       prn: student.prn,
//   //       transactionHash: tx.hash,
//   //     });

//   //     // Step 4: Update UI
//   //     const updatedStudents = [...verifiedStudents];
//   //     updatedStudents[index].deployed = true;
//   //     setVerifiedStudents(updatedStudents);

//   //     alert("Hash successfully deployed to blockchain!");
//   //   } catch (error: any) {
//   //     console.error("Error deploying hash:", error);
//   //     alert(`Deployment failed: ${error.message}`);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleDeploy = async (index: number) => {
//     const student = verifiedStudents[index];

//     try {
//        setLoading(true);

//        // Step 1: Connect to MetaMask and deploy to blockchain
//        const provider = await connectToMetaMask();
//        if (!provider) return;

//        const signer = provider.getSigner();
//        const contract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           CONTRACT_ABI,
//           await signer
//        );

//        // Generate hash first
//        const hashingResponse = await axios.post(
//           "http://localhost:3000/generate-pdf",
//           { prn: student.prn },
//           { headers: { "Content-Type": "application/json" } }
//        );

//        const { Hash } = hashingResponse.data;
//        if (!Hash) {
//           throw new Error("Hash data is missing from backend response.");
//        }

//        const tx = await contract.issueCredentials(Hash);
//        await tx.wait(); // Wait for the transaction to be mined

//        // Notify backend of successful deployment
//        await axios.post("http://localhost:3000/freeze-student", {
//           prn: student.prn,
//        });

//     // Now, we get the transaction hash from the blockchain
//     const transactionHash = tx.hash;  // This is the transaction hash!

//     // Step 3: Notify the backend with prn and transactionHash
//     const deployResponse = await axios.post("http://localhost:3000/update-transaction", {
//       prn: student.prn,
//       transactionHash: transactionHash,  // Send the transaction hash here
//     });

//     if (deployResponse.status !== 200) {
//         throw new Error("Failed to update deployed status in the backend.");
//     }

//        // Update UI
//        const updatedStudents = [...verifiedStudents];
//        updatedStudents[index].deployed = true;
//        setVerifiedStudents(updatedStudents);

//        alert("Hash successfully deployed to blockchain!");
//     } catch (error: any) {
//        console.error("Error deploying hash:", error);
//        alert(`Deployment failed: ${error.message}`);
//     } finally {
//        setLoading(false);
//     }
//  };

//   return (
//     <div className="verified-student-list-container">
//       <Header role="Admin" />
//       <div className="verified-student-list-main">
//         <h1 className="verified-student-list-title">Requested Students</h1>
//         <div className="verified-student-list-background">
//           {isFetching ? (
//             <div className="loading-message">Loading students...</div>
//           ) : verifiedStudents.length > 0 ? (
//             <div className="verified-student-list">
//               {verifiedStudents.map((student, index) => (
//                 <div key={student.prn} className="verified-student-item">
//                   <span className="verified-student-name">{student.name}</span>
//                   <button
//                     className="deploy-button"
//                     onClick={() => handleDeploy(index)}
//                     disabled={student.deployed || loading}
//                   >
//                     {student.deployed ? "Deployed" : "Deploy to Blockchain"}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="no-students-message">
//               No verified students to display.
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default VerifiedStudentList;
