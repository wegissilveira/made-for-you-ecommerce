import classes from './ProductInfoFooter.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ProductInfoFooter = () => {
   return (
      <div className={classes.Product_specifications_container}>
         <div>
            <div>
               <h6>DETAILS</h6>
               <h6>SPECIFICATIONS</h6>
            </div>
            <div>
               <div>
                  <p>Material:</p>
                  <p>Care:</p>
                  <p>Size:</p>
               </div>
               <div>
                  <p> Polyester</p>
                  <p> 30 degree wash</p>
                  <p> 100x100 cm</p>
               </div>
            </div>
         </div>
         <div>
            <FontAwesomeIcon icon="share-alt" />
            <p>Share</p>
         </div>
      </div>
   )
}

export default ProductInfoFooter