import axios from 'axios'
import React, { useEffect, useState } from 'react'



const InstituteTeacherList = () => {

    const [TableItems, setTableItems] = useState([])

    useEffect(() => {
        axios
            .post("https://test-serverrr.herokuapp.com/allteachers", {
                inst_name: "QWE",
            })
            .then((res) => {
                console.log(res.data.rows)
                let t = []
                res.data.rows.forEach((element, index) => {
                    t.push(<Row sno={index} name={element[0]["value"]} subject={element[1]["value"]}/>)
                });
                setTableItems(t)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Row sno="sno" name="name" subject="subject"/>
            {TableItems}
        </div>
    )
}

const Row = ({sno, name, subject}) => {
    return(
        <div style={{display: 'flex' , marginLeft: '20px', marginRight: '20px'}}>
            <div style={{ width:'20%', border: '2px solid black', backgroundColor: 'white'}}>{sno}</div>
            <div style={{ width:'40%', border: '2px solid black', backgroundColor: 'white'}}>{name}</div>
            <div style={{ width:'40%', border: '2px solid black', backgroundColor: 'white'}}>{subject}</div>
        </div>
    )
}

export default InstituteTeacherList
