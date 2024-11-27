import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../compo/header_admin";
import Footer from "../../compo/footer";
import "../../css/deployedstudent.css";

function Deploystudent() {
  const [deployedStudents, setDeployedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch deployed students from the backend
  useEffect(() => {
    const fetchDeployedStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/deployed");
        setDeployedStudents(response.data);
        setFilteredStudents(response.data); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching deployed students:", error);
      }
    };
    fetchDeployedStudents();
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the student list based on the search query
    const filtered = deployedStudents.filter((student) =>
      student.name.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  // Handle View Link Click
  const handleViewClick = async (prn) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/generate-pdf/${prn}`
      );
      const { pdfUrl } = response.data;

      // Open the generated PDF in a new tab
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <Header role="Admin" />
      <h1 className="title">Deployed Student</h1>
      <div className="deployed-container">
        {/* Search Input */}
        <div className="input-group">
          <input
            type="text"
            id="Input-search"
            name="input-search"
            placeholder="Enter the name of student"
            value={searchQuery}
            onChange={handleSearch}
          />
          {/* <div className="input-group">
            <button type="submit" className="icon"></button>
          </div> */}
        </div>

        {/* List of Deployed Students */}
        <div className="student-list">
          {loading && <p>Generating PDF... Please wait.</p>}
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div key={student.prn} className="student-item">
                <span className="student-name">{student.name}</span>
                <button
                  className="view-link"
                  onClick={() => handleViewClick(student.prn)}
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="no-students">No deployed students found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Deploystudent;
