import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getInstitute } from '../App'



const InstituteStudentList = () => {

    const [TableItems, setTableItems] = useState([])

    useEffect(() => {
        axios
            .post("https://test-serverrr.herokuapp.com/allstudents", {
                inst_name: getInstitute(),
            })
            .then((res) => {
                console.log(res.data.rows)

                let t = []
                res.data.rows.forEach((element, index) => {
                    t.push(<Row sno={index} name={element[0]["value"]} _class={element[6]["value"]}/>)
                });
                setTableItems(t)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Row sno="sno" name="name" _class="class"/>
            {TableItems}
        </div>
    )
}

const Row = ({sno, name, _class, section}) => {
    return(
        <div style={{display: 'flex' , marginLeft: '20px', marginRight: '20px'}}>
            <div style={{ width:'20%', border: '2px solid black', backgroundColor: 'white'}}>{sno}</div>
            <div style={{ width:'40%', border: '2px solid black', backgroundColor: 'white'}}>{name}</div>
            <div style={{ width:'40%', border: '2px solid black', backgroundColor: 'white'}}>{_class}</div>
        </div>
    )
}

export default InstituteStudentList
