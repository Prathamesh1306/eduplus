import Header from "../../compo/header_admin";
import Footer from "../../compo/footer";
import "../../css/admin-student-list-container.css"
import Name from "../../compo/name";
function AdminStudentList() {
  const handleSubmit = () => {
    studentList.filter((value)=>{
      console.log(value)  
    })
  };

  const studentList = [
    {
      name: "Harsh Mohite",
      verified:"false"
    },
    {
      name: "Prathamesh",verified:"false"
    },
    {
      name: "Soham",verified:"false"
    },
    {
      name: "Priya",verified:"false"
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
