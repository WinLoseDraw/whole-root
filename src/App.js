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
import TestPage from "./components/BoardFIles/TestPage";
import { Canvas } from "./components/BoardFIles/Canvas";
import StudentTest from "./components/StudentTest";
import StudentResource from "./components/StudentResource";
import ResourceAccessPage from "./components/ResourceAccessPage";
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")

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
          <Route path="Student/Classroom" element={<ClassroomPage user="student" room="classroom1" socket={socket}/>}/>
          <Route path="Teacher/Classroom" element={<ClassroomPage user="teacher" room="classroom1" socket={socket}/>}/>
          <Route path="/institute" element={<UniversityPage />}/>
          <Route path="/Register" element={<RegisterPage />}/>
          <Route path="/Student" element={<StudentPage />} />
          <Route path="/Student/Test" element={<StudentTest />} />
          <Route path="/Student/Resource" element={<StudentResource />} />
          <Route path="/Student/Resource/Access" element={<ResourceAccessPage />} />
          <Route path="/Teacher" element={<TeacherPage />} />
          <Route path="/Teacher/Resource" element={<TeacherResource />} />
          <Route path="/Teacher/Test" element={<TeacherTest />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
