import Header from "../../compo/header_admin";
import Footer from "../../compo/footer";
import "../../css/admin-recruiter-list-container.css";
import Name from "../../compo/name";
import { useState } from "react";

function AdminrecruiteList() {
  const handleSubmit = () => {
    console.log("Next is pressed");
  };
  const recruiterList = [
    {
      name: "Harsh Mohite",
    },
    {
      name: "Prathamesh",
    },
    {
      name: "Soham",
    },
    {
      name: "Priya",
    },
  ];

  return (
    <div className="admin-recruiter-list-container">
      <Header role="ADMIN" />
      <div className="admin-re-list-main">
        <div className="admin-recruiter-list-title">recruiter Management</div>
        <div
          className="admin-recruiter
-list-renderList"
        >
          Validation Page
          <div
            className="admin-recruiter
    -list-renderList-search"
          >
            {recruiterList.map((val) => (
              <Name key={val.name} name={val.name} />
            ))}
            <div className="admin-recruiter-list-btn" onClick={handleSubmit}>
              NEXT
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminrecruiteList;
