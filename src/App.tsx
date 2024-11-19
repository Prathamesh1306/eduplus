import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './Components/Page/Landingpage.tsx'

import Admin from "./Components/Page/Admin/admin.tsx";
import AdminStudentList from "./Components/Page/Admin/adminStudentList.tsx";
import AdminRecruiterList from "./Components/Page/Admin/AdminRecruiter.tsx";
import Admindeployedstudent from './Components/Page/Admin/deployedstudent.tsx'

import Student1 from "./Components/Page/Student/Student1.tsx";
import Student2 from './Components/Page/Student/Studentverify.tsx'
import StudentCredential from "./Components/Page/Student/Studentcredential";

import Recruiter from "./Components/Page/Recruiter/recruiter";
import Recruiter1 from "./Components/Page/Recruiter/searchrecruiter";
import Recruiter1a from  "./Components/Page/Recruiter/searchrecruiter1";
import Recruiter1b from  "./Components/Page/Recruiter/searchrecruiter2";
import Recruiter2 from  "./Components/Page/Recruiter/verifyrecruiter.tsx";
import About from "./Components/Page/About.tsx";
import Home from "./Components/Page/home.tsx";
import Blog from "./Components/Page/Blog.tsx";

import BlockchainComponent from "./Components/Page/BlockchainComponent.tsx"


function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route path='/front' element={<Landing />} />

          <Route path='/' element={<Admin />} />
          {/* <Route path='/' element={<div>dsadasd</div> } /> */}
          <Route path='/admin-student-list' element={<AdminStudentList />} />
          <Route path='/admin-deployedstudent' element={<Admindeployedstudent />} />
          <Route path='/admin-recruiter-list' element={<AdminRecruiterList />} />
          
          <Route path='/student' element={<Student1 />} />
          <Route path='/student-verify' element={<Student2 />} />
          <Route path="/studentcredential" element={<StudentCredential />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/searchrecruiter" element={<Recruiter1 />} />
          <Route path="/searchrecruiter1" element={<Recruiter1a />} />
          <Route path="/searchrecruiter2" element={<Recruiter1b />} />
          <Route path="/verifyrecruiter" element={<Recruiter2 />} />
          <Route  path="/about" element={<About/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/blog" element={<Blog/>}></Route>
          <Route path="/test" element={<BlockchainComponent/>}></Route>
        </Routes>
      </div>  
    </Router>
 );
}

export default App;