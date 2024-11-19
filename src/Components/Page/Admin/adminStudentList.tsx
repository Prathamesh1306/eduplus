import Header from "../../compo/header_admin";
import Footer from "../../compo/footer";
import "../../css/admin-student-list-container.css";
import { useState } from "react"; // Import useState for managing state
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

function AdminStudentList() {
  const navigate = useNavigate(); // useNavigate to navigate to the next page

  // Use useState to manage student list with verification status
  const [studentList, setStudentList] = useState([
    { name: "Harsh Mohite", verified: false },
    { name: "Prathamesh", verified: false },
    { name: "Soham", verified: false },
    { name: "Priya", verified: false },
  ]);

  const handleVerify = (index) => {
    // Update the verified status of the selected student
    const updatedList = [...studentList];
    updatedList[index].verified = true;
    setStudentList(updatedList);
  };

  const handleSubmit = () => {
    const verifiedStudents = studentList.filter((student) => student.verified);
    navigate("/verified-students", { state: { verifiedStudents } }); // Pass data to the new page
  };

  return (
    <div className="admin-student-list-container">
      <Header role="ADMIN" />
      <div className="admin-student-list-main">
        <div className="admin-student-list-title">Student Management</div>
        <div className="admin-student-list-renderList">
          Validation Page
          <div className="admin-student-list-renderList-search">
          {studentList.map((student, index) => (
  <div key={student.name} className="student-item">
    <span className="student-item-name">{student.name}</span>
    {student.verified ? (
      <span className="verified-status">Verified</span>
    ) : (
      <button
        className="verify-button"
        onClick={() => handleVerify(index)}
      >
        Verify
      </button>
    )}
  </div>
))}

            <div className="admin-student-list-btn" onClick={handleSubmit}>
              NEXT
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminStudentList;
