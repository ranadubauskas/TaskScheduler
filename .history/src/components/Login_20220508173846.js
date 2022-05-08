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
        <button className="login" value="Log in" onClick={signInWithGoogle}> 
        Log in
        </button>
    </div>)
}