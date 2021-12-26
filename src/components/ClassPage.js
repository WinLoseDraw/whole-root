import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'



import "./CSS/ClassPage.css"

const ClassPage = () => {

    // Hooks
    const [CurrentTab, setCurrentTab] = useState(-1)

    return (
        <div className="classContainer">
            <nav className="classNav">
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
            </nav>

            <ClassesTab />
        </div>
    )
}

const ClassesTab = () => {

    let rooms = [{name: "Maths"}, {name: "Science"}, {name: "English"}, {name: "Hindi"}, {name: "Social Science"}, {name: "Social Science"}, {name: "Social Science"}]

    let gridItems = []

    rooms.forEach((item, index) => {
        gridItems.push(<ClassCard name={item.name} />)
    })

    return(<div className="cardContainer">
                {gridItems}
            </div>)
}

const ClassCard = ({name}) => {

    return (
        <div className="classCard">
            {name}
        </div>
    )
}

export default ClassPage
