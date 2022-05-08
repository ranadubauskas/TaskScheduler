import React, {useState} from 'react';
import Item from './Item';
import DatePicker from 'react-date-picker';




function List() {
    let [title, setTitle] = useState(""); 
    let [todo, setTodo]=useState([]); //default value for todo list is an empty array
    const [date, setDate]=useState(new Date());
    function onSubmit(){
        //creates new list tha adds what was previous in todo and add a new object to our list
        setTodo([...todo, {title: title, date:date}])  // key=date, value=date variable (that we called when we did [date, setDate] updating todo list with whatever used to be in todo list and a new object/item
        setTitle("")
    }

    function removeItem(data) {
       const result = todo.filter((item) => item.title !== data.title )
       setTodo(result);
    }

    return (
        <div>
        <h1>To do List</h1> 
        <div className="inputs">
            <input 
            type="text" 
            value={title} 
            onChange={(event)=> setTitle(event.target.value)}/>
            <DatePicker onChange={setDate} value={date}/>
            <input type="button" value="Add" onClick={onSubmit}/>
            {todo.map((data) => (
            <Item key={JSON.stringify(data)} itemData={data} removeItem={removeItem}/> //notice a function can be passed into the child as a prop
            ))}
        </div>
        </div>
    );
}

export default List;

