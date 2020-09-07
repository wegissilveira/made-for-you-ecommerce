import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Cart.css'

import ProductQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'


const Cart = props => {

    const [qtde, setQtde] = React.useState(1)
    
    
    return (
        <div className="products-container session-container">
            <h1 className="text-center mb-5 mt-5">CART</h1>
            <div className="cart-details-container">
                <div className="d-flex justify-content-between row border-bottom text-secondary font-weight-bold">
                    <p className="col-4">PRODUCT</p>
                    <p className="col-2">DISCOUNT</p>
                    <p className="col-2">PRICE</p>
                    <p className="col-2">QUANTITY</p>
                    <p>TOTAL</p>
                </div>
                <div className="cart-details d-flex justify-content-between align-items-center row mt-3">
                    <div className="col-4 d-flex align-items-center" style={{height: '80px'}}>
                        
                        {/* <img /> */}
                        <div style={{width: '80px', height: '80px', backgroundColor: 'pink', marginRight: '30px'}}></div>

                        <div className="d-flex flex-column justify-content-between mb-1" style={{height: '100%'}}>
                            <p className="font-weight-bold">DOG HOUSE</p>
                            <div className="d-flex" style={{fontSize: '12px'}}>
                                <div className="text-secondary">
                                    <p className="mb-2">Size</p>
                                    <p>Color</p>
                                </div>
                                <div className="ml-3">
                                    <p className="mb-2">100 x 100</p>
                                    <p>Pink</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="font-weight-bold col-2">0%</p>
                    <p className="font-weight-bold col-2">$ 37.99</p>
                    <div className="col-2">
                        <ProductQtde changeQtdeCallBack={qtde => setQtde(qtde)} />
                    </div>
                    
                    <p className="font-weight-bold">$ {qtde * 2}</p>
                </div>
                <div className="d-flex justify-content-between mt-5 border-bottom">
                    <p className="cart-dark-button">
                        <FontAwesomeIcon icon="long-arrow-alt-left" />
                        <span>CONTINUE COMPRANDO</span>
                    </p>
                    <p className="cart-light-button">
                        <FontAwesomeIcon icon="sync-alt" />
                        <span>UPDATE CART</span>
                    </p>
                </div>
                <div className="form-cart-container row mt-4 mr-0 ml-0">
                    <div className="col-4 pl-0 form-cart-first-column">
                        <p>COUPON DISCOUNT</p>
                        <p>Enter your coupon code if you have one</p>
                        <input placeholder="Enter your code"/>
                        <p className="cart-light-button">APPLY COUPON</p>
                    </div>
                    <div className="col-4 form-cart-second-column">
                        <p>CALCULATE SHIPPING</p>
                        <select
                            className="
                                select-cart
                                border-left-0 
                                border-right-0
                                border-top-0
                                border-bottom"
                        >
                            <option>Argentina</option>
                            <option>Brazil</option>
                            <option>Germany</option>
                            <option>United States</option>
                        </select>
                        <input placeholder="State/Country" />
                        <input placeholder="Town/City" />
                        <input placeholder="Postcode/ZIP" />
                        <p className="cart-light-button">UPDATE</p>
                    </div>
                    <div className="col-4 pr-0 form-cart-third-column">
                        <div className="border">
                            <div className="form-cart-total-container">
                                <div className="border-bottom">
                                    <p>SUBTOTAL</p>
                                    <p>$ 20.00</p>
                                </div>
                                <div className="border-bottom">
                                    <p>SHIPPING</p>
                                    <p>$ 20.00</p>
                                </div>
                                <div>
                                    <p>TOTAL</p>
                                    <p>$ 40.00</p>
                                </div>
                            </div>
                        </div>
                        <p className="cart-dark-button" style={{width: '100%'}}>PROCEED TO CHECKOUT</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart