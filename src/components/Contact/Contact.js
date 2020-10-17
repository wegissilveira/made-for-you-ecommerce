import React from 'react'

import classes from './Contact.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Contact = props => {

    return (
        <div className={classes.Session_container}>
            <div className={classes.Contact_box_container}>
                <div className={`row ${classes.Contact_box}`}>
                    <div className={`col-5 ${classes.Contact_box_info}`}>
                        <div className={classes.Contact_box_info_sub}>
                            <h4>Get in Touch</h4>
                            <p>Feel free to contact us about our services or any questions you may heve. We will get back to you as soon as possible.</p>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon="envelope" size="2x" style={{color:'grey'}}/>
                                <p className="ml-3 mb-0">+375 29 364-74-69</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon="phone-alt" size="2x" style={{color:'grey'}}/>
                                <p className="ml-3 mb-0">hello@myhome.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className={classes.Contact_box_form_sub}>
                            <h4>Send us a message</h4>
                            <div className="d-flex justify-content-between">
                                <input placeholder="First name"/>
                                <input placeholder="Last name"/>
                            </div>
                            <input placeholder="Email" />
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