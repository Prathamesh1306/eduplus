import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Header from "../../compo/header";
import Footer from "../../compo/footer";
import Breadcrumbs from "../../compo/breadcrumbs";
import "../../css/studnetverify.css";
import image from "../../../assets/pana.png";

function Studentverify() {
  const [verify, setVerify] = useState(null); // State to store verification status
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const value = Cookies.get("token");
        if (!value) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(value);
        console.log("Decoded Token:", decoded);

        const prn = decoded.prn; // Assuming PRN is stored in the token
        if (!prn) {
          console.error("PRN not found in token");
          setLoading(false);
          return;
        }

        const response = await axios.post("http://localhost:3000/freeze-status", { prn });
        console.log("API Response:", response.data);

        // If the API returns true, set verify to true; otherwise, set it to false
        setVerify(response.data.freezeStatus === true);
      } catch (error) {
        console.error("Error fetching verification status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationStatus();
  }, []);

  return (
    <div>
      <Header />
      <Breadcrumbs />
      <div className="mainStatusDiv">
        <h3>STATUS</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="statusResult">
            <h4 className="statusBool">{verify ? "Verified" : "Not Verified"}</h4>
          </div>
        )}
        <div className="statusImage">
          <img src={image} alt="not found" className="image-pana" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Studentverify;
