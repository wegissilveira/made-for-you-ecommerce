import './Modal.scss'
import Modal from 'react-modal'
import { CSSProperties } from 'react'

import { ProductType } from 'common/types'

import ProductModalInfo from './ProductModalInfo/ProductModalInfo'

type Styles = {
   content: CSSProperties
}

const customStyles: Styles = {
   content: {
      width: '60%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -45%)',
      transition: 'transform 3s ease-in-out 3s',
      overflow: 'hidden',
   }
}

if (window.innerWidth <= 768) {
   customStyles.content.paddingTop = '40px'
}

type Props = {
   imgs: string[]
   showProduct: boolean
   setShowProduct: () => void
   product: ProductType
}

const ProductPageModal = (props: Props) => {
   const {
      imgs,
      showProduct,
      setShowProduct,
      product
   } = props

   return (
      <Modal
         isOpen={showProduct}
         onRequestClose={() => setShowProduct()}
         style={customStyles}
         contentLabel="Product Card"
         ariaHideApp={false}
         closeTimeoutMS={500}
      >
         <ProductModalInfo 
            imgs={imgs}
            product={product}
            setShowProductCB={setShowProduct}
         />
      </Modal>
   )
}

export default ProductPageModal