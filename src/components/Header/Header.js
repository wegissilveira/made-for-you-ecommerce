import React, { useState } from 'react'

import classes from './Header.module.css'
import './Header.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from 'react-redux'

import NavigationMobile from './NavigationMobile/NavigationMobile'
import NavigationDesk from './NavigationDesk/NavigationDesk'
import HeaderLogo from './HeaderLogo/HeaderLogo'
import HeaderUserOptions from './HeaderUserOptions/HeaderUserOptions'


const Header = props => {
   const {
      cart,
      wish
   } = props

   const [translateMenuValue, setTranslateMenuValue] = useState(-100)

   const mobileMenuHandler = () => {
      const body = document.getElementsByTagName('BODY')[0]

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
            <HeaderUserOptions
               cart={cart}
               wish={wish}
            />
         </div>
         <FontAwesomeIcon
            onClick={mobileMenuHandler}
            className={classes.Menu_hamburger}
            icon="bars" color="grey" size="2x"
         />
         <NavigationMobile
            toggleMenu={mobileMenuHandler}
            translateValue={translateMenuValue}
         />
      </nav>
   )
}

const mapStateToProps = state => {
   return {
      wish: state.wishlistState,
      cart: state.cartListState
   }
}


export default connect(mapStateToProps)(Header)