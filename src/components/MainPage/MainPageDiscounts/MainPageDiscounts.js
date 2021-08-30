import React from 'react'

import classes from './MainPageDiscounts.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const mainPageDiscounts = props => {

    return (
        <div className={classes.Session_container}>
            <div className={classes.Discounts_container}>
                <div>
                    <div>
                        <h1>DISCOUNTS AND SALES</h1>
                        <h1>DISCOUNTS</h1>
                        <h1>AND SALES</h1>
                        <p>
                            Follow our promotions and discounts. We constantly update them so you can buy your
                            favorite home products at the best prices. And every monday a random discount on
                            certain products. Hurry up to buy at an attractive price.
                        </p>
                    </div>
                    <img src={require('../../../assets/images/Discounts/quadro-3.png')} alt="discount-img" />
                </div>
                <div>
                    <img src={require('../../../assets/images/Discounts/quadro-2.png')} alt="discount-img" />
                    <div>
                        <div>
                            <h3>NEWSLETTER</h3>
                            <p>
                                Stay updated on all that's new noteworthy. Join our list
                                and get 15% off your first purchase!
                            </p>
                            <input type="text" placeholder="Email Address" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.Discounts_icons_container}>
                <div>
                    <FontAwesomeIcon 
                        icon="plane" 
                        size="3x" 
                        className={classes.Plane_icon}
                    />
                    <h6>FAST DELIVERY</h6>
                    <p>Same day delivery as soon as possible</p>
                </div>
                <div>
                    <FontAwesomeIcon 
                        icon="gift" 
                        size="3x"
                    />
                    <h6>SPECIAL DISCOUNT</h6>
                    <p>Get attractive offers day by day</p>
                </div>
                <div>
                    <FontAwesomeIcon 
                        icon="award" 
                        size="3x"
                    />
                    <h6>MONEY RETURNS</h6>
                    <p>100% Money back guarantee</p>
                </div>
                <div>
                    <FontAwesomeIcon 
                        icon="trophy" 
                        size="3x"
                    />
                    <h6>HIGH QUALITY</h6>
                    <p>Control at all stages of manufacturing</p>
                </div>
            </div>
        </div>
    )
}

export default mainPageDiscounts