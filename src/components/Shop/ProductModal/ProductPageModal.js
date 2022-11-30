import React from 'react'

import './Modal.css'

import Modal from 'react-modal';

import ProductModalInfo from './ProductModalInfo/ProductModalInfo';

const customStyles = {
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


const ProductPageModal = props => {
   const {
      imgs,
      showProduct,
      setShowProduct,
      product
   } = props

   // ANALISAR SE ESTE BLOCO SERÁ ATUALIZADO ASSIM MESMO OU SE SE TORNARÁ ALGO A PARTE, COMO UM REDUCER, POR EXEMPLO
   if (window.innerWidth <= 768) {
      customStyles.content.paddingTop = '40px'
   }

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