import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from '../firebase';

const provider = new GoogleAuthProvider();

const Login = () => {
    const signInWithGoogle = async () => {
        signInwithPopup(auth, provider)
        .then((result)=>{
            const user=result.user;
            console.log(user);
        }
        )
    }
}