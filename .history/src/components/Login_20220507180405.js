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
        <button value="Log in" ßonClick={signInWithGoogle}> 
        </button>
    </div>)
}