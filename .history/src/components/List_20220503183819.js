import React, {useState} from 'react';



function List() {
    let [title, setTitle] = useState("");
    let [todo, setTodo]=useState(taskList);
    let taskList=[
        {
            title: "task1",
        },
        {
            title: "task2",
        },
    ];
    function onSubmit(){
        //creates new list tha adds what was previous in todo and add a new object to our list
        setTodo([...todo, {title: title}])
    }
    return (
        <div>
        <h1>To do List</h1> 
        <div className="inputs">
            <input type="text" value={title} onChange={(event)=> setTitle(event.target.value)}/>
            <input type="button" value="Add" onClick={onSubmit}/>
            {todo.map((data) => <p>{data.title}</p>)}
        </div>
        </div>
    );
}

export default List;