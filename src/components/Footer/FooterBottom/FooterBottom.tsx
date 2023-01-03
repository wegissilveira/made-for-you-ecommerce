import classes from './FooterBottom.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const FooterBottom = () => {
   return (
      <div className={classes.Footer_bottom}>
         <p>Developed by <a href="https://www.wegis.com.br" target="_blank" rel="noopener noreferrer">Wegis Silveira</a></p>
         <div>
            <FontAwesomeIcon icon={['fab', 'cc-mastercard']} size="3x" />
            <FontAwesomeIcon icon={['fab', 'cc-visa']} size="3x" />
            <FontAwesomeIcon icon={['fab', 'cc-paypal']} size="3x" />
         </div>
      </div>
   )
}

export default FooterBottom