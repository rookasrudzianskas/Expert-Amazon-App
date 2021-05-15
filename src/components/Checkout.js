import React from 'react';
import "./styles/Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import {useStateValue} from "../StateProvider";
import Product from "./Product";

const Checkout = () => {

    const [{basket, user}, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                />

                <div>
                    <h4>Hello, {user ? user?.email : "Guest"} 🚀</h4>
                    <h2 className="checkout__title">
                        Your shopping basket
                    </h2>

                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            rating={item.rating}
                            image={item.image}
                        />
                    ))}

                {/*    Basket Item */}
                {/*    Basket Item */}
                {/*    Basket Item */}
                {/*    Basket Item */}
                {/*    Basket Item */}
                {/*    Basket Item */}
                </div>
            </div>

            <div className="checkout__right">
            {/*    Subtotal */}
                <Subtotal />
            </div>
        </div>
    );
};

export default Checkout;
