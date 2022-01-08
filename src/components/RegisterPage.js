import React, { useState } from 'react'
import './CSS/RegisterPage.css'

const RegisterPage = () => {

    const [StudentInfo, setStudentInfo] = useState({name: "", class: "", section: "", rollno: ""})
    const [TeacherInfo, setTeacherInfo] = useState({name: "", class: "", subject: ""})

    const registerStudent = (e) => {
        e.preventDefault()
        console.log(StudentInfo)
    }

    const registerTeacher = (e) => {
        e.preventDefault()
        console.log(TeacherInfo)
    }

    return (
        <div className="RegisterPageContainer">
            <form className="blue" onSubmit={registerStudent}>
                <label className="formHeader">REGISTER STUDENT</label>
                <input type="text" placeholder="Name" value={StudentInfo.name} onChange={(e) => {setStudentInfo({...StudentInfo, name: e.target.value})}}/>
                <input type="text" placeholder="Class" value={StudentInfo.class} onChange={(e) => {setStudentInfo({...StudentInfo, class: e.target.value})}}/>
                <input type="text" placeholder="Section" value={StudentInfo.section} onChange={(e) => {setStudentInfo({...StudentInfo, section: e.target.value})}}/>
                <input type="text" placeholder="Roll No" value={StudentInfo.rollno} onChange={(e) => {setStudentInfo({...StudentInfo, rollno: e.target.value})}}/>
                <button type="submit">Register</button>
            </form>
            <form className="green" onSubmit={registerTeacher}>
            <label className="formHeader">REGISTER TEACHER</label>
                <input type="text" placeholder="name" value={TeacherInfo.name} onChange={(e) => {setTeacherInfo({...TeacherInfo, name: e.target.value})}}/>
                <input type="text" placeholder="Class" value={TeacherInfo.class} onChange={(e) => {setTeacherInfo({...TeacherInfo, class: e.target.value})}}/>
                <input type="text" placeholder="Subject" value={TeacherInfo.subject} onChange={(e) => {setTeacherInfo({...TeacherInfo, subject: e.target.value})}}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage
