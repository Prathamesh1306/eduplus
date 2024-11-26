import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../compo/header_admin";
import Footer from "../../compo/footer";
import "../../css/verified-student.css";

interface Student {
  prn: string;
  name: string;
  deployed: boolean;
}

function VerifiedStudentList() {
  const [verifiedStudents, setVerifiedStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // For initial data fetching state

  // Fetch students from the API
  useEffect(() => {
    const fetchVerifiedStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/view/students/updated");
        const students = response.data.map((student: any) => ({
          ...student,
          deployed: false, // Default deployed state is false
        }));
        setVerifiedStudents(students);
      } catch (error) {
        console.error("Error fetching verified students:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchVerifiedStudents();
  }, []);

  // Handle deploy action
  const handleDeploy = async (index: number) => {
    const student = verifiedStudents[index];

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/students/update-deployed", {
        prns: [student.prn],
      });

      if (response.data.success) {
        const updatedStudents = [...verifiedStudents];
        updatedStudents[index].deployed = true; // Update local state
        setVerifiedStudents(updatedStudents);
      } else {
        alert("Failed to deploy the student.");
      }
    } catch (error) {
      console.error("Error deploying student:", error);
      alert("Error deploying student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verified-student-list-container">
      <Header role="Admin" />
      <div className="verified-student-list-main">
        <h1 className="verified-student-list-title">Verified Students</h1>
        <div className="verified-student-list-background">
          {isFetching ? (
            <div className="loading-message">Loading students...</div>
          ) : verifiedStudents.length > 0 ? (
            <div className="verified-student-list">
              {verifiedStudents.map((student, index) => (
                <div key={student.prn} className="verified-student-item">
                  <span className="verified-student-name">{student.name}</span>
                  <button
                    className="deploy-button"
                    onClick={() => handleDeploy(index)}
                    disabled={student.deployed || loading}
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
