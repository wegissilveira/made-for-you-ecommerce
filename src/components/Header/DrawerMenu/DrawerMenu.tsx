import classes from './DrawerMenu.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import NavigationMobile from './NavigationMobile/NavigationMobile'
import ContactsDrawerMobile from './ContactsDrawerMobile/ContactsDrawerMobile'
import DrawerSocialIcons from './DrawerSocialIcons/DrawerSocialIcons'


type Props = {
   toggleMenu: () => void
   translateValue: number
}

const DrawerMenu = (props: Props) => {
   const {
      toggleMenu,
      translateValue
   } = props

   const translateMenu = {
      transform: `translateX(${translateValue}%)`,
      transition: '.8s ease-in-out'
   }

   return (
      <div
         className={classes.Navigation_mobile_container}
         style={translateMenu}
      >
         <FontAwesomeIcon
            onClick={toggleMenu}
            icon="times" size="2x"
         />
         <NavigationMobile toggleMenu={toggleMenu} />
         <ContactsDrawerMobile toggleMenu={toggleMenu} />
         <DrawerSocialIcons />
      </div>
   )
}

export default DrawerMenu