import React, { useState, useEffect } from 'react'

import { CSSTransition } from "react-transition-group"
import ClassroomBtnIcon from "../iconComponents/ClassroomBtnIcon";
import LibraryBtnIcon from "../iconComponents/LibraryBtnIcon";
import ExamIcon from "../iconComponents/ExamIcon";
import WholerootLogoIcon from "../iconComponents/WholerootLogoIcon";
import WholerootTextIcon from "../iconComponents/WholerootTextIcon";
import { useNavigate } from "react-router-dom";

const TeacherPage = ({auth}) => {
    let navigate = useNavigate()

    const [IsBtnTextShowing, setIsBtnTextShowing] = useState({class: false, dashboard: false, library: false})

    useEffect(() => {
        if (!auth.get.login) {
            navigate("/")
        }

        auth.set({...auth.get, page: "/teacher"})
    }, [])

    return (
        <div className="mainpage">

            <nav className="mainPageNav">
                
            <div className="buttonHolder" style={{justifyContent:"flex-start"}}>
                    
                    <button className="navButtonLogin" onClick={()=>{auth.set({login: false, institute: null, loginType: null, page: "/"}); navigate("/")}}>
                        LOG OUT 
                    </button>    
                </div>

                <div className="title">
                    <WholerootLogoIcon width={70}/> 
                    <WholerootTextIcon width={150}/>  
                </div> 

                <div className="buttonHolder" style={{fontSize:"2.3rem"}}>
                    TEACHER
                </div>
            </nav>  

            <div className="container">
                <button className="main-btn green"
                    onClick={() => navigate('/Teacher/classroom')}
                    onMouseOver={() => setIsBtnTextShowing({...IsBtnTextShowing, class: true})}
                    onMouseLeave={() => setIsBtnTextShowing({...IsBtnTextShowing, class: false})}>
                
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <span style={{fontSize:'0.5em', fontWeight: 'bold', marginBottom:'20px'}}>TEACH</span>
                        <ClassroomBtnIcon />
                    </div>
    
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
                    onClick={() => navigate('/Teacher/Resource')}
                    onMouseOver={() => setIsBtnTextShowing({...IsBtnTextShowing, library: true})}
                    onMouseLeave={() => setIsBtnTextShowing({...IsBtnTextShowing, library: false})}>
                  
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <span style={{fontSize:'0.5em', fontWeight: 'bold', marginBottom:'20px'}}>RESOURCES</span>
                        <LibraryBtnIcon />
                    </div>

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
                    onClick={() => navigate('/teacher/test')}
                    onMouseOver={() => setIsBtnTextShowing({...IsBtnTextShowing, dashboard: true})}
                    onMouseLeave={() => setIsBtnTextShowing({...IsBtnTextShowing, dashboard: false})}>
                    
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <span style={{fontSize:'0.5em', fontWeight: 'bold', marginBottom:'20px'}}>TEST</span>
                        <ExamIcon />
                    </div>

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
            </div>
        </div>
    )
}

export default TeacherPage
