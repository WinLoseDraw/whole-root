import { CSSTransition } from "react-transition-group"
import "./CSS/Mainpage.css"
import LoginAndSignupForm from "./LoginAndSignupForm"
import { useState } from "react";

import ClassroomBtnIcon from "../iconComponents/ClassroomBtnIcon";
import DashboardBtnIcon from "../iconComponents/DashboardBtnIcon";
import LibraryBtnIcon from "../iconComponents/LibraryBtnIcon";

import { useNavigate } from "react-router-dom";

const Mainpage = ({events}) => {

    let navigate = useNavigate()

    // Hooks
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const [IsOnMainPage, setIsOnMainPage] = useState(true)

    const [OnLogin, setOnLogin] = useState(false)
    const [OnSignup, setOnSignup] = useState(false)

    const enterMainPage = () => {
        setIsOnMainPage(true)
        setOnLogin(false)
        setOnSignup(false)
    }

    const login = () => {
        setIsLoggedIn(true)
        enterMainPage()
    }



    return (
        <div className="mainpage">

            <nav className="mainPageNav">
                
                <div className="title">
                    Whole Root   
                </div> 

                <div className="buttonHolder">
                    <button className="navButtonLogin" onClick={() => {setOnLogin(true); setIsOnMainPage(false); setOnSignup(false);}}>LOGIN</button>
                    <button className="navButtonSignup" onClick={() => {setOnSignup(true); setIsOnMainPage(false); setOnLogin(false)}}>SIGNUP</button>
                </div>
            </nav>
            
            <div className="container">
                
                <button className="main-btn" id="classroom" onClick={() => IsLoggedIn?navigate("/Class"):0}>
                    <CSSTransition
                        in={IsOnMainPage}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit>

                        <ClassroomBtnIcon />

                    </CSSTransition>
                </button>
                <button className="main-btn" id="dashboard">
                    <CSSTransition
                        in={IsOnMainPage}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit>

                        <DashboardBtnIcon />

                    </CSSTransition>
                </button>
                <button className="main-btn" id="library">
                    <CSSTransition
                        in={IsOnMainPage}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit>

                        <LibraryBtnIcon />

                    </CSSTransition>
                </button>

                <CSSTransition
                    in={!IsOnMainPage}
                    timeout={500}
                    classNames="fade"
                    unmountOnExit>

                    <div className="form-filter">
                        <LoginAndSignupForm 
                            login={login}
                            enterMainPage={enterMainPage}
                            onLogin={{get: OnLogin, set: setOnLogin}}
                            onSignup={{get:OnSignup, set: setOnSignup}}
                            events={{
                                checkLogin: events.checkLogin,
                                getSignupDetails: events.getSignupDetails
                            }}/>
                    </div>

                </CSSTransition>

            </div>
        </div>
    )
}

export default Mainpage
