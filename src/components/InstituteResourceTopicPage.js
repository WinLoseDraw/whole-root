import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router'
import axios from 'axios'

const InstituteResourceTopicPage = ({auth}) => {

    let {state} = useLocation()

    const [Subjects, setSubjects] = useState([])

    useEffect(() => {

        console.log(state)

        axios.post('https://test-serverrr.herokuapp.com/allchapters', {
            subj_name: state.name,
            inst_name: auth.get.institute
        }).then((res) => {
            console.log(res.data.rows)

            let t = []
            res.data.rows.forEach(element => {
                console.log(element)
                t.push({name: element[0]['value']})
            });

            setSubjects(t)

        }).catch(err=>{
            alert(err)
        })
    }, [])

    const [OnAdd, setOnAdd] = useState(false)

    const [GridItems, setGridItems] = useState([])

    useEffect(() => {
        let t = []
        Subjects.forEach(item => {
            t.push(<SubjectCard name={item.name} subjects={Subjects.subjects}/>)
        })
        setGridItems(t)
    }, [Subjects])

    return (
        <>
            <div className="resourceContainer">
                {GridItems}
                <AddCard setOnAdd={setOnAdd}/>
            </div>
            {OnAdd && <AddForm setOnAdd={setOnAdd} auth={auth} name={state.name}/>}
        </>
    )
}

const SubjectCard = ({name}) => {  
     
    let navigate = useNavigate()


    const subjectClick = () => {
        navigate("/institute/resource/Access", {state: {name: name}});
    }

    return (
        <div className="resourceCard" onClick={subjectClick}>
            <div>
                {name}
            <div style={{width:"80%", height:"0px", margin:"10px auto", border:"1px solid black"}}></div>
            </div>       
        </div>
    )
}

const AddCard = ({setOnAdd}) => {
    return(
        <div className="addCard" onClick={()=>setOnAdd(true)}>
            ADD
        </div>
    )
}

const AddForm = ({setOnAdd, auth, name}) => {

    const [FormDetails, setFormDetails] = useState({name: ''})

    const onSubmit = e => {
        console.log(name)
        console.log(auth.get.institute)
        axios.post('https://test-serverrr.herokuapp.com/makechapter', {
            chap_name: name,
            subj_name: FormDetails.name,
            inst_name: auth.get.institute
        }).then((res) => {
            console.log(res.data)
            alert('success')
        }).catch(err=>{
            alert(err)
        })
    }

    return(
        <div className="addFormContainer" >
            <div className="addForm" style={{justifyContent:'center'}}>
                <label>Topic</label>
                <input type="name" value={FormDetails.name} onChange={e=>{setFormDetails({...FormDetails, name: e.target.value})}} style={{marginBottom:'20px'}}/>
                <button type="button" onClick={onSubmit}>Submit</button>
                <button type="button" onClick={()=>setOnAdd(false)}>Back</button>
            </div>
        </div>
    )
}


export default InstituteResourceTopicPage
