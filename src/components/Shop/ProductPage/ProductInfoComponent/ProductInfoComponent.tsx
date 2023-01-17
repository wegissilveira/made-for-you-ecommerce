import classes from './ProductInfoComponent.module.scss'

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

   return (
      <div className={classes.ProductInfo_container}>
         <ProductContext>
            <ProductInfoHeader product={product} />
            <ProductInfoBody product={product} />
         </ProductContext>
         <ProductInfoFooter />
      </div>
   )
}

export default ProductInfoComponent