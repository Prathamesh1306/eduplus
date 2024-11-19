import { useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../../compo/header_admin";
import Footer from "../../compo/footer";
import "../../css/verified-student.css";

interface Student {
  name: string;
  deployed: boolean;
}

function VerifiedStudentList() {
  const location = useLocation();
  const { state } = location || {};
  const [verifiedStudents, setVerifiedStudents] = useState<Student[]>(
    state?.verifiedStudents.map((student: any) => ({ ...student, deployed: false })) || []
  );

  const handleDeploy = (index: number) => {
    const updatedStudents = [...verifiedStudents];
    updatedStudents[index].deployed = true; // Mark student as deployed
    setVerifiedStudents(updatedStudents);
  };

  return (
    <div className="verified-student-list-container">
      <Header role="ADMIN" />
      <div className="verified-student-list-main">
        <div className="verified-student-list-title">Verified Students</div>
        <div className="verified-student-list-background">
          {verifiedStudents.length > 0 ? (
            <div className="verified-student-list">
              {verifiedStudents.map((student: Student, index: number) => (
                <div key={student.name} className="verified-student-item">
                  <span className="verified-student-name">{student.name}</span>
                  <button
                    className="deploy-button"
                    onClick={() => handleDeploy(index)}
                    disabled={student.deployed} // Disable button if already deployed
                  >
                    {student.deployed ? "Deployed" : "Deploy"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-students-message">No verified students to display.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VerifiedStudentList;
