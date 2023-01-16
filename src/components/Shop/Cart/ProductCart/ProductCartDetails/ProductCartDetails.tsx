import { useState, useEffect } from 'react'
import classes from './ProductCartDetails.module.scss'

import { Link } from 'react-router-dom'

import { formatUrlName } from 'helpers/functions'
import { HEX, ProductCartType } from 'common/types'
import getColors from 'services/colorsNames'


type Props = {
   product: ProductCartType
}

const ProductCartDetails = (props: Props) => {
   const  {
      product
   } = props

   const [colorName, setColorName] = useState<HEX>('#')
   
   useEffect(() => {
      (async () => {
         const colorsNameList = await getColors()         
         const currentColor = Object.entries(colorsNameList).find(([colorName, colorHex]) => {
            return colorHex.toLocaleLowerCase() === product.color.toLocaleLowerCase() 
         })
         if (currentColor) setColorName(currentColor[0] as HEX)
      })()      
   }, [])

   return (
      <div className={classes.Cart_details_img}>
         <Link to={formatUrlName(product.prodName, product._id)}>
            <img src={product.prodImg} alt='img' />
         </Link>
         <div>
            <Link to={formatUrlName(product.prodName, product._id)}>{product.prodName}</Link>
            <div className={classes.Cart_details_info}>
               <div>
                  <p>Size</p>
                  <p>Color</p>
               </div>
               <div>
                  <p>{product.size}</p>
                  <p>{colorName}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProductCartDetails