import React from 'react';
import "./styles/Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {


    return (
        <div className="order">
            <h2>Order</h2>
            {/* format date to beutiful one*/}
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>

            <p className="order__id">
                <small>Order ID: {order.id}</small>
            </p>

            {/* for each order item, shows the checkout product component*/}
            {/*hideBUtton is to make te button not to pass*/}
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

            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

        </div>
    );
};

export default Order;
