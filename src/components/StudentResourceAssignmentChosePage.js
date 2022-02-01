import React from 'react'
import WholerootLogoIcon from "../iconComponents/WholerootLogoIcon";
import WholerootTextIcon from "../iconComponents/WholerootTextIcon";
import { useNavigate } from "react-router-dom";

const StudentResourceAssignmentChosePage = ({auth}) => {
    let navigate = useNavigate()
    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <nav className="mainPageNav" >

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
                    STUDENT
                </div>
            </nav>  
            <div className="container">
                
            </div>
        </div>
    )
}

export default StudentResourceAssignmentChosePage
