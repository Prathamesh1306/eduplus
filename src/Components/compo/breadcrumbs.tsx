import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav style={{ padding: "10px", fontSize: "1rem", color: "#006666" }}>
      {/* <Link to="/" style={{ textDecoration: "none", color: "#006666" }}>
        Home
      </Link> */}
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return (
          <span key={to}>
            {" / "}
            <Link to={to} style={{ textDecoration: "none", color: "#009999" }}>
              {value.replace("-", " ").toUpperCase()}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
