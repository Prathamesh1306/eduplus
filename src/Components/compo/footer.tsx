import "../../App.css";

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        <div className="footer-section contact-info">
          <h4>Contact Us</h4>
          <p>Tel: +9226262590</p>
          <p>
            Address:
            <br />
            REGISTERED OFFICE: Vishwakarma University Survey No. 2, 3, 4 Laxmi
            Nagar, Kondhwa Budruk,<br/> Pune - 411 048. Maharashtra, India.
          </p>
          <p>
            Email:{" "}
            <a href="mailto:connect@vupune.ac.in">connect@vupune.ac.in</a>
          </p>
        </div>
        <div className="footer-section categories">
          <h4>Categories</h4>
          <p>
            <a href="#">Counseling</a>
          </p>
          <p>
            <a href="#">Individual Development</a>
          </p>
          <p>
            <a href="#">More</a>
          </p>
        </div>
        <div className="footer-section links">
          <h4>Links</h4>
          <p>
            <a href="#">About Us</a>
          </p>
          <p>
            <a href="#">Blog</a>
          </p>
        </div>
        <div className="footer-section query-form">
          <form>
            <p>Have a query?</p>
            <input type="text" placeholder=" Write to us" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Copyright EduplusCampus 2024. All Rights Reserved.</p>
        <p>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
