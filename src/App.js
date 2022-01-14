import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import ClassPage from "./components/ClassPage";
import ClassroomPage from "./components/ClassroomPage";
import UniversityPage from "./components/UniversityPage";
import RegisterPage from "./components/RegisterPage";
import StudentPage from "./components/StudentPage";
import TeacherPage from "./components/TeacherPage";
import TeacherResource from "./components/TeacherResource"
import TeacherTest from "./components/TeacherTest";

// Events

const checkLogin = (loginCredentials) => {

  console.log(loginCredentials)

  return true
}

const getSignupDetails = (signupDetails) => {

  console.log(signupDetails)

  return true
}

const events = {

  checkLogin: checkLogin,
  getSignupDetails: getSignupDetails
}

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage events={events}/>}/>
          <Route path="/Student/Class" element={<ClassPage />}/>
          <Route path="/Classroom" element={<ClassroomPage />}/>
          <Route path="/University" element={<UniversityPage />}/>
          <Route path="/Register" element={<RegisterPage />}/>
          <Route path="/Student" element={<StudentPage />} />
          <Route path="/Teacher" element={<TeacherPage />} />
          <Route path="/Teacher/Resource" element={<TeacherResource />} />
          <Route path="/Teacher/Test" element={<TeacherTest />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
