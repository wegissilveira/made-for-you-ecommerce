import { useState, useEffect } from 'react'
import classes from './ProductInfoComponent.module.scss'
import { useLocation } from 'react-router-dom'
import ProductContext from 'components/Shop/ProductPage/context/ProductProvider'

import { ProductType } from 'common/types'

import ProductInfoFooter from './ProductInfoFooter/ProductInfoFooter'
import ProductInfoBody from './ProductInfoBody/ProductInfoBody'
import ProductInfoHeader from './ProductInfoHeader/ProductInfoHeader'


type Props = {
   product: ProductType
}

const ProductInfoComponent = (props: Props) => {
   const {
      product      
   } = props

   const [ showComponent, setShowComponent ] = useState<RegExpMatchArray | null>(null)
   const location = useLocation()

   useEffect(() => {
     const show = location.pathname.match('/made-for-you/product/')     
     setShowComponent(show)
   }, [location])   

   return (
      <div className={classes.ProductInfo_container}>
         <ProductContext>
            <ProductInfoHeader product={product} isPdp={showComponent} />
            <ProductInfoBody product={product} />
         </ProductContext>
         <ProductInfoFooter isPdp={showComponent} />
      </div>
   )
}

export default ProductInfoComponent