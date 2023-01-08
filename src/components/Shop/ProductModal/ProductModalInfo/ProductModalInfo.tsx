import classes from './ProductModalInfo.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ProductType } from 'common/types'

import ProductInfoComponent from 'components/Shop/ProductPage/ProductInfoComponent/ProductInfoComponent'
import ProductModalSlider from './ProductModalSlider/ProductModalSlider'


type Props = {
   imgs: string[]
   setShowProductCB: () => void
   product: ProductType
}

const ProductModalInfo = (props: Props) => {
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