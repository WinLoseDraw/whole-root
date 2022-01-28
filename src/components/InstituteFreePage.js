import React from 'react'
import { useNavigate } from 'react-router'
import WholerootLogoIcon from "../iconComponents/WholerootLogoIcon";
import WholerootTextIcon from "../iconComponents/WholerootTextIcon";

import './CSS/InstituteFree.css'

const InstituteFreePage = ({auth}) => {

    let navigate = useNavigate()

    return (
        <div className="freeContainer">
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
                    FREE
                </div>
            </nav>  

            <div className="freeButtonsContainer">
                <button className="freeBtn" style={{backgroundColor:'rgb(0, 119, 22)', color:'white'}}>
                    CLASS
                </button>
                <button className="freeBtn" style={{backgroundColor:'rgb(0, 92, 231)', color:'white'}}>
                    SETTINGS
                </button>
            </div>
            <span style={{margin:'auto'}}><h1>CODE: </h1></span>
        </div>
    )
}


export default InstituteFreePage
