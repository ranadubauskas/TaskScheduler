import React, {useState, useEffect} from 'react';
import Item from './Item';
import DatePicker from 'react-date-picker';
import { v4 as uuidv4 } from 'uuid';
import {doc, setDoc } from "firebase/firestore";
import {db, auth} from '../database';
import { collection, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import {signOut} from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

 
const WORKER_LINK = 'https://us-central1-automation-nk.cloudfunctions.net/ical?url=';

function List() {
    const [user] = useAuthState(auth);
    let [title, setTitle] = useState(""); 
    let [todo, setTodo]=useState([]); //default value for todo list is an empty array
    let [open, setOpen]=useState(false);
    let [link, setLink]=useState("");
    const [date, setDate]=useState(new Date());
    const collectionName = `users/${user.uid}`;
   
    //^going to users and then getting a unique id and then creating a new collction that contains tasks
    
    
    


    function onSubmit(){
        const newObj={id: uuidv4(), title: title, date:date};
        //creates new list that adds what was previous in todo and add a new object to our list
        setDoc(doc(db, collectionName, newObj.id), newObj);
        setTodo([...todo, newObj])  // key=date, value=date variable (that we called when we did [date, setDate] updating todo list with whatever used to be in todo list and a new object/item
        //setDoc(doc(name of database, name of collection, unique identifier), actual thing that you are adding to database)
        setTitle("");
        setDate(new Date());
    }

    useEffect(() => {
        console.log("hello");
        let newArr = [];
        getDocs(collection(db, collectionName)).then((tasks)=> {   
            tasks.forEach((task) => {
                newArr.push({
                    title: task.data().title,
                    date: new Date(task.data().date.seconds * 1000),
                    id: task.data().id
                })
            });
            setTodo(newArr);
        });
        //accessing the link data, in db, in users collection, based on users uid
        getDoc(collection(db, "users", user.uid)).then((user) => {
            setLink(user.data().calendarurl);
        });
           
    }, []) //when passing empty array in second parameter value, it only calls the function in the first parameter when the page is first loaded

    function removeItem(data) {
       //must remove it from both database and the "todo" array
       const result = todo.filter((item) => item.id !== data.id )
       setTodo(result);
       deleteDoc(doc(db, collectionName, data.id));
    }

    function openModal(){
        setOpen(true);
    }

    async function saveLink() {
        //path to doc is the database which is "db", a new collection called "users" is created, and then the object was added
        //parameter is calendarurl 
        //use await keyword because we are making a request to google to set our doc
        //creates new collection of users identified by their uid, and with the calendarurl parameter
        await setDoc(doc(db, "users", user.uid), {calendarurl: link,})
        setOpen(false);

    }

    async function bsSync() {
        const bsTasks= await fetch(WORKER_LINK+link).then((tasks)=> tasks.json());
        console.log(bsTasks);
        //foreach function in javascript is similar to map function 
        let arr=todo;
        bsTasks.forEach((task)=>{
            const obj={id: uuidv4(), title: task.name, date: new Date(task.time)};
            setDoc(doc(db, collectionName, obj.id), obj);
            arr.push(obj);
        });
        //need to make a copy of the array instead of just adding the array
        setTodo([...arr]);
    }

    return (
        <div>
        <h1 className="title">To-Do List</h1> 
        <marquee> Signed in as: {user.displayName}, Email: {user.email} </marquee>
        <br></br>
        <button onClick={()=>{signOut(auth)}}> Sign Out </button>
        <div className="inputs">
            <input 
            className="searchbar"
            type="text" 
            value={title} 
            onChange={(event)=> setTitle(event.target.value)}/>
            <DatePicker onChange={setDate} value={date}/>
            <input type="button" value="Add" onClick={onSubmit}/>
            <input type="button" value="Get Google Calendar Link" onClick={openModal}/>
            <input type="button" value="Sync Calendar" onClick={bsSync}/>
            {todo.map((data) => (
            <Item key={data.id} itemData={data} removeItem={removeItem}/> //notice a function can be passed into the child as a prop
            ))}
        </div>
        <Modal open={open} onClose={saveLink} center> 
        <h2> Place Brightspace Link Here </h2>
        <input
            type="text"
            value={link}
            onChange={(event)=>setLink(event.target.value)}
        />
        </Modal>
        </div>
    );
}

export default List;

