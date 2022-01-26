import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import ClassPage from "./components/ClassPage";
import ClassroomPage from "./components/ClassroomPage";
import UniversityPage from "./components/UniversityPage";
import RegisterPage from "./components/RegisterPage";
import StudentPage from "./components/StudentPage";
import TeacherPage from "./components/TeacherPage";
import TeacherResource from "./components/TeacherResource"
import TeacherTest from "./components/TeacherTest";
import StudentTest from "./components/StudentTest";
import StudentResource from "./components/StudentResource";
import ResourceAccessPage from "./components/ResourceAccessPage";
import io from 'socket.io-client'
import InstituteMembers from "./components/InstituteMembers";
import InstituteTeacherList from "./components/InstituteTeacherList";
import InstituteStudentList from "./components/InstituteStudentList";
import { useState } from "react";

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

// export function setInstitute(val){
//   setInstitute(val);
// }

// export function getInstitute(){
//   return institute;
// }

// export function setIsLogin(val){
//   setIsLogin(val)
// }

// export function getIsLogin(){
//   return isLogin;
// }

// export function setLoginType(val){
//   setLoginType(val)
// }

// export function getLoginType(){
//   return loginType;
// }

// export function checkAccess(){
//   if (!isLogin || loginType === 'none'){
//     return true
//   }
// }

function App() {

  const [Auth, setAuth] = useState({login: false, institute: null, loginType: null, page: "/"});

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage events={events} auth={{get: Auth, set: setAuth}}/>}/>
 
          <Route path="/Student/Class" element={<ClassPage auth={{get: Auth, set: setAuth}}/>}/>
          <Route path="Student/Classroom" element={<ClassroomPage user="student" room="classroom1" socket={socket} auth={{get: Auth, set: setAuth}}/>}/>
          <Route path="Teacher/Classroom" element={<ClassroomPage user="teacher" room="classroom1" socket={socket} auth={{get: Auth, set: setAuth}}/>}/>
          <Route path="/institute" element={<UniversityPage auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/members" element={<InstituteMembers auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/members/teachers" element={<InstituteTeacherList auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/members/students" element={<InstituteStudentList auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/Register" element={<RegisterPage auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/Student" element={<StudentPage auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Student/Test" element={<StudentTest auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Student/Resource" element={<StudentResource auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Student/Resource/Access" element={<ResourceAccessPage auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Teacher" element={<TeacherPage auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Teacher/Resource" element={<TeacherResource auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Teacher/Test" element={<TeacherTest auth={{get: Auth, set: setAuth}} />} />
          
        </Routes>
      </Router>
    </div>
  );
}


export default App;
