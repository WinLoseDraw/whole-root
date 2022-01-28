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
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Canvas } from './BoardFIles/Canvas';
import { useNavigate } from "react-router-dom";

import 'tippy.js/dist/tippy.css'

const ClassroomPage = ({user, room, socket}) => {

    // Hooks
    const [OnSelectDraw, setOnSelectDraw] = useState({
        color: "none",
        icon: "none"
    })  

    const [Chat, setChat] = useState(false)

    // Effect hook

    useEffect(() => {
        function disableScroll(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

            window.onscroll = () => {
                window.scrollTo(scrollLeft, scrollTop)
            }
        }

        function enableScroll(){
            window.onscroll = function(){}
        }

        disableScroll()

        return () => {
            enableScroll()
        }
    })

    useEffect(() => {
        socket.emit("join_room", room)
    }, [room])

    return (
        <>
        <div className="containerClassroomPage">

           

            <div className="containerHeader">
                <div className="header">
                    <div className="heading">SUBJECT: MATHS</div>
                    <div className="heading">TEACHER: </div>
                </div>
            </div>

            <div className="containerSidePad">
                <SidePad setChat={setChat}/>
            </div>
            <div className="containerToolPad">
                <ToolPad OnSelect={{get: OnSelectDraw, set: setOnSelectDraw}}/>
            </div>
            <div className="containerRightPad">
                <RightPad user={user}/>
            </div>

         
            <Canvas color={OnSelectDraw.color} type={OnSelectDraw.icon}/>
            
            {Chat && <ChatBox socket={socket} room={room} />}
        </div>
        </>
    )
}

