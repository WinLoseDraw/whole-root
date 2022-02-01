import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
const TeacherResourceTopicPage = () => {
    const [Subjects, setSubjects] = useState([
        {name: "ODE"},
        {name: "PDE"},
        {name: "CALCULUS"},
        {name: "MATRIX"}
    ])

    const [OnAdd, setOnAdd] = useState(false)

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
                <AddCard setOnAdd={setOnAdd}/>
            </div>
            {OnAdd && <AddForm setOnAdd={setOnAdd}/>}
        </>
    )
}

const SubjectCard = ({name}) => {  
     
    let navigate = useNavigate()


    const subjectClick = () => {
        navigate("/teacher/resource/Access", {state: {name: name}});
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

const AddCard = ({setOnAdd}) => {
    return(
        <div className="addCard" onClick={()=>setOnAdd(true)}>
            ADD
        </div>
    )
}

const AddForm = ({setOnAdd}) => {

    const [FormDetails, setFormDetails] = useState({name: ''})

    const onSubmit = e => {
        e.preventDefault()
    }

    return(
        <div className="addFormContainer" >
            <div className="addForm" onSubmit={onSubmit} style={{justifyContent:'center'}}>
                <label>Topic</label>
                <input type="name" value={FormDetails.name} onChange={e=>{setFormDetails({...FormDetails, name: e.target.value})}} style={{marginBottom:'20px'}}/>
                <button type="submit">Submit</button>
                <button type="button" onClick={()=>setOnAdd(false)}>Back</button>
            </div>
        </div>
    )
}
export default TeacherResourceTopicPage
