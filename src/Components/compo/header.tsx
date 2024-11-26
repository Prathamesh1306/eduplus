import "../../App.css"
import Logo from "../../assets/logo.svg";
import ProfilePhoto from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  name: string;
  year: string;
  role: string;
}

function Header({ name, year, role }: HeaderProps) {
  const navigate= useNavigate();
  const Logout = () => {
    navigate("/");
  };

      
  return (
    <div className="BHeader">
        <div className="header">
          <div>
            <img src={Logo} />
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
                <div>{year}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="role">{role}</div>

      </div>
      
  )
  
}

export default Header