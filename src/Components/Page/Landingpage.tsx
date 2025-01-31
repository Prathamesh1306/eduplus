import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import Header from "../compo/header-landingpage";
import Footer from "../compo/footer";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Landingpage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false); // Toggle between Sign In and Sign Up
  const navigate = useNavigate();

  // const setCookie=(name,value)=>{
  //   Cookies.set(name,value,{ expires: 1});
  // }

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  const handlesubmitsignup = async () => {
    try {
      console.log(username, email, password);

      await axios.post("https://localhost:3000/add", {
        username: username,
        email: email,
        password: password,
      });

      alert("Registration succcesful Successful!");

      navigate("/");
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("No User Found! Please check your email.");
        } else if (error.response.status === 401) {
          alert("Invalid Credentials! Please check your password.");
        } else {
          alert("An error occurred: " + error.response.data);
        }
      } else {
        alert(
          "Unable to connect to the server. Please try again later." + error
        );
      }
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handlesubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      }, { withCredentials: true });
      // alert("Login Successful!");

      const { role, token } = response.data;
      // Cookies.set("eduplus", token, { expires: 1 });

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "student") {
        navigate("/student");
      } else if (role === "verifier") {
        navigate("/recruiter");
      } else {
        alert("Invalid role. Please contact support.");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("No User Found! Please check your email.");
        } else if (error.response.status === 401) {
          alert("Invalid Credentials! Please check your password.");
        } else {
          alert("An error occurred: " + error.response.data);
        }
      } else {
        alert(
          "Unable to connect to the server. Please try again later." + error
        );
      }
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="landing-page">
      <Header />
      <div
        style={{
          backgroundColor: "#0B7077",
          marginTop: 20,
          width: "30%",
          paddingTop: 30,
          paddingBottom: 30,
          paddingLeft: 40,
          paddingRight: 40,
          borderRadius: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          id={isSignUp ? "sign-up" : "sign-in"}
          style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}
        >
          {isSignUp ? "Sign Up as Verifier" : "Sign In"}
        </div>

        {isSignUp ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 20,
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 10,
              }}
            >
              <FontAwesomeIcon
                icon={faUser}
                style={{ marginRight: 15, color: "#0B7077" }}
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={handleUsernameChange}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 5,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 20,
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 10,
              }}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ marginRight: 15, color: "#0B7077" }}
              />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 5,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 20,
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 10,
              }}
            >
              <FontAwesomeIcon
                icon={faLock}
                style={{ marginRight: 15, color: "#0B7077" }}
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 5,
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 20,
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 10,
              }}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ marginRight: 15, color: "#0B7077" }}
              />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 5,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 20,
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 10,
              }}
            >
              <FontAwesomeIcon
                icon={faLock}
                style={{ marginRight: 15, color: "#0B7077" }}
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 5,
                }}
              />
            </div>
          </>
        )}

        <div
          onClick={isSignUp ? handlesubmitsignup : handlesubmit}
          style={{
            color: "#000",
            backgroundColor: "#D2E6E4",
            padding: "10px 20px",
            marginTop: 20,
            borderRadius: 15,
            textAlign: "center",
            width: "100%",
            cursor: "pointer",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </div>

        <div
          onClick={toggleSignUp}
          style={{
            color: "#D2E6E4",
            marginTop: 10,
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: 16,
          }}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : " Sign Up as Verifier"}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landingpage;

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
// import React, { useState, useEffect } from "react";
// import Header from "../compo/header-landingpage";
// import Footer from "../compo/footer";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Landingpage() {
//   const [username, setUsername] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [role, setRole] = useState<string>("student"); // Role state
//   const [isSignUp, setIsSignUp] = useState<boolean>(false); // Toggle between Sign In and Sign Up
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.history.pushState(null, "", window.location.href);

//     const handlePopState = () => {
//       window.history.pushState(null, "", window.location.href);
//     };

//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, []);

//   const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(e.target.value);
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setRole(e.target.value);
//   };

//   const toggleSignUp = () => {
//     setIsSignUp((prev) => !prev);
//   };

//   const handlesubmitsignup = async () => {
//     try {
//       await axios.post("https://localhost:3000/add", {
//         username,
//         email,
//         password,
//         role, // Include role in signup
//       });
//       alert("Registration Successful!");
//       navigate("/");
//     } catch (error: any) {
//       alert("Error during registration: " + (error.response?.data || error.message));
//       console.error("Error during registration:", error);
//     }
//   };

//   const handlesubmit = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/login", {
//         email,
//         password,
//         role, // Include role in login
//       });
//       alert("Login Successful!");

//       const { token } = response.data;
//       Cookies.set("eduplus", token, { expires: 1 });

//       // Redirect based on role
//       if (role === "admin") {
//         navigate("/admin-home");
//       } else if (role === "student") {
//         navigate("/student");
//       } else if (role === "verifier") {
//         navigate("/recruiter");
//       } else {
//         alert("Invalid role. Please contact support.");
//       }
//     } catch (error: any) {
//       alert("Error during login: " + (error.response?.data || error.message));
//       console.error("Error during login:", error);
//     }
//   };

//   return (
//     <div className="landing-page">
//       <Header />
//       <div
//         style={{
//           backgroundColor: "#0B7077",
//           marginTop: 20,
//           width: "30%",
//           paddingTop: 30,
//           paddingBottom: 30,
//           paddingLeft: 40,
//           paddingRight: 40,
//           borderRadius: 15,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           marginLeft: "auto",
//           marginRight: "auto",
//         }}
//       >
//         <div
//           id={isSignUp ? "sign-up" : "sign-in"}
//           style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}
//         >
//           {isSignUp ? "Sign Up as Verifier" : "Sign In"}
//         </div>

//         {isSignUp ? (
//           <>
//             {/* Username input */}
//             <div style={{ ...styles.inputContainer }}>
//               <FontAwesomeIcon icon={faUser} style={styles.icon} />
//               <input
//                 type="text"
//                 placeholder="Enter Username"
//                 value={username}
//                 onChange={handleUsernameChange}
//                 style={styles.input}
//               />
//             </div>
//             {/* Email input */}
//             <div style={{ ...styles.inputContainer }}>
//               <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 style={styles.input}
//               />
//             </div>
//             {/* Password input */}
//             <div style={{ ...styles.inputContainer }}>
//               <FontAwesomeIcon icon={faLock} style={styles.icon} />
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 style={styles.input}
//               />
//             </div>
//             {/* Role dropdown */}
//             <select
//               value={role}
//               onChange={handleRoleChange}
//               style={{ ...styles.input, marginTop: 20 }}
//             >
//               <option value="student">Student</option>
//               <option value="institute">Institute</option>
//               <option value="verifier">Verifier</option>
//             </select>
//           </>
//         ) : (
//           <>
//             {/* Email input */}
//             <div style={{ ...styles.inputContainer }}>
//               <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 style={styles.input}
//               />
//             </div>
//             {/* Password input */}
//             <div style={{ ...styles.inputContainer }}>
//               <FontAwesomeIcon icon={faLock} style={styles.icon} />
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 style={styles.input}
//               />
//             </div>
//             {/* Role dropdown */}
//             <select
//               value={role}
//               onChange={handleRoleChange}
//               style={{ ...styles.input, marginTop: 20 }}
//             >
//               <option value="student">Student</option>
//               <option value="institute">Institute</option>
//               <option value="verifier">Verifier</option>
//             </select>
//           </>
//         )}

//         <div
//           onClick={isSignUp ? handlesubmitsignup : handlesubmit}
//           style={{
//             color: "#000",
//             backgroundColor: "#D2E6E4",
//             padding: "10px 20px",
//             marginTop: 20,
//             borderRadius: 15,
//             textAlign: "center",
//             width: "100%",
//             cursor: "pointer",
//             fontSize: 18,
//             fontWeight: "bold",
//           }}
//         >
//           {isSignUp ? "Sign Up" : "Sign In"}
//         </div>

//         <div
//           onClick={toggleSignUp}
//           style={{
//             color: "#D2E6E4",
//             marginTop: 10,
//             cursor: "pointer",
//             textDecoration: "underline",
//             fontSize: 16,
//           }}
//         >
//           {isSignUp ? "Already have an account? Sign In" : "Sign Up as Verifier"}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// const styles = {
//   inputContainer: {
//     display: "flex",
//     alignItems: "center",
//     marginTop: 20,
//     width: "100%",
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     padding: 10,
//   },
//   icon: { marginRight: 15, color: "#0B7077" },
//   input: {
//     border: "none",
//     outline: "none",
//     width: "100%",
//     padding: 10,
//     fontSize: 16,
//     borderRadius: 5,
//   },
// };

// export default Landingpage;
