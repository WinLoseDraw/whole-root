import React, { useEffect, useState } from 'react'

const ResourceAccessPage = ({resources}) => {

    const [ListItems, setListItems] = useState([])

    useEffect(() => {
        let t = []
        resources.forEach(element => {
            t.push(<li><a href="">{element.placeHolder}</a></li>)
        });
        setListItems(t)
    }, [resources])

    return (
        <div>
            <ol>
                {ListItems}
            </ol>
        </div>
    )
}

export default ResourceAccessPage
