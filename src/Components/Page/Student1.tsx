import "../../App.css";

function Student1() {
  return (
    <div className="container">
      <div className="header">
        <div>Image</div>
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
      </div>
    </div>
  );
}

export default Student1;
