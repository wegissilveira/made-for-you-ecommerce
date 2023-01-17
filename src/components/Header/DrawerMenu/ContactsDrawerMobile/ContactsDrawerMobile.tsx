import classes from './ContactsDrawerMobile.module.scss'

import { NavLink } from 'react-router-dom'

type Props = {
   toggleMenu: () => void
}

const ContactsDrawerMobile = (props: Props) => {
   const {
      toggleMenu
   } = props

   return (
      <div className={classes['Contacts-drawer--wrapper']}>
         <h6>CONTACTS</h6>
         <div>
            <p>hello@myhome.com</p>
            <p>+375 29 364-74-69</p>
            <NavLink
               onClick={toggleMenu}
               to="/contact/"
               exact
            > Form
            </NavLink>
         </div>
      </div>
   )
}

export default ContactsDrawerMobile