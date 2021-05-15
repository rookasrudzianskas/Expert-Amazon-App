import React from 'react';
import "./styles/Payment.css";
import {useStateValue} from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import {Link} from "react-router-dom";

const Payment = () => {

    const [{user, basket}, dispatch] = useStateValue();

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    {/*redirects to the checkout page if wants to take a look what is in it too*/}
                    Checkout (<Link to="/checkout">{basket?.length > 1 ? `${basket?.length} items` : `${basket?.length} item`}</Link>)
                </h1>
            {/*    payment section  */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>

                    <div className="payment__address">
                        <p>Email: {user?.email} 📧</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
            {/*    payment setcion reviewing items  */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                    {/*    all the products goes here   */}
                    {/*     we dispaly for each item in the absket, the checkout product component with props from it*/}
                        {basket.map(item => (
                            // props come from the data layer basket
                            <CheckoutProduct id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />
                        ))}
                    </div>
                </div>
            {/*    payment section, payment method  */}

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                    {/*    Stripe is going to go here*/}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Payment;
