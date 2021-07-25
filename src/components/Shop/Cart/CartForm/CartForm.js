import React from 'react'

import classes from './CartForm.module.css'


const CartForm = props => {
    return (
        <div className={classes.Form_cart_container}>
            <div>
                <p>COUPON DISCOUNT</p>
                <p>Enter your coupon code if you have one</p>
                <input placeholder="Enter your code"/>
                <p className={classes.Cart_light_button}>APPLY COUPON</p>
            </div>
            <div>
                <p>CALCULATE SHIPPING</p>
                <select>
                    <option>Argentina</option>
                    <option>Brazil</option>
                    <option>Germany</option>
                    <option>United States</option>
                </select>
                <input placeholder="State/Country" />
                <input placeholder="Town/City" />
                <input placeholder="Postcode/ZIP" />
                <p className={classes.Cart_light_button}>UPDATE</p>
            </div>
            <div>
                <div>
                    <div className={classes.Form_cart_price_container}>
                        <div>
                            <p>SUBTOTAL</p>
                            <p>$ {props.finalPrice.toFixed(2)}</p>
                        </div>
                        <div>
                            <p>SHIPPING</p>
                            <p>$ 20.00</p>
                        </div>
                        <div>
                            <p>TOTAL</p>
                            <p>$ 40.00</p>
                        </div>
                    </div>
                </div>
                <p className={classes.Cart_dark_button}>PROCEED TO CHECKOUT</p>
            </div>
        </div>
    )
}

export default CartForm