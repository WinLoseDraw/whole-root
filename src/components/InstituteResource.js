import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const InstituteResource = ({auth}) => {
    
    console.log(auth)

    // TODO: check the need of recources section of the state
    const [Resources, setResources] = useState([])

    useEffect(() => {
        axios.post('https://test-serverrr.herokuapp.com/allsubjects', {
            inst_name: auth.get.institute
        }).then((res) => {
            console.log(res.data.rows)

            let t = []
            res.data.rows.forEach(element => {
                console.log(element)
                t.push({name: element[0]['value']})
            });
            setResources(t)
        }) 
    }, [])

    const [OnAdd, setOnAdd] = useState(false)

    const [GridItems, setGridItems] = useState([])

    useEffect(() => {
        let t = []
        Resources.forEach(item => {
            t.push(<ResourceCard name={item.name} resources={Resources.resources}/>)
        })
        setGridItems(t)
    }, [Resources])

    return (
        <>
            <div className="resourceContainer">
                {GridItems}
                <AddCard setOnAdd={setOnAdd}/>
            </div>
            {OnAdd && <AddForm setOnAdd={setOnAdd} auth={auth}/>}
        </>
    )
}

const ResourceCard = ({name, resources}) => {  
     
    let navigate = useNavigate()


    const resourceClick = () => {
        navigate("/institute/Resource/topic", {state: {name: name}});
    }

    return (
        <div className="resourceCard" onClick={resourceClick}>
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

const AddForm = ({setOnAdd, auth}) => {

    const [FormDetails, setFormDetails] = useState({name: ''})

    const onSubmit = e => {

        axios.post('https://test-serverrr.herokuapp.com/makesubject' ,{
            subj_name: FormDetails.name,
            inst_name: auth.get.institute
        }).then((res) => {
            console.log(res.data)
            alert('success')
            setFormDetails({name: ''})
        }).catch((err) => {
            console.log(err)
            alert(err)
        });
    }

    return(
        <div className="addFormContainer" >
            <div className="addForm" style={{justifyContent:'center'}}>
                <label>Subject</label>
                <input type="name" value={FormDetails.name} onChange={e=>{setFormDetails({...FormDetails, name: e.target.value})}} style={{marginBottom:'20px'}}/>
                <button type="button" onClick={onSubmit}>Submit</button>
                <button type="button" onClick={(e)=>setOnAdd(false)}>Back</button>
            </div>
        </div>
    )
}
export default InstituteResource
