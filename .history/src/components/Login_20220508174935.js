import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from '../database';

const provider = new GoogleAuthProvider();

export default function Login() {
    async function signInWithGoogle() {
        signInWithPopup(auth, provider)
        .then((result)=>{
            const user=result.user;
            console.log(user);
        }
        )
    }

    return (<div>
        <h1 className="title">
            To-Do List 
        </h1>
        <button className="btn" value="Log in" onClick={signInWithGoogle}> 
        Click here to log in
        </button>
    </div>)
}