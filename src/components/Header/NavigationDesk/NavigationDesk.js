import React from "react"
import classes from './NavigationDesk.module.css'

import { NavLink } from 'react-router-dom'

const NavigationDesk = () => {
   return (
      <div className={classes['Navigation-desk--container']}>
         <ul>
            <li >
               <NavLink
                  to="/"
                  exact
               > Home
               </NavLink>
            </li>
            <li >
               <NavLink
                  to="/shop/"
                  exact
               > Shop
               </NavLink>
            </li>
            <li >
               <NavLink
                  to="/contact/"
                  exact
               > Contacts
               </NavLink>
            </li>
         </ul>
      </div>
   )
}

export default NavigationDesk