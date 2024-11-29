import "../../App.css";
import Logo from "../../assets/vishwakram transparent.png";
import Image11 from "../../assets/image11";

function Header() {
  // Add a type annotation for 'id'
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const Login = () => {
    console.log("Login was pressed");
  };

  return (
    <div style={{ backgroundColor: "#d2e6e4", paddingTop: 20 }}>
      <div className="header">
        <div>
          <img
            src={Logo}
            style={{ width: "350px", height: "75px" }}
            alt="Eduplus Logo"
          />
        </div>
        <div className="tabs">
          <a className="tab" href="#" onClick={() => scrollToSection("home")}>
            Home
          </a>
          <a
            className="tab"
            href="#"
            onClick={() => scrollToSection("support-center")}
          >
            Support Center
          </a>
          <a className="tab" href="#" onClick={() => scrollToSection("blog")}>
            Blog
          </a>
          <a
            className="tab"
            href="#"
            onClick={() => scrollToSection("why-eduplus")}
          >
            About Us
          </a>
        </div>
        <div className="collab">
          <div className="login" onClick={() => scrollToSection("sign-in")}>
            Sign-in
          </div>
        </div>
      </div>

      <div
        style={{
           fontFamily: "Trebuchet MS",
          flexDirection: "row",
          display: "flex",
          textAlign:"center",
          paddingBottom:"20px"
        }}
      >
          <div
            style={{
             
              color: "#0B7077",
              fontWeight: "bold",
              fontSize: "45px",
              width: "100%",
              fontFamily: "Trebuchet MS",
              marginTop: 30,
            }}
          >
            ACADEMIC BLOCKCHAIN CREDENTIAL PLATFORM
          </div>
        </div>
    </div>
  );
}

export default Header;
