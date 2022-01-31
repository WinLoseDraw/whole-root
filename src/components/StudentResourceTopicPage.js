import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'

const StudentResourceTopicPage = () => {
    const [Subjects, setSubjects] = useState([
        {name: "ODE"},
        {name: "PDE"},
        {name: "CALCULUS"},
        {name: "MATRIX"}
    ])

    const [GridItems, setGridItems] = useState([])

    useEffect(() => {
        let t = []
        Subjects.forEach(item => {
            t.push(<SubjectCard name={item.name} subjects={Subjects.subjects}/>)
        })
        setGridItems(t)
    }, [Subjects])

    return (
        <>
            <div className="resourceContainer">
                {GridItems}
            </div>
        </>
    )
}

const SubjectCard = ({name}) => {  
     
    let navigate = useNavigate()


    const subjectClick = () => {
        navigate("/student/resource/Access", {state: {name: name}});
    }

    return (
        <div className="resourceCard" onClick={subjectClick}>
            <div>
                {name}
            <div style={{width:"80%", height:"0px", margin:"10px auto", border:"1px solid black"}}></div>
            </div>       
        </div>
    )
}
export default StudentResourceTopicPage
