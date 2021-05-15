import React, {useState} from 'react';
import "./styles/Product.css";
import {useStateValue} from "../StateProvider";
import { forwardRef } from 'react';
import FlipMove from 'react-flip-move';

const Product = forwardRef(({ id, title, image, price, rating}, ref) => {
    // accessing the data layer
    const [{basket}, dispatch] = useStateValue();

    // console.log('this is basket >>>>>>>', basket);

    const addToBasket = () => {
        // dispatching the action to the data layer, shooting all the data, and the action type to it
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div  ref={ref} className="product">
            <div className="product__info">
                <p>{ title }</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{ price }</strong>
                </p>
                <div className="product__rating">
                    {/* create the array with nothing from items, which are in the array*/}
                    {/* fill with the null values, and then map per each one, and change to the star*/}
                    {Array(rating).fill().map((_, i) => (
                        <p>⭐</p>
                        ))}
                </div>
            </div>
            <img src={image} alt=""/>

            <button onClick={addToBasket}>Add To Basket</button>
        </div>
    );
});

export default Product;
