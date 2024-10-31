import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student1 from "./Components/Page/Student/Student1.tsx";
import Admin from "./Components/Page/Admin/admin.tsx";
import Student2 from './Components/Page/Student/Studentverify.tsx'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/home' element={<Admin />} />
          <Route path='/' element={<Student1 />} />
          <Route path='/studentverify' element={<Student2/>} />
        </Routes>
      </div>  
    </Router>
 );
}

export default App;