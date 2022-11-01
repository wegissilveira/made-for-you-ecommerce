import React from 'react'

import classes from './Footer.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FooterMenu from './FooterMenu/FooterMenu'
import FooterContacts from './FooterContacts/FooterContacts'
import FooterBottom from './FooterBottom/FooterBottom'

const footer = props => {

   return (
      <div className={classes.Session_container}>
         <div className={classes.Footer_container}>
            <div>
               <FooterMenu />
               <FooterContacts />
            </div>
            <FooterBottom />
         </div>
      </div>
   )
}

export default footer