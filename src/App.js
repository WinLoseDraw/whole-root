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
import InstituteMembers from "./components/InstituteMembers";
import InstituteTeacherList from "./components/InstituteTeacherList";
import InstituteStudentList from "./components/InstituteStudentList";
import { useState } from "react";
import InstituteResource from "./components/InstituteResource";
import InstituteResourceAccessPage from "./components/InstituteResourceAccessPage";
import InstituteFreePage from "./components/InstituteFreePage";
import InstituteTeacherUpdatePage from "./components/InstituteTeacherUpdatePage";
import InstituteStudentUpdatePage from "./components/InstituteStudentUpdatePage";
import TeacherSettingsPaid from "./components/TeacherSettingsPaid";
import InstituteResourceTopicPage from "./components/InstituteResourceTopicPage";
import StudentResourceTopicPage from "./components/StudentResourceTopicPage";
import TeacherResourceTopicPage from "./components/TeacherResourceTopicPage";
import TeacherResourceAccessPage from "./components/TeacherResourceAccessPage";
import TeacherResourceMaterialChose from "./components/TeacherMaterialAssignmentChose";
import TeacherAssignmentPage from "./components/TeacherAssignmentPage";
import TestBoard from "./testWhiteBoard/TestBoard";

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

  const [Auth, setAuth] = useState({login: false, institute: null, loginType: null, page: "/", plan: ""});

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage events={events} auth={{get: Auth, set: setAuth}}/>}/>
          <Route path="/Student/Class" element={<ClassPage auth={{get: Auth, set: setAuth}}/>}/>
          <Route path="Student/Classroom" element={<ClassroomPage user="student" room="classroom1" auth={{get: Auth, set: setAuth}}/>}/>
          <Route path="Teacher/Classroom" element={<ClassroomPage user="teacher" room="classroom1" auth={{get: Auth, set: setAuth}}/>}/>
          <Route path="/institute" element={<UniversityPage auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/members" element={<InstituteMembers auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/members/teachers" element={<InstituteTeacherList auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/members/teachers/update" element={<InstituteTeacherUpdatePage auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/members/students" element={<InstituteStudentList auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/members/students/update" element={<InstituteStudentUpdatePage auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/Register" element={<RegisterPage auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/Resource" element={<InstituteResource auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/Resource/topic" element={<InstituteResourceTopicPage auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/institute/Resource/access" element={<InstituteResourceAccessPage auth={{get: Auth, set: setAuth}} />}/>
          <Route path="/Student" element={<StudentPage auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Student/Test" element={<StudentTest auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Student/Resource" element={<StudentResource auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Student/Resource/topic" element={<StudentResourceTopicPage auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Student/Resource/Access" element={<ResourceAccessPage auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Teacher" element={<TeacherPage auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Teacher/Settings" element={<TeacherSettingsPaid auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Teacher/Resource" element={<TeacherResource auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Teacher/Resource/topic" element={<TeacherResourceTopicPage auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Teacher/Resource/access" element={<TeacherResourceAccessPage auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Teachers/ResourceAsignmentChoose" element={<TeacherResourceMaterialChose auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Teacher/Assignment" element={<TeacherAssignmentPage auth={{get: Auth, set: setAuth}} />} />
          <Route path="/Teacher/Test" element={<TeacherTest auth={{get: Auth, set: setAuth}} />} />
          <Route path="/free" element={<InstituteFreePage auth={{get: Auth, set: setAuth}} />} />       
          <Route path="free/Teacher/Classroom" element={<ClassroomPage user="teacher" auth={{get: Auth, set: setAuth}}/>}/>
          <Route path="free/Student/Classroom" element={<ClassroomPage user="student" auth={{get: Auth, set: setAuth}}/>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
