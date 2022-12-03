import React from 'react' 
import classes from './ProductCartDetails.module.scss'

import { Link } from 'react-router-dom'


const ProductCartDetails = props => {
   const  {
      product
   } = props

   return (
      <div className={classes.Cart_details_img}>
         <Link to={"/shop/product/" + product._id + '/?productId=' + product._id}>
            <img src={product.prodImg} alt='img' />
         </Link>
         <div>
            <Link to={"/shop/product/" + product._id + '/?productId=' + product._id}>{product.prodName}</Link>
            <div className={classes.Cart_details_info}>
               <div>
                  <p>Size</p>
                  <p>Color</p>
               </div>
               <div>
                  <p>{product.size}</p>
                  <p>{product.color}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProductCartDetails