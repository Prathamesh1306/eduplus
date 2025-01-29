import "../../App.css";
import Logo from "../../assets/vishwakram transparent.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
interface HeaderProps {
  role: string;
}

function Header({ role }: HeaderProps) {
  const navigate = useNavigate();
  const Logout = () => {
    Cookies.remove("eduplus",{ path: "/" });
    navigate("/");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
        userSelect:"none"
      }}
    >
      <div className="header">
        <div>
          <img
            src={Logo}
            style={{
              width: "350px",
              height: "75px",
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/admin");
            }}
          />
        </div>
        <div className="tabs">
          {/* <a className="tab">
            Home
          </a> */}
          
            <a
            className="tab"
            href="#"
            onClick={() => scrollToSection("footer")}style={{textAlign:"right"}}
          >
          ABOUT US
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
        </div>
      </div>
      <div className="role" style={{textAlign:"center"}}>{role}</div>
    </div>
  );
}

export default Header;
