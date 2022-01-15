import React from 'react'
import { useNavigate } from 'react-router'
import './CSS/UniversityPage.css'

const InstituteMembers = () => {

    let navigate = useNavigate()

    return (
        <div className="UniversityPageContainer">
            <button className="blue" style={{width: '47%'}} onClick={() => {navigate("/institute/members/teachers")}}>
                TEACHERS
            </button>
            <button className="orange" style={{width: '47%'}} onClick={() => {navigate("/institute/members/students")}}>
                STUDENTS
            </button>
        </div>
    )
}

export default InstituteMembers
