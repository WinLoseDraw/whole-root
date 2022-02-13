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
          if (ref!== null){
            if (ref.current.contains(e.target)){
              flag = true
            } 
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

  const [Questions, setQuestions] = useState([{text: "Find velocity of charged particle"}, {text: "Find energy of earth"}])
  const [QuestionComponents, setQuestionComponents] = useState([])
  const [CurrentQuestionComponent, setCurrentQuestionComponent] = useState(null)

  const [CurrentQuestionNumber, setCurrentQuestionNumber] = useState(1)

  const [TimeLeft,  setTimeLeft] = useState(0)

  // Refs
  const answerText = useRef(null)
  const submitBtn = useRef(null)
  const videoBox = useRef(null)
  const changeQuestionRight = useRef(null)
  const changeQuestionLeft = useRef(null)

  // Alerts
  useOutsideClickAlerter([answerText, submitBtn, videoBox, changeQuestionRight, changeQuestionRight])
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

  const testSubmit = e => {
    e.preventDefault();
  }

  useEffect(() => {
    
    let t = []
    Questions.forEach((question, index) => {
      t.push(<Question number={index+1} question={question.text} _ref={answerText}/>)
    });
    setQuestionComponents(t);

  }, [Questions])

  useEffect(() => {
    setCurrentQuestionComponent(QuestionComponents[CurrentQuestionNumber - 1])
  }, [QuestionComponents, CurrentQuestionNumber])

  return (
    <>
    {TimeLeft === 1? <TimeUp /> :
    
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
      
      <h1>PHYSICS ASSESSMENT</h1>

      <form className="assessment" onSubmit={testSubmit}>
        <div className="timer">TIME LEFT: 00:00:00</div>
        <div className="questionChangeBtnHolder">
          <button type="button" ref={changeQuestionLeft} onClick={()=>{if (CurrentQuestionNumber > 1) setCurrentQuestionNumber(CurrentQuestionNumber - 1)}}>&larr;</button>
          <button type="button" ref={changeQuestionRight} onClick={()=>{if (CurrentQuestionNumber < QuestionComponents.length) setCurrentQuestionNumber(CurrentQuestionNumber + 1)}}>&rarr;</button>
        </div>
        {CurrentQuestionComponent}
        <button type="submit" className="submitBtn" ref={submitBtn}>SUBMIT</button>
      </form>
    </div>
    }
    </>    
  )
}

const Question = ({number, question, _ref}) => {
  return(
    <>
    Q{number}.
    <div className="question">
      {question}
    </div>
    <div className="answer" ref={_ref}>
      <label htmlFor="answerText">Answer</label>
      <textarea name="answerText"  placeholder="Answer text here!!" rows="20" cols="110"></textarea>
    </div>
    </>
  )
}

const TimeUp = () => {
  return(
    <div style={{width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{width:'70%', height:'75%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'60px', fontWeight:'bold', backgroundColor:'white', boxShadow:'rgba(0, 0, 0, 0.5) 0px 2px 8px'}}>
        TIME'S UP!!
      </div>
    </div>
  )
}

export default StudentTest
