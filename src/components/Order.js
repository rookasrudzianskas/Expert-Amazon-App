import React from 'react';
import "./styles/Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";

const Order = ({ order }) => {


    return (
        <div className="order">
            <h2>Order</h2>
            {/* format date to beutiful one*/}
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>

            <p className="order__id">
                <small>{order.id}</small>
            </p>

            {order.data.basket?.map(item => (
                <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}

        </div>
    );
};

export default Order;
