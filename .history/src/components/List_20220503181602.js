import React from 'react';


function List() {
    function createListElement(data){
        return (<p>{data.title}</p>);
    }
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
            <input type="text"/>
            <input type="button" value="Add"/>
            {taskList.map((data) => <p>{data.title}</p>)}
        </div>
        </div>
    );
}

export default List;