import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

const InstituteStudentUpdatePage = ({auth}) => {

    let navigate = useNavigate()

    const {state} = useLocation();

    const [StudentInfo, setStudentInfo] = useState({name: "", class: "", subject: "", section: ""})

    useEffect(() => {
        setStudentInfo({name: state.name, class: state.class, subject: state.subject, section: state.section})
        return () => {
            setStudentInfo({name: "", class: "", subject: "", section: ""})
        }
    }, [])

    const updateStudent = () => {

    }

    return (
        <div className="RegisterPageContainer">
            <form className="blue" onSubmit={updateStudent}>
                <label className="formHeader">REGISTER STUDENT</label>
                <input type="text" placeholder="Name" value={StudentInfo.name} onChange={(e) => {setStudentInfo({...StudentInfo, name: e.target.value})}}/>
                <input type="text" placeholder="Class" value={StudentInfo.class} onChange={(e) => {setStudentInfo({...StudentInfo, class: e.target.value})}}/>
                <input type="text" placeholder="Section" value={StudentInfo.section} onChange={(e) => {setStudentInfo({...StudentInfo, section: e.target.value})}}/>
                <input type="text" placeholder="Roll No" value={StudentInfo.rollno} onChange={(e) => {setStudentInfo({...StudentInfo, rollno: e.target.value})}}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default InstituteStudentUpdatePage
