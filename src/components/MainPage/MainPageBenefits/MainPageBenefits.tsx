import classes from './MainPageBenefits.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainPageBenefits = () => {
   return (
      <div className={classes.Discounts_icons_container}>
         <div>
            <FontAwesomeIcon
               icon="plane"
               size="3x"
               className={classes.Plane_icon}
            />
            <h6>FAST DELIVERY</h6>
            <p>Same day delivery as soon as possible</p>
         </div>
         <div>
            <FontAwesomeIcon
               icon="gift"
               size="3x"
            />
            <h6>SPECIAL DISCOUNT</h6>
            <p>Get attractive offers day by day</p>
         </div>
         <div>
            <FontAwesomeIcon
               icon="award"
               size="3x"
            />
            <h6>MONEY RETURNS</h6>
            <p>100% Money back guarantee</p>
         </div>
         <div>
            <FontAwesomeIcon
               icon="trophy"
               size="3x"
            />
            <h6>HIGH QUALITY</h6>
            <p>Control at all stages of manufacturing</p>
         </div>
      </div>
   )
}

export default MainPageBenefits