import React, {useState} from 'react';
import "./styles/Payment.css";
import {useStateValue} from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import {Link} from "react-router-dom";
import {useElements, useStripe, CardElement} from "@stripe/react-stripe-js";
import {Card} from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "../reducer";

const Payment = () => {

    const [{user, basket}, dispatch] = useStateValue();
    // states to describe button state
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    // disabled button state
    const [error, setError] = useState(null);

    // button error if something goes wrong
    const [disabled, setDisabled] = useState(null);

    // stripe payment processing in here
    const stripe = useStripe();
    const elements = useElements();

    // then the form is submitted
    const handleSubmit = async(event) => {
        // do tall the fancy stripe things
        event.preventDefault();


    }

    const handleChange = (event) => {
    // listen for the changes in the cardelement
    //     and display any errors as the customer types their card details
    //    if it is empty make the button disabled
        setDisabled(event.empty);
        // if there is an error, show the error message, otherwise, nothing
        setError(event.error ? event.error.message : "");
    }


    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    {/*redirects to the checkout page if wants to take a look what is in it too*/}
                    Checkout (<Link className="payment__link" to="/checkout">{basket?.length > 1 ? `${basket?.length} items 🛍️` : `${basket?.length} item 🛍️`}</Link>)
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
                        <h3 className="payment_reviewAndDelivery">Review items </h3>
                        <h3>and delivery</h3>

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
                        <form action="" onSubmit={handleSubmit}>
                            {/* every time I change the card element, the handlechange is going to be fired*/}
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceContainer">
                                {/* we form the final sum of money */}
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                     // value comes from the reducer
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    {/* if processing, it is going to say that the order is processing*/}
                                    <span>{processing ? <p>Processing</p> :
                                    "Buy Now"
                                    }</span>
                                </button>
                            </div>

                        {/*    errors   */}
                            {error && <div>{error}</div>}

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Payment;
