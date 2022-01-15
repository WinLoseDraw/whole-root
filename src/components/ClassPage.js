import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

import { useNavigate } from "react-router-dom";

import "./CSS/ClassPage.css"

const ClassPage = () => {

    // Hooks
    const [CurrentTab, setCurrentTab] = useState(-1)

    return (
        <div className="classContainer">
            {/* <nav className="classNav">
                <CSSTransition 
                    in={CurrentTab===0}
                    classNames="navTabTransition"
                    timeout={200}>

                    <div className="navTab" onClick={() => setCurrentTab(0)}>
                        Classes
                    </div>

                </CSSTransition>

                <CSSTransition
                    in={CurrentTab===1}
                    classNames="navTabTransition"
                    timeout={200}>

                    <div className="navTab" onClick={() => setCurrentTab(1)}>
                        Time Table
                    </div>

                </CSSTransition>
            </nav> */}

            <ClassesTab />
        </div>
    )
}

const ClassesTab = () => {

    const [Rooms, setRooms] = useState([{name: "Maths"}, {name: "Science"}, {name: "English"}, {name: "Hindi"}, {name: "French"}, {name: "Social Science"}, {name: "Fine Arts"}])
    const [GridItems, setGridItems] = useState([])

    useEffect(() => {
        let t = []
        Rooms.forEach((item, index) => {
            t.push(<ClassCard name={item.name} />)
        })
        setGridItems(t)
    }, [Rooms])

    return(<div className="cardContainer">
                {GridItems}
            </div>)
}

const ClassCard = ({name}) => {  
     
    let navigate = useNavigate()
     
    return (
        <div className="classCard" onClick={() => {navigate('/Student/Classroom')}}>
            {name}
        </div>
    )
}

export default ClassPage
