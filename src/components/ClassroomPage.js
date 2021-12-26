import React from 'react'

import PencilIcon from "../iconComponents/PencilIcon";
import SquareIcon from "../iconComponents/SquareIcon";
import CircleIcon from "../iconComponents/CircleIcon";
import EraserIcon from "../iconComponents/EraserIcon";
import SelectIcon from "../iconComponents/SelectIcon";

import './CSS/ClassroomPage.css'

const ClassroomPage = () => {
    return (
        <div>
            <ToolPad />
        </div>
    )
}

const ToolPad = () => {

    return(
        <div className="ToolPadBackground">
            <div className="colorPalleteContainer">
                <div className="colorPallete" id="black"></div>
                <div className="colorPallete" id="green"></div>
                <div className="colorPallete" id="blue"></div>
                <div className="colorPallete" id="white"></div>
                <div className="colorPallete" id="yellow"></div>
                <div className="colorPallete" id="red"></div>
            </div>
            <PencilIcon className='icon' color="#FFFFFF"/>
            <SquareIcon className='icon'/>
            <CircleIcon className='icon'/>
            <EraserIcon className='icon'/>
            <SelectIcon className='icon'/>
        </div>
    )
}

export default ClassroomPage
