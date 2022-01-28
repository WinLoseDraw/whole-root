import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router'

const InstituteTeacherUpdatePage = ({auth}) => {

    const {state} = useLocation();

    const [TeacherInfo, setTeacherInfo] = useState({name: "", class: "", subject: ""})

    const updateTeacher = () => {

    }

    return (
        <div className="RegisterPageContainer">
            <form className="green" onSubmit={updateTeacher}>
                <label className="formHeader">UPDATE TEACHER</label>
                <input type="text" placeholder="name" value={TeacherInfo.name} onChange={(e) => {setTeacherInfo({...TeacherInfo, name: e.target.value})}}/>
                <input type="text" placeholder="Class" value={TeacherInfo.class} onChange={(e) => {setTeacherInfo({...TeacherInfo, class: e.target.value})}}/>
                <input type="text" placeholder="Subject" value={TeacherInfo.subject} onChange={(e) => {setTeacherInfo({...TeacherInfo, subject: e.target.value})}}/>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default InstituteTeacherUpdatePage
