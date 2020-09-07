import React from 'react'

import './Contact.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Contact = props => {

    return (
        <div className="session-container contact-session-container">
            <div className="contact-box-container">
                <div className="contact-box row">
                    <div className="contact-box-info col-5">
                        <div className="contact-box-info-sub">
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
                        <div className="contact-box-form-sub">
                            <h4>Send us a message</h4>
                            <div className="d-flex justify-content-between">
                                <input placeholder="First name"/>
                                <input placeholder="Last name"/>
                            </div>
                            <input placeholder="Email" />
                            <textarea placeholder="Message"></textarea>
                            <p className="contact-submit-btn">Submit</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact