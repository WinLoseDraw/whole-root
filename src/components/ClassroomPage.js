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
import { useLocation, useNavigate } from "react-router-dom";

import 'tippy.js/dist/tippy.css'
import { useCanvas } from './BoardFIles/CanvasContext';

const ClassroomPage = ({user, socket, auth}) => {

    let navigate = useNavigate()

    const {state} = useLocation()
    console.log(state)

    // Hooks
    const [OnSelectDraw, setOnSelectDraw] = useState({
        color: "none",
        icon: "none"
    })  

    const [Chat, setChat] = useState(false)

    const [divPos, setDivPos] = useState(500)
    const [isSliding, setIsSliding] = useState(false)
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

    const leaveCall = () => {
        socket.emit("leave-room", {roomId: state.roomId});

        socket.on("leave-result", data=>{
            if (data){
                if (auth.get.loginType == 'free'){
                    if (user == 'teacher'){
                        navigate('/free')
                    }
                }
            }
        })
    }

    const startSliding = (e) => {
        setIsSliding(true)
    } 

    const slide = e => {
        if (isSliding === true){
            let pos;
            if (e.clientX < 300){
                pos = 300;
            }else if (e.clientX > window.innerWidth - 100){
                pos = window.innerWidth - 100
            }else{
                pos = e.clientX
            }
            setDivPos(pos)
        }
    }

    const stopSliding = e => {
        setIsSliding(false)
    }

    return (
        <div style={{width: '100vw', height: '100vh'}} onMouseMove={slide} onMouseUp={stopSliding} onMouseLeave={stopSliding}>
            <div className="containerClassroomPage" style={{position: 'absolute', left:'0px', top:'0px', width: divPos}}>

                <div className="containerHeader">
                    <div className="header">
                        <div className="heading">SUBJECT: MATHS</div>
                        <div className="heading">TEACHER: {state.user}</div>
                    </div>
                </div>

                <div className="containerSidePad">
                    <SidePad setChat={setChat}/>
                </div>
                <div className="containerToolPad">
                    <ToolPad OnSelect={{get: OnSelectDraw, set: setOnSelectDraw}}/>
                </div>
                <div className="containerRightPad">
                    <RightPad user={user} leaveCall={leaveCall}/>
                </div>

            
                <Canvas color={OnSelectDraw.color} type={OnSelectDraw.icon} user={state} socket={socket}/>
                
                {Chat && <ChatBox />}
            </div>
            <div style={{position:'absolute', top:'0px', bottom:'0px', width:'10px', backgroundColor:'black', left:divPos}} onMouseDown={startSliding}></div>
            <iframe src="" frameborder="0" style={{position: 'absolute', top:'0px', bottom: '0px', right: '0px', left:divPos}}></iframe>
        </div>
    )
}

const ChatBox = ({}) => {

    const [CurrentMessage, setCurrentMessage] = useState("")

    const [Messages, setMessages] = useState([{type: 'sent', content: "hello"}, {type: 'sent', content: "hello"}, {type: 'sent', content: "hello"}, {type: 'sent', content: "hello"}, {type: 'sent', content: "hello"}, {type: 'sent', content: "hello"}, {type: 'sent', content: "hello"}, {type: 'sent', content: "hello"}, {type: 'sent', content: "hello"}, {type: 'recieved', content: "hi"}, {type: 'recieved', content: "how are you"}, {type: 'sent', content: "I am god"}, {type: 'recieved', content: "do you mean I am good ?"}, {type: 'sent', content: "No"}])
    const [MessageComponents, setMessageComponents] = useState([])


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

    useEffect(() => {
        let t = []
        Messages.forEach(element => {
            t.push(<div className="messageHolder"><div className={element.type === 'sent' ? 'sentMessage': 'recievedMessage'}>{element.content}</div></div>)
        });
       setMessageComponents(t)
    }, [Messages])

    return(
        <div className="containerChatBox"
            onMouseDown={chatMouseDown}
            onMouseMove={(e) => dragChat(e)}
            onMouseUp={() => setChatDrag(false)}
            onMouseLeave={() => setChatDrag(false)}
            style={{left: ChatPos.x, top: ChatPos.y}}>
            <div className="messageBox" >{MessageComponents}</div>
            <div className="inputContainer">
                <input type="text" placeholder="Hey.." value={CurrentMessage} onChange={(e)=>setCurrentMessage(e.target.value)}/>
                <button >&#9658;</button>
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

const RightPad = ({user, leaveCall}) => {

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
            <CallIcon color="#FF0000" onClick={() => leaveCall()}/>
            {user !== "teacher" && <button className="routButton" style={{backgroundColor:'rgb(251, 138, 0)'}} onClick={() => navigate(user==="teacher"?"/Teacher/Resource": "/Student/Resource")}></button>}
            
            {user !== "teacher" && <button className="routButton" style={{backgroundColor:'rgb(0, 92, 231)'}} onClick={() => navigate(user==="teacher"?"/Teacher/Test": "/Student/Test")}></button>}
        </div>
    )
}

export default ClassroomPage
