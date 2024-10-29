import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student1 from "./Components/Page/Student1.tsx";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Student1 />} />
        </Routes>
      </div>  
    </Router>
 );
}

export default App;