const ChatBox = ({socket, room}) => {

    const [CurrentMessage, setCurrentMessage] = useState("")

    const sendMessage = async () => {
        if (CurrentMessage === ""){return;}

        const messageData = {
            room: room,
            message: CurrentMessage,
            author: socket.id
        }

        await socket.emit("send_message", messageData)
    }

    useEffect(() => {
        socket.on("recieve_message", (data => {
            console.log(data)
        }))
    }, [socket])

    // Drag chat
    const [ChatPos, setChatPos] = useState({x: 100, y: 100})
    const [PrevMousePos, setPrevMousePos] = useState({x: 0, y: 0})
    const [MouseOffset, setMouseOffset] = useState({x: 0, y: 0})
    const [ChatDrag, setChatDrag] = useState(false)

    const dragChat = e => {

        if (!ChatDrag){
            return;
        }
      
        const {clientX, clientY} = e;

        setMouseOffset({x: clientX - PrevMousePos.x, y: clientY - PrevMousePos.y})
        setChatPos({x: ChatPos.x + MouseOffset.x, y: ChatPos.y + MouseOffset.y})
        setPrevMousePos({x: clientX, y: clientY})
    }

    const chatMouseDown = (e) => {
        setChatDrag(true)
        setMouseOffset({x: 0, y: 0})
        setPrevMousePos({x: e.clientX, y: e.clientY})
    }

    return(
        <div className="containerChatBox"
            onMouseDown={chatMouseDown}
            onMouseMove={(e) => dragChat(e)}
            onMouseUp={() => setChatDrag(false)}
            onMouseLeave={() => setChatDrag(false)}
            style={{left: ChatPos.x, top: ChatPos.y}}>
            <div className="inputContainer">
                <input type="text" placeholder="Hey.." value={CurrentMessage} onChange={(e)=>setCurrentMessage(e.target.value)}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

const ToolPad = ({OnSelect}) => {               

    return(
        <div className="ToolPadBackground">
            <div className="colorPalleteContainer">
                <CSSTransition
                    classNames="border"
                    in={OnSelect.get.color === "black"}
                    timeout={300}>
                    <div className="colorPallete" id="black" onClick={() => OnSelect.set({...OnSelect.get, color: "black"})}></div>
                </CSSTransition>
                <CSSTransition
                    classNames="border"
                    in={OnSelect.get.color === "green"}
                    timeout={300}>
                    <div className="colorPallete" id="green" onClick={() => OnSelect.set({...OnSelect.get, color: "green"})}></div>
                </CSSTransition>
                <CSSTransition
                    classNames="border"
                    in={OnSelect.get.color === "blue"}
                    timeout={300}>
                    <div className="colorPallete" id="blue" onClick={() => OnSelect.set({...OnSelect.get, color: "blue"})}></div>
                </CSSTransition>
                <CSSTransition
                    classNames="border"
                    in={OnSelect.get.color === "white"}
                    timeout={300}>
                    <div className="colorPallete" id="white" onClick={() => OnSelect.set({...OnSelect.get, color: "white"})}></div>
                </CSSTransition>
                <CSSTransition
                    classNames="border"
                    in={OnSelect.get.color === "yellow"}
                    timeout={300}>
                    <div className="colorPallete" id="yellow" onClick={() => OnSelect.set({...OnSelect.get, color: "yellow"})}></div>
                </CSSTransition>
                <CSSTransition
                    classNames="border"
                    in={OnSelect.get.color === "red"}
                    timeout={300}>
                    <div className="colorPallete" id="red" onClick={() => OnSelect.set({...OnSelect.get, color: "red"})}></div>
                </CSSTransition> 
            </div>
            <PencilIcon className='icon' color={OnSelect.get.icon === 'pencil'? "#FFFFFF": "#000000"} onClick={() => OnSelect.set({...OnSelect.get, icon: "pencil"})}/>
            <SquareIcon className='icon' color={OnSelect.get.icon === 'rect'? "#FFFFFF": "#000000"} onClick={() => OnSelect.set({...OnSelect.get, icon: "rect"})}/>
            <CircleIcon className='icon' color={OnSelect.get.icon === 'circle'? "#FFFFFF": "#000000"} onClick={() => OnSelect.set({...OnSelect.get, icon: "circle"})}/>
            <EraserIcon className='icon' color={OnSelect.get.icon === 'eraser'? "#FFFFFF": "#000000"} onClick={() => OnSelect.set({...OnSelect.get, icon: "eraser"})}/>
        </div>
    )
}

const SidePad = ({setChat}) => {

    const [OnSelect, setOnSelect] = useState({
        yes: false,
        no: false,
        hand: false,
        chat: false 
    })      

    return(
        <div className="sidePadBackground">
            <YesIcon color={OnSelect.yes? "#A3FF05": "#000000"} onClick={() => setOnSelect({...OnSelect, yes: !OnSelect.yes, no: false})}/>
            <NoIcon color={OnSelect.no? "#FF0000": "#000000"} onClick={() => setOnSelect({...OnSelect, no: !OnSelect.no, yes: false})}/>
            <HandIcon color={OnSelect.hand? "#F8DB00": "#000000"} onClick={() => setOnSelect({...OnSelect, hand: !OnSelect.hand})}/>
            <ChatIcon color={OnSelect.chat? "#FFFFFF": "#000000"} onClick={() => {setOnSelect({...OnSelect, chat: !OnSelect.chat}); setChat(!OnSelect.chat)}}/>
        </div>
    )
}

const RightPad = ({user}) => {

    let navigate = useNavigate();

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
            <CallIcon color="#FF0000" onClick={() => navigate(user==="teacher"?"/Teacher": "/Student/Class")}/>
            <button className="routButton" style={{backgroundColor:'rgb(251, 138, 0)'}} onClick={() => navigate(user==="teacher"?"/Teacher/Resource": "/Student/Resource")}></button>
            <button className="routButton" style={{backgroundColor:'rgb(0, 92, 231)'}} onClick={() => navigate(user==="teacher"?"/Teacher/Test": "/Student/Test")}></button>
        </div>
    )
}

export default ClassroomPage
