import React, {useEffect, useState} from 'react';
import "./styles/Orders.css";
import db from "../firebase";
import {useStateValue} from "../StateProvider";
import Order from "./Order";

const Orders = () => {

    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    console.log(orders);
    //if we use outside variable we have to put it into the brackets in the useEffect dependencies

    useEffect(() => {
        if(user) {
    //        will run once, then the orders run
    //     going to users, getting specific user, accessging that particulat users collection orders, we order by date, take snapshot,
    //    which is mapping throug all the orders, and setting all the data to the orders collection
    //    get the id and store in the id, get all the data and store to the data
        db.collection("users").doc(user?.uid).collection("orders").orderBy('created', 'desc').onSnapshot(snapshot => {
           setOrders(snapshot.docs.map(doc => ({
               id: doc.id,
               data: doc.data(),
           })))
        });
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <div className="orders">
            <h1>Your orders, {user.email}</h1>

            <div className="orders__order">
                {/* we go per all the orders and output followign for each one of them*/}
                    {orders?.map(order => (
                        <Order order={order} />
                    ))}
            </div>
        </div>
    );
};

export default Orders;
