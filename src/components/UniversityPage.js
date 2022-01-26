import React, {useEffect} from 'react'
import { useNavigate } from 'react-router'
import './CSS/UniversityPage.css'
import WholerootLogoIcon from "../iconComponents/WholerootLogoIcon";
import WholerootTextIcon from "../iconComponents/WholerootTextIcon";

const UniversityPage = ({auth}) => {

    let navigate = useNavigate()
    
    useEffect(() => {
        if (!auth.get.login) {
            navigate("/")
        }

        auth.set({...auth.get, page: "/institute"})
    }, [])

    return (
        <div className="mainContainer">

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
                    INSTITUTE
                </div>
            </nav>  

            <div className="UniversityPageContainer">
                <button className="green" onClick={() => {navigate("/Institute/Register")}}>
                    REGISTER
                </button>
                <button className="blue" onClick={() => {navigate("/institute/Members")}}>
                    MEMBERS
                </button>
                <button className="orange">
                    RESOURCES
                </button>
            </div>
        </div>
    )
}

export default UniversityPage
