import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const TeacherResourceAccessPage = () => {
    const {state} = useLocation()

    const [Lectures, setLectures] = useState([{title: "First Order Linear", link: ""},{title: "First Order Non Linear", link: ""},{title: "Second Order Linear Homogeneous", link: ""},{title: "Operator Method", link: ""}])

    const [OnAdd, setOnAdd] = useState(false)

    const [LectureItems, setLectureItems] = useState([]);

    const onDelete = (name) => {
        console.log(name)
    }

    const onUpdate = (index) => {

    }

    useEffect(() => {
        let t = []
        Lectures.forEach((element, index) => {
            if (index == Lectures.length - 1){
                t.push(<End sno={index+1} title={element.title} link=" " notes=" " question="1" onDelete={onDelete} onUpdate={onUpdate} index={index}/>)
            }else{
                t.push(<Row sno={index+1} title={element.title} link=" " notes=" " question="1" onDelete={onDelete} onUpdate={onUpdate} index={index}/>)
            }
        });
        setLectureItems(t)
    }, [Lectures])

    return (
        <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(255, 205, 111)', minHeight:'100vh'}}>
            <div className="resourceAccessContainer">
                <div style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr'}}><button style={{width:'150px', height:'40px', border:'none', borderRadius:'4px', backgroundColor: 'rgb(0, 119, 22)', color:'white', boxShadow: '0px 0px 4px 2px rgba(128, 128, 128, 0.25)', fontSize:'18px'}} onClick={()=>setOnAdd(true)}> ADD</button><h1>{state.name}</h1></div>
                <div>
                    <Head />
                    {LectureItems}
                </div>
            </div>
            {OnAdd && <AddForm setOnAdd={setOnAdd}/>}
        </div>
    )
}

const Row = ({sno, title, date, notes, video, assignment, onDelete, onUpdate, index}) => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'5%', border: '1px solid black', borderLeft:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{sno}</div>
            <div style={{ width:'40%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{title}</div>
            <div style={{ width:'8%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{date}</div>
            <div style={{ width:'13%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{video}</div>
            <div style={{ width:'13%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{notes}</div>
            <div style={{ width:'13%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{assignment}</div>
            <div style={{ width:'4%', border: '1px solid black', backgroundColor: 'white', padding:'8px', display:'flex', justifyContent:'center'}}><button onClick={(e)=>{onDelete(title)}}>X</button></div>
            <div style={{ width:'4%', border: '1px solid black', borderRight:'2px solid black', backgroundColor: 'white', padding:'8px', display:'flex', justifyContent:'center'}}><button onClick={(e)=>{onUpdate(index)}}>&uarr;</button></div>
        </div>
    )
}

const End = ({sno, title, date, notes, video, assignment, onDelete, onUpdate, index}) => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'5%', border: '1px solid black', borderLeft:'2px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{sno}</div>
            <div style={{ width:'40%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{title}</div>
            <div style={{ width:'8%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{date}</div>
            <div style={{ width:'13%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{video}</div>
            <div style={{ width:'13%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{notes}</div>
            <div style={{ width:'13%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{assignment}</div>
            <div style={{ width:'4%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px', display:'flex', justifyContent:'center'}}><button onClick={(e)=>{onDelete(title)}}>X</button></div>
            <div style={{ width:'4%', border: '1px solid black', borderRight:'2px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px', display:'flex', justifyContent:'center'}}><button onClick={(e)=>{onUpdate(index)}}>&uarr;</button></div>
        </div>
    )
}


const Head = () => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'5%', border: '1px solid black', borderTop:'2px solid black', borderLeft:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Sno</div>
            <div style={{ width:'40%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Title</div>
            <div style={{ width:'8%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Date</div>
            <div style={{ width:'13%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Video</div>
            <div style={{ width:'13%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Notes</div>
            <div style={{ width:'13%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Assignments</div>
            <div style={{ width:'4%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px', fontSize:'0.7rem'}}>Delete</div>
            <div style={{ width:'4%', border: '1px solid black', borderTop:'2px solid black', borderRight:'2px solid black', backgroundColor: 'white', padding:'8px', fontSize:'0.7em'}}>Update</div>
        </div>
    )
}

const AddForm = ({setOnAdd}) => {

    const [FormDetails, setFormDetails] = useState({title: '', date: '', videoLink: '', notesLink: '', assignmentLink: ''})

    const onSubmit = e => {
        e.preventDefault()
    }

    return(
        <div className="addFormContainer">
            <div className="addForm" onSubmit={onSubmit}>
                <label>Title</label>
                <input type="text" value={FormDetails.title} onChange={e=>{setFormDetails({...FormDetails, title: e.target.value})}}/>
                <label >Date</label>
                <input type="text" value={FormDetails.date} onChange={e=>{setFormDetails({...FormDetails, date: e.target.value})}}/>
                <label >Video Link</label>
                <input type="text" value={FormDetails.videoLink} onChange={e=>{setFormDetails({...FormDetails, videoLink: e.target.value})}}/>
                <label >Notes Link</label>
                <input type="text" value={FormDetails.notesLink} onChange={e=>{setFormDetails({...FormDetails, notesLink: e.target.value})}}/>
                <label >Assignment Link</label>
                <input type="text" value={FormDetails.assignmentLink} onChange={e=>{setFormDetails({...FormDetails, assignmentLink: e.target.value})}}/>
                <button type="submit">Submit</button>
                <button type="button" onClick={()=>setOnAdd(false)}>Back</button>
            </div>
        </div>
    )
}
export default TeacherResourceAccessPage
