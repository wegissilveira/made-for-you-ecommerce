import React from 'react'

import classes from './Footer.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const footer = props => {

    return (
        <div className={classes.Session_container}>
            <div className={classes.Footer_container}>
                <div className="
                        container-fluid 
                        p-0 
                        m-0 
                        row 
                        d-flex 
                        justify-content-between 
                        border-bottom
                    "
                >
                    <div className="col-3 pl-0">
                        <h3>MENU</h3>
                        <div className={`mt-4 ${classes.Footer_menu}`}>
                            <ul>
                                <li>Shop</li>
                                <li>Features</li>
                                <li>Sales</li>
                                <li>Contacts</li>
                            </ul>
                            <ul>
                                <li>Help</li>
                                <li>Shipping</li>
                                <li>Privacy Police</li>
                                <li>FAQs</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-5 d-flex flex-column align-items-center">
                        <h3>CONTACTS</h3>
                        <div className="mt-4">
                            <p>hello@myhome.com</p>
                            <p>+375 29 364-74-69</p>
                        </div>
                    </div>
                    <div className="col-3 pr-0 d-flex flex-column align-items-end">
                        <h3>STAY SOCIAL</h3>
                        <div className={`mt-4 ${classes.Footer_staySocial_icons}`}>
                            <FontAwesomeIcon icon={['fab', 'twitter']} />
                            <FontAwesomeIcon icon={['fab', 'vk']} />
                            <FontAwesomeIcon icon={['fab', 'instagram']} />
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                        </div>
                        <div className="mt-3">
                            <p>We Work All The Holidays</p>
                        </div>
                    </div>
                </div>
                <div className={`mt-4 ${classes.SubFooter}`}>
                    <p>Copyright &#169; All Rights Reserved</p>
                    <div className={classes.Footer_cards_icons}>
                        <FontAwesomeIcon icon={['fab', 'cc-mastercard']} size="4x" />
                        <FontAwesomeIcon icon={['fab', 'cc-visa']} size="4x" />
                        <FontAwesomeIcon icon={['fab', 'cc-paypal']} size="4x" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default footer