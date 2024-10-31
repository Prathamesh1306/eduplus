import Header from "../../compo/header_admin";
import Footer from "../../compo/footer";
import "../../../admin-student-list-container.css";
import Name from "../../compo/name";
function AdminStudentList() {
  const handleSubmit = () => {
    console.log("Next is pressed");
  };

  const studentList = [
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
    <div className="admin-student-list-container">
      <Header role="ADMIN" />
      <div className="admin-student-list-main">
        <div className="admin-student-list-title">Student Management</div>
        <div className="admin-student-list-renderList">
          Validation Page
          <div className="admin-student-list-renderList-search">
            {studentList.map((val) => (
              <Name key={val.name} name={val.name} />
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
