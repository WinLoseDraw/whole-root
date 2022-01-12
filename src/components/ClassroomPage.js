import React from 'react'

import PencilIcon from "../iconComponents/PencilIcon";
import SquareIcon from "../iconComponents/SquareIcon";
import CircleIcon from "../iconComponents/CircleIcon";
import EraserIcon from "../iconComponents/EraserIcon";
import SelectIcon from "../iconComponents/SelectIcon";
import YesIcon from "../iconComponents/YesIcon";
import NoIcon from "../iconComponents/NoIcon";
import HandIcon from "../iconComponents/HandIcon";
import ChatIcon from "../iconComponents/ChatIcon";
import MicIcon from "../iconComponents/MicIcon";
import MicOffIcon from "../iconComponents/MicOffIcon";
import CallIcon from "../iconComponents/CallIcon";
import VolumeIcon from "../iconComponents/VolumeIcon";
import VolumeOffIcon from "../iconComponents/VolumeOffIcon";

import './CSS/ClassroomPage.css'
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const ClassroomPage = () => {
    return (
        <div className="containerClassroomPage">
            <div className="containerSidePad">
                <SidePad />
            </div>
            <div className="containerToolPad">
                <ToolPad />
            </div>
            <div className="containerRightPad">
                <RightPad />
            </div>
        </div>
    )
}

const ToolPad = () => {

    // Hooks
    const [OnSelect, setOnSelect] = useState({
        color: "none",
        icon: "none"
    })                      

    return(
        <div className="ToolPadBackground">
            <div className="colorPalleteContainer">
                <CSSTransition
                    classNames="border"
                    in={OnSelect.color === "black"}
                    timeout={300}>
                    <div className="colorPallete" id="black" onClick={() => setOnSelect({...OnSelect, color: "black"})}></div>
                </CSSTransition>
                <CSSTransition
                    classNames="border"
                    in={OnSelect.color === "green"}
                    timeout={300}>
                    <div className="colorPallete" id="green" onClick={() => setOnSelect({...OnSelect, color: "green"})}></div>
                </CSSTransition>
                <CSSTransition
                    classNames="border"
                    in={OnSelect.color === "blue"}
                    timeout={300}>
                    <div className="colorPallete" id="blue" onClick={() => setOnSelect({...OnSelect, color: "blue"})}></div>
                </CSSTransition>
                <CSSTransition
                    classNames="border"
                    in={OnSelect.color === "white"}
                    timeout={300}>
                    <div className="colorPallete" id="white" onClick={() => setOnSelect({...OnSelect, color: "white"})}></div>
                </CSSTransition>
                <CSSTransition
                    classNames="border"
                    in={OnSelect.color === "yellow"}
                    timeout={300}>
                    <div className="colorPallete" id="yellow" onClick={() => setOnSelect({...OnSelect, color: "yellow"})}></div>
                </CSSTransition>
                <CSSTransition
                    classNames="border"
                    in={OnSelect.color === "red"}
                    timeout={300}>
                    <div className="colorPallete" id="red" onClick={() => setOnSelect({...OnSelect, color: "red"})}></div>
                </CSSTransition> 
            </div>
            <PencilIcon className='icon' color={OnSelect.icon === 'pencil'? "#FFFFFF": "#000000"} onClick={() => setOnSelect({...OnSelect, icon: "pencil"})}/>
            <SquareIcon className='icon' color={OnSelect.icon === 'square'? "#FFFFFF": "#000000"} onClick={() => setOnSelect({...OnSelect, icon: "square"})}/>
            <CircleIcon className='icon' color={OnSelect.icon === 'circle'? "#FFFFFF": "#000000"} onClick={() => setOnSelect({...OnSelect, icon: "circle"})}/>
            <EraserIcon className='icon' color={OnSelect.icon === 'eraser'? "#FFFFFF": "#000000"} onClick={() => setOnSelect({...OnSelect, icon: "eraser"})}/>
            <SelectIcon className='icon' color={OnSelect.icon === 'select'? "#FFFFFF": "#000000"} onClick={() => setOnSelect({...OnSelect, icon: "select"})}/>
        </div>
    )
}

const SidePad = () => {

    const [OnSelect, setOnSelect] = useState({
        yes: false,
        no: false,
        hand: false,
        chat: false 
    })      

    return(
        <div className="sidePadBackground">
            <YesIcon color={OnSelect.yes? "#A3FF05": "#000000"} onClick={() => setOnSelect({...OnSelect, yes: !OnSelect.yes})}/>
            <NoIcon color={OnSelect.no? "#FF0000": "#000000"} onClick={() => setOnSelect({...OnSelect, no: !OnSelect.no})}/>
            <HandIcon color={OnSelect.hand? "#F8DB00": "#000000"} onClick={() => setOnSelect({...OnSelect, hand: !OnSelect.hand})}/>
            <ChatIcon color={OnSelect.chat? "#FFFFFF": "#000000"} onClick={() => setOnSelect({...OnSelect, chat: !OnSelect.chat})}/>
        </div>
    )
}

const RightPad = () => {

    const [IsMicOn, setIsMicOn] = useState(true)
    const [IsVolumeOn, setIsVolumeOn] = useState(true)

    return(
        <div className="rightPadBackground">
            {IsMicOn?
                <MicIcon color="#FFFFFF" onClick={()=>setIsMicOn(false)}/>:
                <MicOffIcon color="#FFFFFF" onClick={()=>setIsMicOn(true)}/>}
            {IsVolumeOn?
                <VolumeIcon color="#FFFFFF" onClick={()=>setIsVolumeOn(false)}/>:
                <VolumeOffIcon color="#FFFFFF" onClick={()=>setIsVolumeOn(true)}/>}
            <CallIcon color="#FF0000"/>
        </div>
    )
}

export default ClassroomPage
