import React, {useState} from 'react';
import "./styles/Login.css";
import {Link, useHistory} from "react-router-dom";
import {auth} from "../firebase";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()

    const signIn = (e) => {
        e.preventDefault();
        // console.log('DONE')
        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            // console.log("DONE LOGIN", auth);
            if(auth) {
                history.push('/');
            }
        }).catch(error => alert(error.message))

    }

    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            // console.log("DONE REGISTER", auth);
            if(auth) {
                history.push('/');
            }
        }).catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt=""/>
            </Link>

            <div className="login__container">
                <h1>Sign In</h1>

                <form action="">
                    <h5>Email</h5>
                    <input type="email"  value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password"  value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type="submit" className="login__signInButton" onClick={signIn}>Sign In</button>
                </form>


                <p>
                    By signing-in you agree to the AMAZON ROKAS App Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button className="login__registerButton" onClick={register}>Create your Amazon account</button>

            </div>
        </div>
    );
};

export default Login;
