import React from "react"
import classes from './ContactsInfo.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ContactsInfo = () => {
   return (
      <div className={classes.Contact_box_info}>
         <div>
            <h4>Get in Touch</h4>
            <p>Feel free to contact us about our services or any questions you may have. We will get back to you as soon as possible.</p>
            <div>
               <FontAwesomeIcon
                  icon="envelope"
                  size="2x"
                  style={{ color: 'grey' }}
               />
               <p>+375 29 364-74-69</p>
            </div>
            <div>
               <FontAwesomeIcon
                  icon="phone-alt"
                  size="2x"
                  style={{ color: 'grey' }}
               />
               <p>hello@myhome.com</p>
            </div>
         </div>
      </div>
   )
}

export default ContactsInfo