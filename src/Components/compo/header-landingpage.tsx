import "../../App.css";
import Logo from "../../assets/logo.svg";
// import Image1 from "../../assets/image11.svg"
import Image11 from "../../assets/image11";
function Header() {
  const Login = () => {
    console.log("Login was pressed");
  };

  return (
    <div style={{ backgroundColor: "#d2e6e4",paddingTop:20 }}>
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

      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 80,
        }}
      >
        <div>
          <div
            style={{
              color: "#0B7077",
              fontWeight: "bold",
              fontSize: 60,
              width: "30%",
              fontFamily: "Raleway",
              marginTop: 30,
            }}
          >
            EDUPLUS ACADEMIC BLOCKCHAIN CREDENTIAL PLATFORM
          </div>
          <div
            style={{
              backgroundColor: "#FD661F",
              width: "20%",
              paddingTop: 15,
              paddingBottom: 15,
              textAlign: "center",
              color: "#ffffff",
              fontFamily: "Raleway",
              borderRadius: 10,
              paddingLeft: 5,
              paddingRight: 5,
              marginTop:20,
              marginBottom:20
            }}
          >
            Explore path
          </div>
        </div>
        <Image11 />
      </div>
    </div>
  );
}

export default Header;
