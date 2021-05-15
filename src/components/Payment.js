import React, {useEffect, useState} from 'react';
import "./styles/Payment.css";
import {useStateValue} from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import {Link} from "react-router-dom";
import {useElements, useStripe, CardElement} from "@stripe/react-stripe-js";
import {Card} from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "../reducer";
import axios from "../axios";
import {useHistory} from "react-router-dom";
import db from "../firebase";

const Payment = () => {

    const history = useHistory();

    const [{user, basket}, dispatch] = useStateValue();
    // states to describe button state
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    // disabled button state
    const [error, setError] = useState(null);

    // button error if something goes wrong
    const [disabled, setDisabled] = useState(null);

    const [clientSecret, setClientSecret] = useState(true);

    //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    useEffect(() => {
    //    run once then needed in depencencies
    //     then the basket changes
    //    we generate the special stripe secret which allows us to charge the customer, whenewher the basket changes, we have to get the new
    //     secret.
    //    then the basket changes, update the stipe secret which allows us to make the payment

        const getClientSecret = async() => {
        //        we wait till the basket changes, the customer adds something or removes
        //    this creates a payment object, which method is post, and url is something like that, with the sum which is made in the reducer
            const response = await axios({
                method: 'post',
                // stripe expects total in the currencies subunits
                // meaning, 10 eur, 1000 cents, 10$ -> 10000 dollar cents, not in the biggest, but in the smallest
                // stick to the one currency
                // we setup the endpoint, which we are going to call and get the response
                url: `payments/create?total=${getBasketTotal(basket) * 100}`
            //    the response will have the client secret
            });
            // we set the clinet secret of how much he wants to pay in the to the state
            setClientSecret(response.data.clientSecret)
        }
        // firing this function
        getClientSecret();

    }, [basket]);

    console.log("THE SECRET IS >>>>> ", clientSecret);

    //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    // stripe payment processing in here
    const stripe = useStripe();
    const elements = useElements();

    // then the form is submitted
    const handleSubmit = async(event) => {
        // do tall the fancy stripe things
        event.preventDefault();
        // if we click the button, so the state of processing becomes true and the button gets disabled and the name changes to processiging
        setProcessing(true);

        // the payment goes here
        // I have the payment which I want to make per you, for example 50 dollars, so please give me the payment secret

        // this makes the payment
        // this waits for the user to get the clientSecret, and forms the payment, with secret and takes the object, with payment method
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                // payment method gets card, which is from the card element straight
                //elements from useElements
                // this clientsecret lets the stripe to know how much to charge the customer
                card: elements.getElement(CardElement)
            }
        //    after the response comes back, we do the job, important to desctructure it
        //    the paymentIntent is the payment confirmation which comes back
        }).then(({ paymentIntent }) => {
        //    payment intent = payment confirmation
        //    if everything was good
        //    everything went well,  transaction succeeded
        // going to the users collection, then to the specific users collection orders and then to the payment intent, to get what is in it
        //    to the payment intent id, the smae as the order id, to get the specific order
        //    we upload the order to the firebase
            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent?.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            })

            setSucceeded(true);
            // there was no error
            setError(null);
            // there will be nothing processing anymore
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET',
            })
            // redirect to the orders page, wehre the orders show up, after successful payment
            history.replace('/orders');

        });

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
