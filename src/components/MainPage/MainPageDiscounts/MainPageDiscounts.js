import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './MainPageDiscounts.css'

const mainPageDiscounts = props => {

    return (
        <div className="session-container">
            <div className="d-flex justify-content-center discounts-container">
                <div className="discounts-quadros-container-1 pr-3 d-flex flex-column justify-content-between">
                    <div>
                        <h1>DISCOUNTS</h1>
                        <h1>AND SALES</h1>
                        <p>Follow our promotions and discounts. We constantly update them so you can buy your</p>
                        <p>favorite home products at the best prices. And every monday a random discount on</p>
                        <p>certain products. Hurry up to buy at an attractive price.</p>
                    </div>
                    <img src={require('../../../assets/images/Discounts/quadro-3.png')} alt="discount-img" />
                </div>
                <div className="discounts-quadros-container-2 pl-3 d-flex flex-column justify-content-between">
                    <img src={require('../../../assets/images/Discounts/quadro-2.png')} alt="discount-img" />
                    <div className="border">
                        <div className="p-5">
                            <h3 className="mb-4">NEWSLETTER</h3>
                            <p>Stay updated on all that's new noteworthy. Join our list</p>
                            <p>and get 15% off your first purchase!</p>
                            <input type="text" placeholder="Email Address" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between discount-icons-container">
                <div className="discounts-icons d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon="plane" size="3x" className="plane-icon"/>
                    <h6>FAST DELIVERY</h6>
                    <p>Same day delivery as soon as possible</p>
                </div>
                <div className="discounts-icons d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon="gift" size="3x"/>
                    <h6>SPECIAL DISCOUNT</h6>
                    <p>Get attractive offers day by day</p>
                </div>
                <div className="discounts-icons d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon="award" size="3x"/>
                    <h6>MONEY RETURNS</h6>
                    <p>100% Money back guarantee</p>
                </div>
                <div className="discounts-icons d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon="trophy" size="3x"/>
                    <h6>HIGH QUALITY</h6>
                    <p>Control at all stages of manufacturing</p>
                </div>
            </div>
        </div>
    )
}

export default mainPageDiscounts