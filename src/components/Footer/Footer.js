import React from 'react'

import './Footer.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const footer = props => {

    return (
        <div className="session-container">
            <div className="footer-container">
                <div className="container-fluid p-0 m-0 row d-flex justify-content-between border-bottom">
                    <div className="col-3 pl-0">
                        <h3>MENU</h3>
                        <div className="footer-menu d-flex justify-content-between mt-4">
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
                        <div className="footer-staysocial-icons mt-4 d-flex justify-content-between">
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
                <div className="subfooter mt-4 d-flex justify-content-between align-items-center">
                    <p>Copyright &#169; All Rights Reserved</p>
                    <div className="footer-cards-icons">
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