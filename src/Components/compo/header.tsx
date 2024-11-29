import "../../App.css";
import Logo from "../../assets/vishwakram transparent.png";
import ProfilePhoto from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Header() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>();
  const [role, setRole] = useState<string>();
  useEffect(() => {
    const value = Cookies.get("eduplus");
    console.log(value);
    const decoded = jwtDecode(value);
    console.log(decoded);
    setName(decoded.username);
    setRole(decoded.role);
  }, []);

  const Logout = () => {
    Cookies.remove("eduplus", { path: "/" });
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#d2e6e4",
        width: "100%",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "20px",
        paddingBottom: "20px",
        userSelect: "none",
      }}
    >
      <div className="header">
        <div>
          <img
            src={Logo}
            style={{ width: "350px", height: "75px", marginTop: "10px" }}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="tabs">
          <a className="tab" href="./home.tsx">
            Home
          </a>
          <a className="tab" href="./blog.tsx">
            Blog
          </a>
          <a className="tab" href="./about.tsx">
            About Us
          </a>
        </div>
        <div className="collab">
          {/* <div className="explore-btn">
          <div className="circle-text">
    <span>Explore More </span>
  </div>
  <span className="play-icon">▶</span> 
          </div> */}
          <div className="logout" onClick={Logout}>
            LOGOUT
          </div>
          <div className="profile">
            <img className="profileP" src={ProfilePhoto} />
            <div className="name">
              <div>{name}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="role">{role?.toUpperCase()}</div>
    </div>
  );
}

export default Header;
