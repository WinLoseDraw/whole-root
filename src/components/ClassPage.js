import React, { useState } from 'react'

import "./CSS/ClassPage.css"

const ClassPage = () => {

    // Hooks
    const [CurrentTab, setCurrentTab] = useState(0)

    let rooms = [{name: "Maths"}, {name: "Science"}, {name: "English"}, {name: "Hindi"}, {name: "Social Science"}]

    let gridItems = []

    rooms.forEach((item, index) => {
        gridItems.push(<ClassCard name={item.name} />)
    })

    return (
        <div className="classContainer">
            <nav className="classNav">
                <div className="navTab">
                    Classes
                </div>
                <div className="navTab">
                    Time Table
                </div>
            </nav>
            <div className="cardContainer">
                {gridItems}
            </div>
        </div>
    )
}

const ClassCard = ({name}) => {

    return (
        <div className="classCard">
            {name}
        </div>
    )
}

export default ClassPage
