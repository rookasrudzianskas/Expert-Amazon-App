import React from 'react';
import "./styles/CheckoutProduct.css";
import {useStateValue} from "../StateProvider";

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {

    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
    //        remove the item from the basket
        console.log("fired")
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        })
    };

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt=""/>

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <div className="checkoutProduct__rating">
                    {/* star rating, map per all the array elelemts, and attach the required stars*/}
                    {Array(rating).fill().map((_, i) => (
                        <p>⭐</p>
                        ))}

                </div>
                {/* if the button is not hidden, so render it here*/}
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )}


            </div>
        </div>
    );
};

export default CheckoutProduct;
