import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from '../firebase';

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
        <button onClick={signInWithGoogle}> 
        </button>
    </div>)
}