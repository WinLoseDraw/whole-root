import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'

const TeacherTestAddPage = ({auth}) => {
    const [Tests, setTests] = useState([
        {name: 'UT1'},
        {name:'UT2'},
        {name: 'Final'}
    ])

    const [GridItems, setGridItems] = useState([])

    useEffect(() => {
        let t = []
        Tests.forEach(item => {
            t.push(<TestCard name={item.name}/>)
        })
        setGridItems(t)
    }, [Tests])

    

    return (
        <div className="resourceContainer" style={{backgroundColor:"rgba(0,0,0,0)"}}>
            {GridItems}
        </div>
    )
}

const TestCard = ({name}) => {  
     
    let navigate = useNavigate()


    const testClick = () => {
        navigate("/Teacher/Test/update", {state: {name: name}});
    }

    return (
        <div className="resourceCard" style={{backgroundColor:'rgb(0, 92, 231)', color:'white'}} onClick={testClick}>
            <div>
                {name}
            <div style={{width:"80%", height:"0px", margin:"10px auto", border:"1px solid white", backgroundColor:'white'}}></div>
            </div>       
        </div>
    )
}

export default TeacherTestAddPage
