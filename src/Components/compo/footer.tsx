import "../../App.css";

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        <div className="footer-section contact-info">
          <h4>Contact Us</h4>
          <p>Tel: +9226262590</p>
          <p>
            Address:<br />
            34/b1, Suyog Centre, Shivneri Peth,<br />
            Gultekadi, Pune, Maharashtra 411037
          </p>
          <p>Response hours: 8:00 AM to 5:00 PM</p>
          <p>
            Email:{" "}
            <a href="mailto:sales@edupluscampus.com">sales@edupluscampus.com</a>
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
