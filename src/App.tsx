import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student1 from "./Components/Page/Student/Student1.tsx";
import Admin from "./Components/Page/Admin/admin.tsx";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Admin />} />
          <Route path='/student' element={<Student1 />} />
        </Routes>
      </div>  
    </Router>
 );
}

export default App;