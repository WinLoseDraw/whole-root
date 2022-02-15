import { right } from '@popperjs/core';
import React, { useState, useEffect } from 'react'

const TeacherTestUpdatePage = () => {

    const [Questions, setQuestions] = useState([{content: "Find the volume of cube", marks: 10}, {content: "Find the area of circle", marks: 10}])
    const [Duration, setDuration] = useState({minuites:0, hours:0, seconds:0})
    const [QuestionsSize, setQuestionsSize] = useState(2)
    const [OnAdd, setOnAdd] = useState(false)
    const [onDuration, setOnDuration] = useState(false)

    const [QuestionComponents, setQuestionComponents] = useState([]);

    const [TestCode, setTestCode] = useState('')

    const [divPos, setDivPos] = useState(500)
    const [isSliding, setIsSliding] = useState(false)
    const [pageWidth, setPageWidth] = useState(500)

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

    const addQuestion = (question) => {
        setQuestions([...Questions, question])
        setQuestionsSize(QuestionsSize + 1)
    }

    const removeQuestion = (_index) => {
        let t = []
        console.log(_index)
        Questions.forEach((element, index )=> {
            if (!(index === _index)){
                t.push(element)
            }
        });
        setQuestions(t);
        setQuestionsSize(QuestionsSize - 1)
    }

    const onStart = () => {
        setTestCode(uuid())
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

    useEffect(() => {
        setPageWidth(window.innerWidth)
    }, [divPos])

    useEffect(() => {
        setTestCode('')
        setDivPos(window.innerWidth - 100)
        setPageWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        let t = [];
        Questions.forEach((element, index) => {
            t.push(
                <div className="question" style ={{marginBottom: '20px', display:'flex', justifyContent:'space-between'}}>
                    <div style={{marginRight: '10px'}}>Q{index + 1}</div>
                    <div style={{flexGrow: 1}}>{element.content}</div>
                    <div style={{marginRight: '10px'}}>({element.marks})</div>
                    <button className="deleteQuestion" onClick={() => removeQuestion(index)}>X</button>
                </div>
            )
        });
        setQuestionComponents(t);
    }, [Questions])

    return (
        <div onMouseMove={slide} onMouseUp={stopSliding} onMouseLeave={stopSliding}>
            <div className="main"  style={{position:'absolute', left:'0px', top:'0px', bottom: '0px', width:divPos}}>
        
                <h1>PHYSICS ASSESSMENT</h1>

                <form className="assessment" onSubmit={(e) => e.preventDefault()}>
                
                    {QuestionComponents}

                    <div className="question" style ={{marginBottom: '20px', display:'flex', justifyContent:'space-between', paddingTop:'15px', paddingBottom: '15px'}}>
                        Duration
                        <button style={{backgroundColor: 'black', color: 'white', border: 'none', padding:'4px 8px', borderRadius:'4px'}}>Change</button>
                    </div>

                    <button type="button" className="submitBtn" onClick={() => {setOnAdd(true)}}>ADD</button>
                    <button type="button" className="submitBtn">UPDATE</button>
                    {TestCode !== '' && (
                        <div className="question" style ={{marginBottom: '20px', display:'flex', justifyContent:'space-between'}}>
                            Code:{TestCode}
                        </div>
                    )}
                    <button type="button" className="submitBtn" onClick={() => {onStart()}}>START</button>
                    
                </form>
                {OnAdd && <AddForm setOnAdd={setOnAdd} addQuestion={addQuestion} />}
                {onDuration && <ChangeDurationForm setOnDuration={setOnDuration} duration={{get: Duration, set: setDuration}} />}
            </div>
            {TestCode !== '' && (
                <>
                    <div style={{position:'absolute', top:'0px', bottom:'0px', width:'30px', backgroundColor:'black', left:divPos}} onMouseDown={startSliding}></div>
                    <iframe src={`https://wholeroot-video-conference.herokuapp.com/${TestCode}`} allow="camera;microphone;display-capture;" frameborder="0" style={{position: 'absolute', bottom: '0px', left:(divPos + 30), height:'100vh', width: window.innerWidth - divPos}}></iframe>
                </>
            )}
        </div>
    )
}

const ChangeDurationForm = ({setOnDuration, duration}) => {

    const [FormDetails, setFormDetails] = useState({hours: 0, minuites: 0, seconds: 0})


    const onSubmit = e => {

    }

    return(
        <div className="addFormContainer" >
            <div className="addForm" style={{justifyContent:'center'}}>
                <label>Hours</label>
                <input type="name" value={FormDetails.hours} onChange={e=>{setFormDetails({...FormDetails, hours: e.target.value})}} style={{marginBottom:'20px'}}/>
                <label>Minuites</label>
                <input type="text" value={FormDetails.minuites} onChange={e=>{setFormDetails({...FormDetails, minuites: e.target.value})}}/>
                <label>Seconds</label>
                <input type="text" value={FormDetails.seconds} onChange={e=>{setFormDetails({...FormDetails, seconds: e.target.value})}}/>
                <button type="button" style={{backgroundColor: 'rgb(0, 92, 231)'}} onClick={onSubmit}>Submit</button>
                <button type="button" style={{backgroundColor: 'rgb(0, 92, 231)'}} onClick={()=>setOnDuration(false)}>Back</button>
            </div>
        </div>
    )
}

const AddForm = ({setOnAdd, addQuestion}) => {

    console.log(addQuestion)

    const [FormDetails, setFormDetails] = useState({content: '', marks:''})

    const onSubmit = e => {
        let check = true
        Object.values(FormDetails).forEach(element => {
            if (element ===  ''){
                check = false
                return
            }
        })
        if (check === false) {
            alert('Complete the form')
            return
        }
        addQuestion(FormDetails)
        setOnAdd(false)
    }

    return(
        <div className="addFormContainer" >
            <div className="addForm" style={{justifyContent:'center'}}>
                <label>Question</label>
                {/* <input type="name" value={FormDetails.name} onChange={e=>{setFormDetails({...FormDetails, name: e.target.value})}} style={{marginBottom:'20px'}}/> */}
                <textarea value={FormDetails.content} onChange={e=>{setFormDetails({...FormDetails, content: e.target.value})}}></textarea>
                <label>Marks</label>
                <input type="text" value={FormDetails.marks} onChange={e=>{setFormDetails({...FormDetails, marks: e.target.value})}}/>
                <button type="button" style={{backgroundColor: 'rgb(0, 92, 231)'}} onClick={onSubmit}>Submit</button>
                <button type="button" style={{backgroundColor: 'rgb(0, 92, 231)'}} onClick={()=>setOnAdd(false)}>Back</button>
            </div>
        </div>
    )
}


export default TeacherTestUpdatePage
