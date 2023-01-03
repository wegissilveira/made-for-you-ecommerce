import classes from './DrawerSocialIcons.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const DrawerSocialIcons = () => {
   return (
      <div className={classes['Drawer-icons--wrapper']}>
         <h6>STAY SOCIAL</h6>
         <div>
            <FontAwesomeIcon icon={['fab', 'twitter']} />
            <FontAwesomeIcon icon={['fab', 'vk']} />
            <FontAwesomeIcon icon={['fab', 'instagram']} />
            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
         </div>
      </div>
   )
}

export default DrawerSocialIcons