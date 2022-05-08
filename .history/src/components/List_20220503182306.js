import React, {useState} from 'react';



function List() {
    let [title, setTitle] = useState("");
    let taskList=[
        {
            title: "task1",
        },
        {
            title: "task2",
        },
    ];
    return (
        <div>
        <h1>To do List</h1> 
        <div className="inputs">
            <input type="text" value={title} onChange={(event)=> setTitle(event.target.value)}/>
            <input type="button" value="Add"/>
            {taskList.map((data) => <p>{data.title}</p>)}
        </div>
        </div>
    );
}

export default List;