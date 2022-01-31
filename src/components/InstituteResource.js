import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'

const InstituteResource = () => {
    
    // TODO: check the need of recources section of the state
    const [Resources, setResources] = useState([
        {name: "MATHS", resources: [{placeHolder: "Integeration", link: "/"}, {placeHolder: "Differentation", link: "/"}, {placeHolder: "ODE", link: "/"}]},
        {name: "PHYSICS", resources: [{placeHolder: "Kinematics", link: "/"}, {placeHolder: "Dynamics", link: "/"}, {placeHolder: "Rotation", link: "/"}]},
        {name: "CHEMISTRY", resources: [{placeHolder: "Physical", link: "/"}, {placeHolder: "Organic", link: "/"}, {placeHolder: "Inorganic", link: "/"}]},
        {name: "ENGLISH", resources: [{placeHolder: "Litrature", link: "/"}, {placeHolder: "Grammer", link: "/"}]}
    ])

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
            {OnAdd && <AddForm setOnAdd={setOnAdd}/>}
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

const AddForm = ({setOnAdd}) => {

    const [FormDetails, setFormDetails] = useState({name: ''})

    const onSubmit = e => {
        e.preventDefault()
    }

    return(
        <div className="addFormContainer" >
            <div className="addForm" onSubmit={onSubmit} style={{justifyContent:'center'}}>
                <label>Subject</label>
                <input type="name" value={FormDetails.name} onChange={e=>{setFormDetails({...FormDetails, name: e.target.value})}} style={{marginBottom:'20px'}}/>
                <button type="submit">Submit</button>
                <button type="button" onClick={()=>setOnAdd(false)}>Back</button>
            </div>
        </div>
    )
}
export default InstituteResource
