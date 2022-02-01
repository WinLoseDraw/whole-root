import React from 'react'
import { useNavigate } from "react-router-dom";
import './CSS/TeacherMaterialAssignmentChose.css'

const TeacherMaterialAssignmentChose = ({auth}) => {
    let navigate = useNavigate()
    return (
        <div className="teacherMatAss"> 
            <div className="teacherMatAssBtn">Material</div>
            <div className="teacherMatAssBtn">Assignment</div>
        </div>
    )
}

export default TeacherMaterialAssignmentChose
