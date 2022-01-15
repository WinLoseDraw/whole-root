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
    const [IsOnSubscription, setIsOnSubscription] = useState(false)
    const [IsBtnTextShowing, setIsBtnTextShowing] = useState({class: false, dashboard: false, library: false})

    const [OnLogin, setOnLogin] = useState(false)
    const [OnSignup, setOnSignup] = useState(false)

    const [Plan, setPlan] = useState("none")

    
    const enterMainPage = () => {
        setIsOnMainPage(true)
        setOnLogin(false)
        setOnSignup(false)

    }

    const login = () => {
        setIsLoggedIn(true)
        enterMainPage()
        navigate("/University")
    }

    const openSubscription = () => {

        console.log("open")
        enterMainPage()
        setIsOnSubscription(true)
    }

    const openSignup = (plan) => {
        setOnSignup(true)
        setIsOnMainPage(false)
        setOnLogin(false)
        setPlan(plan)
        console.log(OnLogin)
    }


    return (
        <div className="mainpage">

            <nav className="mainPageNav">
                
                {IsOnSubscription? <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <button className="navButtonLogin" onClick={() => setIsOnSubscription(false)}>Back</button>
                    </div>: <div></div>}

                <div className="title">
                    <WholerootLogoIcon width={70}/> 
                    <WholerootTextIcon width={150}/>  
                </div> 

                <div className="buttonHolder">
                    <button className="navButtonLogin" onClick={() => {setOnLogin(true); setIsOnMainPage(false); setOnSignup(false);}}>LOGIN</button>
                    <button className="navButtonSignup" onClick={() => {setIsOnSubscription(true)}}>SIGNUP</button>
                </div>
            </nav>  

            <div className="container">

            {IsOnSubscription ? 
            <>
            <button 
                className="subscriptionFormButton blue"
                onClick={() => openSignup("free")}>
                {(!OnSignup && !OnLogin)&& <>
                <h1>FREE</h1>
                <p className="description"> RECOMMENDED FOR SMALL SCALE EDUCATORS.<br/>(TUTORS, FREELANCERS)</p>
                <ul>
                    <li>The best way to conduct a class</li>
                    <li>Interactive classroom with videoconfrencing and realtime 'onboard' student teacher interaction</li>
                    <li>Hastle free</li>
                    <li>Free</li>
                </ul>
                </>}
            </button>
            <button 
                className="subscriptionFormButton orange"
                onClick={() => openSignup("subscription")}>
                    
                    {(!OnSignup && !OnLogin)&& <>
                    <h1>SUBSCRIPTION</h1>
                    <p className="description"> RECOMMENDED FOR DEFINITE TERM PROGRAMS.<br/>(COURSES, CAMPS, WORKSHOPS)</p>
                    <ul>
                        <li>Setup your own library</li>
                        <li>Manage students</li>
                        <li>Register multiple educators and provide multiple course tabs</li>
                        <li>Pay monthly</li>
                    </ul></>}
            </button>
            <button 
                className="subscriptionFormButton green"
                onClick={() => openSignup("License")}>
                
                {(!OnSignup && !OnLogin)&& <>
                <h1>LICENSE</h1>
                <p className="description"> RECOMMENDED FOR INSTITUTIONS.(K-12 SCHOOLS, COLLEGES, UNIVERSITIES)</p>
                <ul>
                    <li>All features unlocked with a single purchase for the whole institution with highlights:</li>
                    <li>Testing sections with advanced malpractice counter measures and flexibility of mode conduct</li>
                    <li>Management of students and educators by registered institution</li>
                    <li>Advanced resources(student schedules, class recordings, drive integration)</li>
                    <li>Renewal every 5 years</li>
                </ul></>}
            </button>
        </>
            :<>
                
                <button className="main-btn green"
                    onMouseOver={() => setIsBtnTextShowing({...IsBtnTextShowing, class: true})}
                    onMouseLeave={() => setIsBtnTextShowing({...IsBtnTextShowing, class: false})}>
                    <CSSTransition
                        in={IsOnMainPage}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit>
                        
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <span style={{fontSize:'0.5em', fontWeight: 'bold', marginBottom:'20px'}}>LEARN</span>
                            <ClassroomBtnIcon />
                            <span style={{fontSize:'0.5em', fontWeight: 'bold', marginTop:'20px'}}>Hover to learn more...</span>
                        </div>

                    </CSSTransition>
                    
                    <CSSTransition
                        in={IsBtnTextShowing.class}
                        timeout={300}
                        classNames="text-expand"
                        unmountOnExit>
                            
                        <div className="main-btn-text">
                            Innovative realtime interactive interface with video conferencing and collaborative onboard; with functionality for attendees to annotate for best interaction and collaboration.
                        </div>

                    </CSSTransition>
                </button>
                <button className="main-btn orange"
                    onMouseOver={() => setIsBtnTextShowing({...IsBtnTextShowing, library: true})}
                    onMouseLeave={() => setIsBtnTextShowing({...IsBtnTextShowing, library: false})}>
                    <CSSTransition
                        in={IsOnMainPage}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit>
                        
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <span style={{fontSize:'0.5em', fontWeight: 'bold', marginBottom:'20px'}}>STUDY</span>
                            <LibraryBtnIcon />
                            <span style={{fontSize:'0.5em', fontWeight: 'bold', marginTop:'20px'}}>Hover to learn more...</span>
                        </div>

                    </CSSTransition>

                    <CSSTransition
                        in={IsBtnTextShowing.library}
                        timeout={300}
                        classNames="text-expand"
                        unmountOnExit>
                            
                        <div className="main-btn-text">
                            Customisable library resources, ranging for video libraries to documented resources that can be setup by the institution.
                        </div>

                    </CSSTransition>

                </button>
                <button className="main-btn blue"
                    onMouseOver={() => setIsBtnTextShowing({...IsBtnTextShowing, dashboard: true})}
                    onMouseLeave={() => setIsBtnTextShowing({...IsBtnTextShowing, dashboard: false})}>
                    <CSSTransition
                        in={IsOnMainPage}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <span style={{fontSize:'0.5em', fontWeight: 'bold', marginBottom:'20px'}}>TEST</span>
                            <ExamIcon />
                            <span style={{fontSize:'0.5em', fontWeight: 'bold', marginTop:'30px'}}>Hover to learn more...</span>
                        </div>
                    </CSSTransition>

                    <CSSTransition
                        in={IsBtnTextShowing.dashboard}
                        timeout={300}
                        classNames="text-expand"
                        unmountOnExit>
                            
                        <div className="main-btn-text">
                            Exclusive Testing sub platform with flexible testing methods, invigilation and malpractice correctives.
                        </div>

                    </CSSTransition>

                </button>
                </>
                }

            </div>
              
                <CSSTransition
                    in={!IsOnMainPage}
                    timeout={500}
                    classNames="fade"
                    unmountOnExit>

                    <div className="form-filter">
                        <LoginAndSignupForm 
                            login={login}
                            signup={openSubscription}

                            
                            enterMainPage={enterMainPage}
                            onLogin={{get: OnLogin, set: setOnLogin}}
                            onSignup={{get:OnSignup, set: setOnSignup}}
                            
                            plan={Plan}
                            
                            events={{
                                checkLogin: events.checkLogin,
                                getSignupDetails: events.getSignupDetails
                            }}/>
                    </div>

                </CSSTransition>

        </div>
    )
}


export default Mainpage
