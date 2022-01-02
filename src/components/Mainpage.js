import { CSSTransition } from "react-transition-group"
import "./CSS/Mainpage.css"
import LoginAndSignupForm from "./LoginAndSignupForm"
import { useState } from "react";

import ClassroomBtnIcon from "../iconComponents/ClassroomBtnIcon";
import ExamIcon from "../iconComponents/ExamIcon";
import LibraryBtnIcon from "../iconComponents/LibraryBtnIcon";
import WholerootLogoIcon from "../iconComponents/WholerootLogoIcon";
import WholerootTextIcon from "../iconComponents/WholerootTextIcon";

import { useNavigate } from "react-router-dom";

const Mainpage = ({events}) => {

    let navigate = useNavigate()

    // Hooks
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const [IsOnMainPage, setIsOnMainPage] = useState(true)
    const [IsBtnTextShowing, setIsBtnTextShowing] = useState({class: false, dashboard: false, library: false})

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
                    <WholerootLogoIcon width={70}/> 
                    <WholerootTextIcon width={150}/>  
                </div> 

                <div className="buttonHolder">
                    <button className="navButtonLogin" onClick={() => {setOnLogin(true); setIsOnMainPage(false); setOnSignup(false);}}>LOGIN</button>
                    <button className="navButtonSignup" onClick={() => {setOnSignup(true); setIsOnMainPage(false); setOnLogin(false)}}>SIGNUP</button>
                </div>
            </nav>
            
            <div className="container">
                
                <button className="main-btn" id="classroom" 
                    onClick={() => IsLoggedIn?navigate("/Class"):0} 
                    onMouseOver={() => setIsBtnTextShowing({...IsBtnTextShowing, class: true})}
                    onMouseLeave={() => setIsBtnTextShowing({...IsBtnTextShowing, class: false})}>
                    <CSSTransition
                        in={IsOnMainPage}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit>

                        <ClassroomBtnIcon />

                    </CSSTransition>
                    
                    <CSSTransition
                        in={IsBtnTextShowing.class}
                        timeout={300}
                        classNames="text-expand"
                        unmountOnExit>
                            
                        <div className="main-btn-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus enim omnis iusto corrupti veritatis eum fuga rem ea accusantium, quibusdam dignissimos eveniet laudantium officia sunt similique quia quaerat vel alias.
                        </div>

                    </CSSTransition>
                </button>
                <button className="main-btn" id="dashboard"
                    onMouseOver={() => setIsBtnTextShowing({...IsBtnTextShowing, dashboard: true})}
                    onMouseLeave={() => setIsBtnTextShowing({...IsBtnTextShowing, dashboard: false})}>
                    <CSSTransition
                        in={IsOnMainPage}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit>

                        <ExamIcon />

                    </CSSTransition>

                    <CSSTransition
                        in={IsBtnTextShowing.dashboard}
                        timeout={300}
                        classNames="text-expand"
                        unmountOnExit>
                            
                        <div className="main-btn-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus enim omnis iusto corrupti veritatis eum fuga rem ea accusantium, quibusdam dignissimos eveniet laudantium officia sunt similique quia quaerat vel alias.
                        </div>

                    </CSSTransition>

                </button>
                <button className="main-btn" id="library"
                    onMouseOver={() => setIsBtnTextShowing({...IsBtnTextShowing, library: true})}
                    onMouseLeave={() => setIsBtnTextShowing({...IsBtnTextShowing, library: false})}>
                    <CSSTransition
                        in={IsOnMainPage}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit>

                        <LibraryBtnIcon />

                    </CSSTransition>

                    <CSSTransition
                        in={IsBtnTextShowing.library}
                        timeout={300}
                        classNames="text-expand"
                        unmountOnExit>
                            
                        <div className="main-btn-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus enim omnis iusto corrupti veritatis eum fuga rem ea accusantium, quibusdam dignissimos eveniet laudantium officia sunt similique quia quaerat vel alias.
                        </div>

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
