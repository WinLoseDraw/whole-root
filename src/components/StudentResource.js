import React, {useState, useEffect} from 'react'

import './CSS/ResourcePage.css'

const StudentResource = () => {

    const [Resources, setResources] = useState([
        {name: "MATHS", resources: [{placeHolder: "Integeration", link: "/"}, {placeHolder: "Differentation", link: "/"}, {placeHolder: "ODE", link: "/"}]},
        {name: "PHYSICS", resources: [{placeHolder: "Kinematics", link: "/"}, {placeHolder: "Dynamics", link: "/"}, {placeHolder: "Rotation", link: "/"}]},
        {name: "CHEMISTRY", resources: [{placeHolder: "Physical", link: "/"}, {placeHolder: "Organic", link: "/"}, {placeHolder: "Inorganic", link: "/"}]},
        {name: "ENGLISH", resources: [{placeHolder: "Litrature", link: "/"}, {placeHolder: "Grammer", link: "/"}]}
    ])

    const [GridItems, setGridItems] = useState([])

    useEffect(() => {
        let t = []
        Resources.forEach(item => {
            t.push(<ResourceCard name={item.name} resources={item.resources}/>)
        })
        setGridItems(t)
    }, [Resources])

    

    return (
        <div className="resourceContainer">
            {GridItems}
        </div>
    )
}

const ResourceCard = ({name, resources}) => {  
     
    const [ListItems, setListItems] = useState([])

    useEffect(() => {
        let t = []
        resources.forEach(resource => {
            t.push(<li>{resource.placeHolder}</li>)
        })
        setListItems(t)
    }, [resources])

    return (
        <div className="resourceCard" target="_blank" >
            <div>
                {name}
                <div style={{width:"80%", height:"0px", margin:"10px auto", border:"1px solid black"}}></div>
            </div>       
            <ol>
                {ListItems}
            </ol>
        </div>
    )
}


export default StudentResource
