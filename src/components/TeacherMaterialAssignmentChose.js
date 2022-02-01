import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import './CSS/TeacherMaterialAssignmentChose.css'

const TeacherMaterialAssignmentChose = ({auth}) => {
    let navigate = useNavigate()
    const {state} = useLocation()
    return (
        <div className="teacherMatAss"> 
            <div className="teacherMatAssBtn" onClick={()=>{navigate("/Teacher/Resource/access", {state: state}); console.log('hi')}}>Material</div>
            <div className="teacherMatAssBtn" onClick={()=>{navigate("/Teacher/Assignment", {state: state})}}>Assignment</div>
        </div>
    )
}

export default TeacherMaterialAssignmentChose
