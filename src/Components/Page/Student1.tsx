import "../../App.css";
import Logo from "../../assets/logo.svg";
import ProfilePhoto from "../../assets/profile.png";
function Student1() {
  const Logout = () => {
    console.log("Logout was pressed");
  };
  const name = "Jonny";
  const year = "3rd year";
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
        <div className="profile">
          <img className="profileP" src={ProfilePhoto} />
          <div className="name">
            <div>{name}</div>
            <div>{year}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student1;
