import React, {useState, useEffect} from 'react';
import Item from './Item';
import DatePicker from 'react-date-picker';
import { v4 as uuidv4 } from 'uuid';
import {doc, setDoc } from "firebase/firestore";
import {db, auth} from '../database';
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import {signOut} from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
 


function List() {
    const [user] = useAuthState(auth);
    let [title, setTitle] = useState(""); 
    let [todo, setTodo]=useState([]); //default value for todo list is an empty array
    const [date, setDate]=useState(new Date());
    const collectionName="tasks";
    const gapi=window.gapi;
    const CLIENT_ID = '139384443024-emj9pltojt7esk2j8qt2r31tgpffd1i9.apps.googleusercontent.com';
    const API_KEY = "AIzaSyDSjrqAAD8qFGaJ1Llopu5sAho5cAmMyUc";
    const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
    const DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';


    function onSubmit(){
        const obj={id: uuidv4(), title: title, date:date}
        //creates new list tha adds what was previous in todo and add a new object to our list
        setTodo([...todo, obj])  // key=date, value=date variable (that we called when we did [date, setDate] updating todo list with whatever used to be in todo list and a new object/item
        setDoc(doc(db, collectionName, obj.id), obj);
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
    }, []) //when passing empty array in second parameter value, it only calls the function in the first parameter when the page is first loaded

    function removeItem(data) {
       const result = todo.filter((item) => item.id !== data.id )
       setTodo(result);
       deleteDoc(doc(db, collectionName, data.id));
    }

    function addEvent() {
        gapi.load('client:auth2', () => {
            console.log('loaded client')
            gapi.client.init({
                apikey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope:SCOPES,
            })
            gapi.client.load('calender', 'v3', () => console.log('bam'))
            gapi.auth2.getAuthInstance().signIn()
            .then(()=>{
                var event = {
                    'summary': 'Google I/O 2015',
                    'location': '800 Howard St., San Francisco, CA 94103',
                    'description': 'A chance to hear more about Google\'s developer products.',
                    'start': {
                      'dateTime': '2015-05-28T09:00:00-07:00',
                      'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                      'dateTime': '2015-05-28T17:00:00-07:00',
                      'timeZone': 'America/Los_Angeles'
                    },
                    'recurrence': [
                      'RRULE:FREQ=DAILY;COUNT=2'
                    ],
                    'attendees': [
                      {'email': 'lpage@example.com'},
                      {'email': 'sbrin@example.com'}
                    ],
                    'reminders': {
                      'useDefault': false,
                      'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                      ]
                    }
                  };

                  var request=gapi.client.calender.events.insert({
                        'calenderId': 'primary',
                        'resource': event,

                  })
                  request.execute(evet => {
                      window.open(event.htmlLink)
                  })
            })
        } )
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
            <input type="buttom" value="Add to Google Clalender" onClick={addEvent}/>
            {todo.map((data) => (
            <Item key={data.id} itemData={data} removeItem={removeItem}/> //notice a function can be passed into the child as a prop
            ))}
        </div>
        </div>
    );
}

export default List;

