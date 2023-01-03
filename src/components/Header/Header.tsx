import { useState } from 'react'

import classes from './Header.module.css'
import './Header.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import DrawerMenu from './DrawerMenu/DrawerMenu'
import NavigationDesk from './NavigationDesk/NavigationDesk'
import HeaderLogo from './HeaderLogo/HeaderLogo'
import HeaderUserOptions from './HeaderUserOptions/HeaderUserOptions'


const Header = () => {   
   const [translateMenuValue, setTranslateMenuValue] = useState(-100)

   const mobileMenuHandler = () => {
      const body = document.getElementsByTagName('BODY')[0] as HTMLElement

      if (translateMenuValue === 0) {
         setTranslateMenuValue(-100)
         body.style.overflow = 'scroll'
      } else {
         setTranslateMenuValue(0)
         body.style.overflow = 'hidden'
      }
   }

   return (
      <nav>
         <div className={classes.Navbar_container}>
            <NavigationDesk />
            <HeaderLogo />
            <HeaderUserOptions />
         </div>
         <FontAwesomeIcon
            onClick={mobileMenuHandler}
            className={classes.Menu_hamburger}
            icon="bars" color="grey" size="2x"
         />
         <DrawerMenu
            toggleMenu={mobileMenuHandler}
            translateValue={translateMenuValue}
         />
      </nav>
   )
}

export default Header