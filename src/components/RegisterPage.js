import React, { useState } from 'react'
import axios from 'axios'
import './CSS/RegisterPage.css'
import { getInstitute } from '../App'

const RegisterPage = () => {

    const [StudentInfo, setStudentInfo] = useState({name: "", class: "", section: "", rollno: "", password: ""})
    const [TeacherInfo, setTeacherInfo] = useState({name: "", class: "", subject: "", password: ""})

    const registerStudent = (e) => {
        e.preventDefault()
        console.log(StudentInfo)

        axios
            .post("https://test-serverrr.herokuapp.com/registerstudent", {
                username: StudentInfo.name,
                pass: StudentInfo.password,
                inst_name: StudentInfo.rollno,
                clas: StudentInfo.class,
                section: StudentInfo.subject
            })
            .then((res) => {
                console.log(res.data.msg)
                alert("success")
            })
            .catch((err) => {
                console.log(err)
                alert("failed to register")
            });
    }

    const registerTeacher = (e) => {
        e.preventDefault()
        console.log(TeacherInfo)

        axios
            .post("https://test-serverrr.herokuapp.com/registerteacher", {
                username: TeacherInfo.name,
                pass: TeacherInfo.password,
                inst_name: getInstitute(),
                clas: TeacherInfo.class,
                subjects: TeacherInfo.subject
            })
            .then((res) => {
                console.log(res.data.msg)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div className="RegisterPageContainer">
            <form className="blue" onSubmit={registerStudent}>
                <label className="formHeader">REGISTER STUDENT</label>
                <input type="text" placeholder="Name" value={StudentInfo.name} onChange={(e) => {setStudentInfo({...StudentInfo, name: e.target.value})}}/>
                <input type="text" placeholder="Class" value={StudentInfo.class} onChange={(e) => {setStudentInfo({...StudentInfo, class: e.target.value})}}/>
                <input type="text" placeholder="Section" value={StudentInfo.section} onChange={(e) => {setStudentInfo({...StudentInfo, section: e.target.value})}}/>
                <input type="text" placeholder="Roll No" value={StudentInfo.rollno} onChange={(e) => {setStudentInfo({...StudentInfo, rollno: e.target.value})}}/>
                <input type="text" placeholder="Password" value={StudentInfo.password} onChange={(e) => {setStudentInfo({...StudentInfo, password: e.target.value})}}/>
                <button type="submit">Register</button>
            </form>
            <form className="green" onSubmit={registerTeacher}>
            <label className="formHeader">REGISTER TEACHER</label>
                <input type="text" placeholder="name" value={TeacherInfo.name} onChange={(e) => {setTeacherInfo({...TeacherInfo, name: e.target.value})}}/>
                <input type="text" placeholder="Class" value={TeacherInfo.class} onChange={(e) => {setTeacherInfo({...TeacherInfo, class: e.target.value})}}/>
                <input type="text" placeholder="Subject" value={TeacherInfo.subject} onChange={(e) => {setTeacherInfo({...TeacherInfo, subject: e.target.value})}}/>
                <input type="text" placeholder="Password" value={TeacherInfo.password} onChange={(e) => {setTeacherInfo({...TeacherInfo, password: e.target.value})}}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage
