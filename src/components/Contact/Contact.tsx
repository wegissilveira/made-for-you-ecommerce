import classes from './Contact.module.css'
import ContactsForm from './ContactsForm/ContactsForm'
import ContactsInfo from './ContactsInfo/ContactsInfo'


const Contact = () => {
   return (
      <div className={classes.Session_container}>
         <div className={classes.Contact_box_container}>
            <ContactsInfo />
            <ContactsForm />
         </div>
      </div>
   )
}

export default Contact