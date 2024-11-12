import "../../App.css";
import Logo from "../../assets/logo.svg";


function Header() {
  const Login = () => {
    console.log("Login was pressed");
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
          <a className="tab" href="./supportcenter.tsx">
            Support center
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
          <div className="login" onClick={Login}>
            LOGIN
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
