import React from 'react'
import classes from './NavigationMobile.module.css'

import { NavLink } from 'react-router-dom'


type Props = {
   toggleMenu: () => void
}

const NavigationMobile = (props: Props) => {
   const {
      toggleMenu
   } = props


   return (
      <ul className={classes.Navigation_mobile_list} >
         <li>
            <NavLink
               onClick={toggleMenu}
               to="/"
               exact
            > Home
            </NavLink>
         </li>
         <li>
            <NavLink
               onClick={toggleMenu}
               to="/shop/"
            > Shop
            </NavLink>
         </li>
         <li>
            <NavLink
               onClick={toggleMenu}
               to="/user-login/"
            > Login
            </NavLink>
         </li>
      </ul>
   )
}

export default NavigationMobile