import "../../App.css";

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        <div className="footer-section contact-info">
          <h4>Contact Us</h4>
          <p>Tel: +91 9590300911</p>
          <p>
            Address:<br />
            Survey No 2, 3,4, Kondhwa Main Rd, Laxmi Nagar,<br />
            Kondhwa, Pune, Maharashtra 411048
          </p>
          <p>Response hours: 8:00 AM to 5:00 PM</p>
          <p>
            Email:{" "}
            <a href="mailto:admissions@vupune.ac.in ">admissions@vupune.ac.in </a>
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
        <p>© Copyright Vishwakarma University 2024. All Rights Reserved.</p>
        <p>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
