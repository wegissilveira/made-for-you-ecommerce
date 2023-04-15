import classes from './NavigationDesk.module.scss'

import { NavLink } from 'react-router-dom'

const NavigationDesk = () => {
   return (
      <div className={classes['Navigation-desk--container']}>
         <ul>
            <li >
               <NavLink
                  to={`${process.env.PUBLIC_URL}/`}
                  exact
               > Home
               </NavLink>
            </li>
            <li >
               <NavLink
                  to={`${process.env.PUBLIC_URL}/shop/`}
                  exact
               > Shop
               </NavLink>
            </li>
            <li >
               <NavLink
                  to={`${process.env.PUBLIC_URL}/contact/`}
                  exact
               > Contacts
               </NavLink>
            </li>
         </ul>
      </div>
   )
}

export default NavigationDesk