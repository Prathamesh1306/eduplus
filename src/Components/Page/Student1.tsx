import "../../App.css";
import Logo from "../../assets/logo.svg";
function Student1() {
  const Logout = () => {
    console.log("Logout was pressed");
  };
  return (
    <div className="container">
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
        <div className="logout" onClick={Logout}>
          LOGOUT
        </div>
      </div>
    </div>
  );
}

export default Student1;
