import React from 'react'
import classes from './ProductModalInfo.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ProductInfoComponent from 'components/Shop/ProductPage/ProductInfoComponent/ProductInfoComponent'

import ProductModalSlider from './ProductModalSlider/ProductModalSlider'


const ProductModalInfo = (props) => {
   const {
      imgs,
      product,
      setShowProductCB,
   } = props


   return (
      <div className={classes.Product_page_modal_container}>
         <FontAwesomeIcon icon="times" onClick={setShowProductCB}/>
         <ProductModalSlider 
            product={product}
            imgs={imgs}
         />
         <ProductInfoComponent product={product} />
      </div>
   )
}

export default ProductModalInfo