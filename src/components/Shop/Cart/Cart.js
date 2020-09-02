import React from 'react'

import './Cart.css'

import ProductQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'


const Cart = props => {

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
                        <ProductQtde/>
                    </div>
                    
                    <p className="font-weight-bold">$ 37.99</p>
                </div>
                <div>

                </div>
                <div>
                    <div>
                        
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart