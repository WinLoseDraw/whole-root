import React from 'react'

import WholerootLogoIcon from "../iconComponents/WholerootLogoIcon";
import WholerootTextIcon from "../iconComponents/WholerootTextIcon";
import { useNavigate } from "react-router-dom";

import './CSS/TeacherTest.css'

const TeacherTest = ({auth}) => {

    let navigate = useNavigate()

    return (
        <div className="mainpage" >

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
    

            <div className="teacherTestContainer">
                <div className="teacherTestButtons">
                    <button style={{backgroundColor: 'rgb(0, 119, 22)'}} onClick={()=>navigate('/Teacher/Test/Add')}>ADD TEST</button>
                    <button style={{backgroundColor: 'rgb(251, 138, 0)'}}>VIEW ANSWERS</button>
                </div>
            </div>
        </div>
    )
}

export default TeacherTest
