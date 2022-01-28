import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const InstituteResourceAccessPage = () => {
    const {state} = useLocation()

    const [Lectures, setLectures] = useState([{title: "ODE", link: ""},{title: "PDE", link: ""},{title: "Double Integral", link: ""},{title: "Triple Integral", link: ""}])

    const [LectureItems, setLectureItems] = useState([]);

    const onDelete = (name) => {
        console.log(name)
    }

    useEffect(() => {
        let t = []
        Lectures.forEach((element, index) => {
            if (index == Lectures.length - 1){
                t.push(<End sno={index+1} name={element.title} link=" " notes=" " question="1" onDelete={onDelete}/>)
            }else{
                t.push(<Row sno={index+1} name={element.title} link=" " notes=" " question="1" onDelete={onDelete}/>)
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

const Row = ({sno, name, link, notes, question, onDelete}) => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'10%', border: '1px solid black', borderLeft:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{sno}</div>
            <div style={{ width:'40%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{name}</div>
            <div style={{ width:'16%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{link}</div>
            <div style={{ width:'17%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{notes}</div>
            <div style={{ width:'13%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{question}</div>
            <div style={{ width:'4%', border: '1px solid black', borderRight:'2px solid black', backgroundColor: 'white', padding:'8px', display:'flex', justifyContent:'center'}}><button onClick={(e)=>{onDelete(name)}}>X</button></div>
        </div>
    )
}

const End = ({sno, name, link, notes, question, onDelete}) => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'10%', border: '1px solid black', borderLeft:'2px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{sno}</div>
            <div style={{ width:'40%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{name}</div>
            <div style={{ width:'16%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{link}</div>
            <div style={{ width:'17%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{notes}</div>
            <div style={{ width:'13%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{question}</div>
            <div style={{ width:'4%', border: '1px solid black', borderRight:'2px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px', display:'flex', justifyContent:'center'}}><button onClick={(e)=>{onDelete(name)}}>X</button></div>
        </div>
    )
}


const Head = () => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'10%', border: '1px solid black', borderTop:'2px solid black', borderLeft:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Sno</div>
            <div style={{ width:'40%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Name</div>
            <div style={{ width:'16%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Link</div>
            <div style={{ width:'17%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Notes</div>
            <div style={{ width:'13%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Ques</div>
            <div style={{ width:'4%', border: '1px solid black', borderTop:'2px solid black', borderRight:'2px solid black', backgroundColor: 'white', padding:'8px'}}></div>
        </div>
    )
}


export default InstituteResourceAccessPage
