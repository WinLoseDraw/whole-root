import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import ClassPage from "./components/ClassPage";
import ClassroomPage from "./components/ClassroomPage";
import UniversityPage from "./components/UniversityPage";
import RegisterPage from "./components/RegisterPage";

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
          <Route path="/Class" element={<ClassPage />}/>
          <Route path="/Classroom" element={<ClassroomPage />}/>
          <Route path="/University" element={<UniversityPage />}/>
          <Route path="/Register" element={<RegisterPage />}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
