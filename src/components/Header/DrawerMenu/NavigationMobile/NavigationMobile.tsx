import classes from './NavigationMobile.module.scss'

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
               to={`${process.env.PUBLIC_URL}/`}
               exact
            > Home
            </NavLink>
         </li>
         <li>
            <NavLink
               onClick={toggleMenu}
               to={`${process.env.PUBLIC_URL}/shop/`}
            > Shop
            </NavLink>
         </li>
         <li>
            <NavLink
               onClick={toggleMenu}
               to={`${process.env.PUBLIC_URL}/contact/`}
            > Login
            </NavLink>
         </li>
      </ul>
   )
}

export default NavigationMobile