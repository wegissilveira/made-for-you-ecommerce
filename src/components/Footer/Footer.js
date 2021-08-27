import React from 'react'

import classes from './Footer.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const footer = props => {

    return (
        <div className={classes.Session_container}>
            <div className={classes.Footer_container}>
                <div>
                    <div>
                        <h3>MENU</h3>
                        <div className={classes.Footer_menu}>
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
                    <div>
                        <h3>CONTACTS</h3>
                        <div>
                            <p>hello@myhome.com</p>
                            <p>+375 29 364-74-69</p>
                        </div>
                    </div>
                    <div>
                        <h3>STAY SOCIAL</h3>
                        <div className={classes.Footer_staySocial_icons}>
                            <FontAwesomeIcon icon={['fab', 'twitter']} />
                            <FontAwesomeIcon icon={['fab', 'vk']} />
                            <FontAwesomeIcon icon={['fab', 'instagram']} />
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                        </div>
                        <div>
                            <p>We Work All The Holidays</p>
                        </div>
                    </div>
                </div>
                <div className={classes.SubFooter}>
                    <p>Developed by <a href="https://www.wegis.com.br" target="_blank" rel="noopener noreferrer">Wegis Silveira</a></p>
                    <div>
                        <FontAwesomeIcon icon={['fab', 'cc-mastercard']} size="3x" />
                        <FontAwesomeIcon icon={['fab', 'cc-visa']} size="3x" />
                        <FontAwesomeIcon icon={['fab', 'cc-paypal']} size="3x" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default footer