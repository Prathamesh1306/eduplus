import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student1 from "./Components/Page/Student/Student1.tsx";
import Admin from "./Components/Page/Admin/admin.tsx";
import Student2 from './Components/Page/Student/Studentverify.tsx'
import StudentCredential from "./Components/Page/Student/Studentcredential";



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
        </Routes>
      </div>  
    </Router>
 );
}

export default App;