import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router'
import WholerootLogoIcon from "../iconComponents/WholerootLogoIcon";
import WholerootTextIcon from "../iconComponents/WholerootTextIcon";
import Room from '../testWhiteBoard/Room';

import './CSS/InstituteFree.css'

const InstituteFreePage = ({auth, socket}) => {


    let navigate = useNavigate()

    const [RoomId, setRoomId] = useState('')

    const uuid = () => {
        var S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (
                S4() +
                S4() +
                "-" +
                S4() +
                "-" +
                S4() +
                "-" +
                S4() +
                "-" +
                S4() +
                S4() +
                S4()
            );
        };

    const onClassClick = () => {
        socket.emit("join-room", {roomId: RoomId, user: auth.get.institute, isTeacher: true}); 
            
        socket.on("join-result", data=>{
            if (data.isJoined === true){
                console.log(RoomId)
                navigate('/free/Teacher/Classroom', {state: {roomId: RoomId, user: data.teacher, isTeacher: true}})
            } else {
                alert('incorrect room')
            }
        })
    }
    
    return (
        <div className="freeContainer">
            <nav className="mainPageNav">

                <div className="buttonHolder" style={{justifyContent:"flex-start"}}>
                    
                    <button className="navButtonLogin" onClick={()=>{auth.set({login: false, institute: null, loginType: null, page: "/"}); navigate("/")}}>
                        LOG OUT 
                    </button>    
                </div>

                <div className="title">
                    <WholerootLogoIcon width={70}/> 
                    <WholerootTextIcon width={150}/>  
                </div> 

                <div className="buttonHolder" style={{fontSize:"2.3rem"}}>
                    FREE
                </div>
            </nav>  

            <div className="freeButtonsContainer">
                <button className="freeBtn" style={{backgroundColor:'rgb(0, 119, 22)', color:'white'}} onClick={()=>onClassClick()}>
                    CLASS
                </button>
                <button className="freeBtn" style={{backgroundColor:'rgb(0, 92, 231)', color:'white'}} onClick={()=>setRoomId(uuid())}>
                    GENERATE CODE
                </button>
            </div>
            <span style={{margin:'20px auto'}}><h1>CODE: {RoomId} </h1></span>
        </div>
    )
}


export default InstituteFreePage
