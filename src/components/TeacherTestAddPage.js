import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'

const TeacherTestAddPage = ({auth}) => {
    const [Tests, setTests] = useState([
        {name: 'UT1'},
        {name:'UT2'},
        {name: 'Final'}
    ])

    const [GridItems, setGridItems] = useState([])
    const [OnAdd, setOnAdd] = useState(false)
    

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
            <AddCard setOnAdd={setOnAdd} />
            {OnAdd && <AddForm setOnAdd={setOnAdd}/>}
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
        // console.log(name)
        // console.log(auth.get.institute)
        // axios.post('https://test-serverrr.herokuapp.com/makechapter', {
        //     chap_name: name,
        //     subj_name: FormDetails.name,
        //     inst_name: auth.get.institute
        // }).then((res) => {
        //     console.log(res.data)
        //     alert('success')
        // }).catch(err=>{
        //     alert(err)
        // })
    }

    return(
        <div className="addFormContainer" >
            <div className="addForm" style={{justifyContent:'center'}}>
                <label>Name</label>
                <input type="name" value={FormDetails.name} onChange={e=>{setFormDetails({...FormDetails, name: e.target.value})}} style={{marginBottom:'20px'}}/>
                <button type="button" onClick={onSubmit}>Submit</button>
                <button type="button" onClick={()=>setOnAdd(false)}>Back</button>
            </div>
        </div>
    )
}


export default TeacherTestAddPage
