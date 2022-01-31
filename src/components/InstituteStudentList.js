import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'



const InstituteStudentList = ({auth}) => {

    let navigate = useNavigate()

    const [TableItems, setTableItems] = useState([])
    const [TableData, setTableData] = useState([])

    const [UpdateClick, setUpdateClick] = useState(false)
    const [UpdateIndex, setUpdateIndex] = useState(-1)

    useEffect(() => {
        setUpdateClick(false)
        setUpdateIndex(-1)
    }, [])

    const onDelete = (name) => {
        console.log(name)
    }

    const onUpdate = (index) => {
        setUpdateIndex(index)
        setUpdateClick(true)
    }

    useEffect(() => {
        if (!auth.get.login) {
            navigate("/")
        }

        auth.set({...auth.get, page: "/institute/members/students"})
    }, [])

    useEffect(() => {
        if (UpdateClick){
            navigate("/institute/members/students/update", {state: TableData[UpdateIndex]})
        }
    }, [UpdateClick])

    useEffect(() => {
        axios
            .post("https://test-serverrr.herokuapp.com/allstudents", {
                inst_name: auth.get.institute,
            })
            .then((res) => {
                console.log(res.data.rows)

                let t = []
                let s = []
                res.data.rows.forEach((element, index) => {
                    if (index == res.data.rows.length - 1){
                        t.push(<End sno={index+1} name={element[0]["value"]} _class={element[6]["value"]} onDelete={onDelete} onUpdate={onUpdate} index={index}/>)
                    }else{
                        t.push(<Row sno={index+1} name={element[0]["value"]} _class={element[6]["value"]} onDelete={onDelete} onUpdate={onUpdate} index={index}/>)
                    }
                    s.push({name: element[0]["value"], class: element[6]["value"], section: element[7]["value"], uid: element[4]["value"]})
                });
                setTableItems(t)
                setTableData(s)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display:'flex', flexDirection: 'column', margin:'50px', padding:'20px', backgroundColor:'white', minHeight:'500px', boxShadow:'0px 2px 8px 2px rgba(128, 128, 128, 0.5)'}}>
                <Head />
                {TableItems}
            </div>
        </div>
    )
}

const Row = ({sno, name, _class, onDelete, onUpdate, index}) => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'20%', border: '1px solid black', borderLeft:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{sno}</div>
            <div style={{ width:'36%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{name}</div>
            <div style={{ width:'36%', border: '1px solid black', backgroundColor: 'white', padding:'8px'}}>{_class}</div>
            <div style={{ width:'4%', border: '1px solid black', backgroundColor: 'white', padding:'8px', display:'flex', justifyContent:'center'}}><button onClick={(e)=>{onDelete(name)}}>X</button></div>
            <div style={{ width:'4%', border: '1px solid black', borderRight:'2px solid black', backgroundColor: 'white', padding:'8px', display:'flex', justifyContent:'center'}}><button onClick={(e)=>{onUpdate(index)}}>&uarr;</button></div>
        </div>
    )
}

const End = ({sno, name, _class, onDelete, onUpdate, index}) => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'20%', border: '1px solid black', borderLeft:'2px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{sno}</div>
            <div style={{ width:'36%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{name}</div>
            <div style={{ width:'36%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px'}}>{_class}</div>
            <div style={{ width:'4%', border: '1px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px', display:'flex', justifyContent:'center'}}><button onClick={(e)=>{onDelete(name)}}>X</button></div>
            <div style={{ width:'4%', border: '1px solid black', borderRight:'2px solid black', borderBottom:'2px solid black', backgroundColor: 'white', padding:'8px', display:'flex', justifyContent:'center'}}><button onClick={(e)=>{onUpdate(index)}}>&uarr;</button></div>
        </div>
    )
}

const Head = () => {
    return(
        <div style={{display: 'flex'}}>
            <div style={{ width:'20%', border: '1px solid black', borderTop:'2px solid black', borderLeft:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Sno</div>
            <div style={{ width:'36%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Name</div>
            <div style={{ width:'36%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px'}}>Class</div>
            <div style={{ width:'4%', border: '1px solid black', borderTop:'2px solid black', backgroundColor: 'white', padding:'8px', fontSize:'0.7em'}}>Delete</div>
            <div style={{ width:'4%', border: '1px solid black', borderTop:'2px solid black', borderRight:'2px solid black', backgroundColor: 'white', padding:'8px', fontSize:'0.7em'}}>Update</div>
        </div>
    )
}

export default InstituteStudentList
