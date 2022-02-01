import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import './CSS/ResourceAccessPage.css'

const ResourceAccessPage = ({resources}) => {

    const {state} = useLocation()

    const [Lectures, setLectures] = useState([{title: "First Order Linear", link: ""},{title: "First Order Non Linear", link: ""},{title: "Second Order Linear Homogeneous", link: ""},{title: "Operator Method", link: ""}])

    const [LectureItems, setLectureItems] = useState([]);

    const onSubmitAssignment = () => {

    }


    useEffect(() => {
        let t = []
        Lectures.forEach((element, index) => {
            if (index == Lectures.length - 1){
                t.push(<End sno={index+1} title={element.title} link=" " notes=" " question="1" onSubmitAssignment={onSubmitAssignment} index={index}/>)
            }else{
                t.push(<Row sno={index+1} title={element.title} link=" " notes=" " question="1" onSubmitAssignment={onSubmitAssignment} index={index}/>)
            }
        });
        setLectureItems(t)
    }, [Lectures])

    return (
        <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(255, 205, 111)', minHeight:'100vh'}}>
            <div className="resourceAccessContainer">
                <h1>{state.name}</h1>
                <div>
                    <Head />
                    {LectureItems}
                </div>
            </div>
        </div>
    )
}

const Row = ({sno, title, date, notes, video, onSubmitAssignment, assignment, index}) => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'5%', border: '1px solid black', borderLeft:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{sno}</div>
            <div style={{ width:'46%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{title}</div>
            <div style={{ width:'8%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{date}</div>
            <div style={{ width:'12%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{video}</div>
            <div style={{ width:'12%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{notes}</div>
            <div style={{ width:'12%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{assignment}</div>
            <div style={{ width:'5%', border: '1px solid black', borderRight:'2px solid black', backgroundColor: 'white', padding:'8px'}}><button onClick={(e)=>{onSubmitAssignment()}} >&uarr;</button></div>
        </div>
    )
}

const End = ({sno, title, date, notes, video, assignment, onSubmitAssignment, index}) => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'5%', border: '1px solid black', borderLeft:'2px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{sno}</div>
            <div style={{ width:'46%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{title}</div>
            <div style={{ width:'8%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{date}</div>
            <div style={{ width:'12%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{video}</div>
            <div style={{ width:'12%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{notes}</div>
            <div style={{ width:'12%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{assignment}</div>
            <div style={{ width:'5%', border: '1px solid black', borderRight:'2px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}><button onClick={(e)=>{onSubmitAssignment()}} >&uarr;</button></div>
        </div>
    )
}


const Head = () => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'5%', border: '1px solid black', borderTop:'2px solid black', borderLeft:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Sno</div>
            <div style={{ width:'46%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Title</div>
            <div style={{ width:'8%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Date</div>
            <div style={{ width:'12%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Video</div>
            <div style={{ width:'12%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Notes</div>
            <div style={{ width:'12%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Assignments</div>
            <div style={{ width:'5%', border: '1px solid black', borderRight:'2px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Submit</div>
        </div>
    )
}

export default ResourceAccessPage
