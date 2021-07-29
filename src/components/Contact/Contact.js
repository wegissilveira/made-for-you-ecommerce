import React from 'react'

import classes from './Contact.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Contact = props => {

    return (
        <div className={classes.Session_container}>
            <div className={classes.Contact_box_container}>
                <div>
                    <div className={classes.Contact_box_info}>
                        <div>
                            <h4>Get in Touch</h4>
                            <p>Feel free to contact us about our services or any questions you may have. We will get back to you as soon as possible.</p>
                            <div>
                                <FontAwesomeIcon 
                                    icon="envelope" 
                                    size="2x" 
                                    style={{color:'grey'}}
                                />
                                <p>+375 29 364-74-69</p>
                            </div>
                            <div>
                                <FontAwesomeIcon 
                                    icon="phone-alt" 
                                    size="2x" 
                                    style={{color:'grey'}}
                                    />
                                <p>hello@myhome.com</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Contact_box_form}>
                        <div>
                            <h4>Send us a message</h4>
                            <div>
                                <input placeholder="First name"/>
                                <input placeholder="Last name"/>
                                <input type='email' placeholder="Email"/>
                            </div>
                            <input type='email' placeholder="Email" />
                            <textarea placeholder="Message"></textarea>
                            <p className={classes.Contact_submit_btn}>Submit</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact