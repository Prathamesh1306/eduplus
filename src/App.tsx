import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student1 from "./Components/Page/Student/Student1.tsx";
import Admin from "./Components/Page/Admin/admin.tsx";
import Student2 from './Components/Page/Student/Studentverify.tsx'
import StudentCredential from "./Components/Page/Student/Studentcredential";
import Recruiter from "./Components/Page/Recruiter/recruiter";
import Recruiter1 from "./Components/Page/Recruiter/searchrecruiter";
import Recruiter1a from  "./Components/Page/Recruiter/searchrecruiter1";
import Recruiter1b from  "./Components/Page/Recruiter/searchrecruiter2";
import Recruiter2 from  "./Components/Page/Recruiter/verifyrecruiter.tsx";



import AdminStudentList from "./Components/Page/Admin/adminStudentList.tsx";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Admin />} />
          <Route path='/student' element={<Student1 />} />
          <Route path='/admin-student-list' element={<AdminStudentList />} />
          <Route path='/student-verify' element={<Student2 />} />
          <Route path="/studentcredential" element={<StudentCredential />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/searchrecruiter" element={<Recruiter1 />} />
          <Route path="/searchrecruiter1" element={<Recruiter1a />} />
          <Route path="/searchrecruiter2" element={<Recruiter1b />} />
          <Route path="/verifyrecruiter" element={<Recruiter2 />} />

        </Routes>
      </div>  
    </Router>
 );
}

export default App;