import React, {useEffect, useState} from 'react';
import "./styles/Orders.css";
import db from "../firebase";
import {useStateValue} from "../StateProvider";

const Orders = () => {

    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);


    useEffect(() => {
    //        will run once, then the orders run
        db.collection("users").doc(user?.uid).collection("orders").orderBy('created', 'desc').onSnapshot(snapshot => {
           setOrders(snapshot.docs.map(doc => ({
               id: doc.id,
               data: doc.data(),
           })))
        });
    }, []);

    return (
        <div className="orders">
            <h1>Your orders</h1>
        </div>
    );
};

export default Orders;
