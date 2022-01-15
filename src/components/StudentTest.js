import React, { useState, useEffect, useRef } from 'react'
import './CSS/StudentTest.css'



function useOutsideClickAlerter(refs) {
  useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */

      function checkFlag(e){
        let flag = false;

        refs.forEach(ref => {
          if (!ref){
            return;
          }
  
          if (ref.current.contains(e.target)){
            flag = true
          }
        });

        return flag
      }

      function LeftClickOutside(e) {

        let flag = checkFlag(e)

        if (!flag) {
            alert("Not permitted to left click here");
            console.log("Left Click")
        }
      }

      function RightClickOutside(e) {
        
        e.preventDefault()

        let flag = checkFlag(e)

        if (!flag) {
            alert("Not permitted to right click here");
            console.log("Right Click")
        }
      }

      // Bind the event listener
      window.addEventListener("click", LeftClickOutside);
      window.addEventListener("contextmenu", RightClickOutside)
      return () => {
          // Unbind the event listener on clean up
          window.removeEventListener("click", LeftClickOutside);
          window.removeEventListener("contextmenu", RightClickOutside);
      };
  }, [refs]);
}

function useTabChangeAlerter() {

  function detectTabChange(){
    if (document.visibilityState === "visible") {
      console.log("tab is active")
    } else {
      console.log("tab is inactive")
    }
  }

  useEffect(() => {
    document.addEventListener("visibilitychange", detectTabChange)
    return () => {
      document.removeEventListener("visibilitychange", detectTabChange)
    }
  })
}

const StudentTest = () => {

  // Hooks
  const [VideoPos, setVideoPos] = useState({x: 10, y: 10})
  const [PrevMousePos, setPrevMousePos] = useState({x: 0, y: 0})
  const [mouseOffset, setMouseOffset] = useState({x: 0, y: 0})
  const [VideoDrag, setVideoDrag] = useState(false)

  // Refs
  const answerText = useRef(null)
  const submitBtn = useRef(null)
  const videoBox = useRef(null)

  // Alerts
  useOutsideClickAlerter([answerText, submitBtn, videoBox])
  useTabChangeAlerter()

  const dragVideo = (e) =>{
    if (!VideoDrag){
      return;
    }

    const {clientX, clientY} = e;

    setMouseOffset({x: clientX - PrevMousePos.x, y: clientY - PrevMousePos.y})
    setVideoPos({x: VideoPos.x + mouseOffset.x, y: VideoPos.y + mouseOffset.y})
    setPrevMousePos({x: clientX, y: clientY})
  }

  const videoMouseDown = (e) => {
    setVideoDrag(true)
    setMouseOffset({x: 0, y: 0})
    setPrevMousePos({x: e.clientX, y: e.clientY})
  }

  return (
    <div className="main">
        <div id="video-conf" className="video-conference"
        onMouseDown={videoMouseDown}
        onMouseMove={(e) => dragVideo(e)}
        onMouseUp={() => setVideoDrag(false)}
        onMouseLeave={() => setVideoDrag(false)}
        style={{left: VideoPos.x, top: VideoPos.y}}
        ref={videoBox}>
          <div className="video"></div>
          <div className="btns">
            <button className="sepBtn">Mute</button>
            <button className="sepBtn">Video</button>
            <button className="sepBtn">Leave</button>
          </div>
        </div>
        
        <div className="vhalf question">
          <div className="paperHeading">Physics Internal Assessment</div>

          <div className="paperContent">

            Rules
            <ol>
              <li></li>
              <li></li>
              <li></li>
            </ol>

            <div className="divider"></div>
            Questions 

            <ol>
              <li></li>
              <li></li>
              <li></li>
            </ol>
          </div>
        </div>
        <div className="vhalf submission">
          <textarea placeholder="Answer Here!!" id="answerText" className="answerText" ref={answerText}></textarea>
          <button id="submitBtn" className="submitBtn" ref={submitBtn}>Submit</button>
        </div>
      </div>
  )
}

export default StudentTest
