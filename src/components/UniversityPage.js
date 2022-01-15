import React from 'react'
import { useNavigate } from 'react-router'
import './CSS/UniversityPage.css'

const UniversityPage = () => {

    let navigate = useNavigate()
    

    return (
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
    )
}

export default UniversityPage
