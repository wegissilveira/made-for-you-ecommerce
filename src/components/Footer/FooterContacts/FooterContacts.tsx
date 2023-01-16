import classes from './FooterContacts.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const FooterContacts = () => {
   return (
      <>
         <div className={classes['Contacts--wrapper']}>
            <h3>CONTACTS</h3>
            <div>
               <p>hello@myhome.com</p>
               <p>+375 29 364-74-69</p>
            </div>
         </div>
         <div className={classes['Contacts-social--wrapper']}>
            <h3>STAY SOCIAL</h3>
            <div className={classes.Footer_staySocial_icons}>
               <FontAwesomeIcon icon={['fab', 'twitter']} />
               <FontAwesomeIcon icon={['fab', 'vk']} />
               <FontAwesomeIcon icon={['fab', 'instagram']} />
               <FontAwesomeIcon icon={['fab', 'facebook-f']} />
            </div>
            <div>
               <p>We Work All The Holidays</p>
            </div>
         </div>
      </>
   )
}

export default FooterContacts