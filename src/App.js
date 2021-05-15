import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import {useEffect} from "react";
import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";
import Payment from "./components/Payment";


function App() {

    const [{}, dispatch] = useStateValue();

    useEffect(() => {
//     is going to run this code once, to attach the listener then the component loads
        auth.onAuthStateChanged(authUser => {

            if(authUser) {
                // the user just logged in or the user was logged in
                dispatch({
                    type: 'SET_USER',
                    user: authUser,
                })
            } else {
                // the user is logged out
                dispatch({
                    type: 'SET_USER',
                    user: null,
                })
            }
            console.log("THE USER IS DONE", authUser);

        })

    }, []);


    return (
    <div className="app">
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/payment">
                    <Header />
                    <Payment />
                </Route>

                <Route path="/checkout">
                    <Header />
                    <Checkout />
                </Route>

                <Route path="/">
                    <Header />
                    <Home />
                    {/* Home */}
                </Route>

            </Switch>
        </Router>
    </div>
  );
}

export default App;
