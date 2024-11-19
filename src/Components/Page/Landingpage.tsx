import Header from "../compo/header-landingpage";
import Footer from "../compo/footer";
import Certificate from "../../assets/certificate";
import Image12 from "../../assets/image12";
import Image13 from "../../assets/image13";
import Image14 from "../../assets/image14";
function Landingpage() {
  return (
    <div className="landing-page">
      <Header />
      <div
        style={{
          marginTop: 50,
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-around",
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <div style={{}}>
          <div
            style={{
              color: "#0B7077",
              backgroundColor: "#F5F5F5",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 12,
              paddingBottom: 12,
              borderRadius: 15,
              width: "15%",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Benefits
          </div>
          <div style={{ fontSize: 50, color: "#0B7077", fontWeight: "bolder" }}>
            Why Choose EduPlus?
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#0B7077",
              fontWeight: "bold",
              marginTop: 20,
              paddingLeft: 20,
            }}
          >
            Trusted Credentials, Verified in Seconds.
          </div>
          <div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                width: "60%",
                marginTop: 20,
              }}
            >
              <Image12 size={360} />
              <div style={{ color: "#696984", width: "80%", fontSize: 25 }}>
                Unbreakable Trust: Credentials are securely locked on the
                blockchain, making them 100% tamper-proof for ultimate peace of
                mind.
              </div>
            </div>

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                width: "60%",
                marginTop: 10,
                justifyContent: "space-around",
              }}
            >
              <Image13 size={360} />
              <div style={{ color: "#696984", width: "100%", fontSize: 25 }}>
                Lightning-Fast Verification: Recruiters can verify academic
                records instantly, saving time and hiring costs.
              </div>
            </div>

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                width: "60%",
                marginTop: 10,
                justifyContent: "space-around",
              }}
            >
              <Image14 size={360} />
              <div style={{ color: "#696984", width: "80%", fontSize: 25 }}>
                All-in-One Access: Students have everything in one place to
                easily share with employers, while recruiters enjoy a smooth,
                centralized verification process.
              </div>
            </div>
          </div>
        </div>
        <div style={{ alignContent: "center" }}>
          <Certificate size={500} />
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#0B7077",
          marginTop: 10,
          width: "30%",
          justifySelf: "center",
          paddingTop:20,
          paddingBottom:20,
          justifyItems:"center",
          borderRadius:10
        }}
      >
        <div style={{color:"#ffffff",fontSize:20}}>Sign up as Recruiter</div>
        <div>

        <input type="text" name="" id="" placeholder="Enter Email" />
        </div>
        <div>

        <input type="text" name="" id="" placeholder="Enter Password" />
        </div>

        <div style={{color:"#000" ,backgroundColor:"#D2E6E4",paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5,borderRadius:15}}>
            Sign in
        </div>

        <div style={{color:"#ffffff"}}>
          sign in as <a href="/" style={{color:"#fff"}}>admin</a>   or <a href="" style={{color:"#fff"}}>recruiter</a> ? 
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Landingpage;
