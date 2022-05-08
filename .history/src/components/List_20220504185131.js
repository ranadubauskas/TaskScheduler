import React, {useState} from 'react';
import Item from './Item';
import DatePicker from 'react-date-picker';
import { v4 as uuidv4 } from 'uuid';
import {doc, setDoc } from "firebase/firestore";
import {db} from '../database';




function List() {
    let [title, setTitle] = useState(""); 
    let [todo, setTodo]=useState([]); //default value for todo list is an empty array
    const [date, setDate]=useState(new Date());
    const collectionName="tasks";

    function onSubmit(){
        const obj={id: uuidv4(), title: title, date:date}
        //creates new list tha adds what was previous in todo and add a new object to our list
        setTodo([...todo, obj])  // key=date, value=date variable (that we called when we did [date, setDate] updating todo list with whatever used to be in todo list and a new object/item
        setDoc(doc(db, collectionName, obj.id,) obj);
        setTitle("");
        setDate(new Date());
        
    }

    function removeItem(data) {
       const result = todo.filter((item) => item.id !== data.id )
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
            <Item key={data.id} itemData={data} removeItem={removeItem}/> //notice a function can be passed into the child as a prop
            ))}
        </div>
        </div>
    );
}

export default List;

