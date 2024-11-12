import "../../App.css";
import Logo from "../../assets/logo.svg";

interface HeaderProps {
  role: string;
}

function Header({ role }: HeaderProps) {
  const Logout = () => {
    console.log("Logout was pressed");
  };

  return (
    <div className="BHeader">
      <div className="header">
        <div>
          <img src={Logo} />
        </div>
        <div className="tabs">
          <a className="tab" href="./home">
            Home
          </a>
          <a className="tab" href="./blog">
            Blog
          </a>
          <a className="tab" href="./about">
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
        </div>
      </div>
      <div className="role">{role}</div>
    </div>
  );
}

export default Header;
