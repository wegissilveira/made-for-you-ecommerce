import React from "react"
import classes from './ContactsForm.module.css'

const ContactsForm = () => {
   return (
      <div className={classes.Contact_box_form}>
         <div>
            <h4>Send us a message</h4>
            <div>
               <input placeholder="First name" />
               <input placeholder="Last name" />
               <input type='email' placeholder="Email" />
            </div>
            <input type='email' placeholder="Email" />
            <textarea placeholder="Message"></textarea>
            <p className={classes.Contact_submit_btn}>Submit</p>
         </div>
      </div>
   )
}

export default ContactsForm