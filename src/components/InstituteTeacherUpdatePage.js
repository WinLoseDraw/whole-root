import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router'

const InstituteTeacherUpdatePage = ({auth}) => {

    let navigate = useNavigate()

    const {state} = useLocation();

    const [TeacherInfo, setTeacherInfo] = useState({name: "", class: "", subject: ""})

    useEffect(() => {
        setTeacherInfo({name: state.name, class: state.class, subject: state.subject})
        return () => {
            setTeacherInfo({name: "", class: "", subject: ""})
        }
    }, [])

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
