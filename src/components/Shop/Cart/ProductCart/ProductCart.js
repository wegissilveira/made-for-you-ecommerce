import React, { useState, useEffect } from 'react'
import classes from './ProductCart.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

import ProductsQty from "components/Shared/UI/ProductsQty/ProductsQty"
import ProductQtyMobile from 'components/Shared/UI/ProductQtyMobile/ProductQtyMobile'


const ProductCart = props => {
   const {
      product,
      prodIndex,
      setQtdeCallback,
      removeProductCallback
   } = props

   const [productQty, setQty] = useState(1)

   const setQtdeHandler = value => {
      setQty(value)
      setQtdeCallback(value, prodIndex)
   }

   const removeProductCart = id => {
      removeProductCallback(id)
   }

   useEffect(() => {
      setQty(product.qtde)
   }, [])

   // Ficará em suspenso por ora. Motivo explicado na lista de tarefas no item 1 da fase 1
   return (
      <div className={classes.Cart_details}>
         <div className={classes.Cart_details_img}>
            <Link to={"/shop/product/" + product._id + '/?productId=' + product._id}>
               <img src={product.imgsDemo[0]} alt='img' />
            </Link>
            <div>
               <Link to={"/shop/product/" + product._id + '/?productId=' + product._id}>{product.name}</Link>
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
            {/* Botão de remover mobile */}
            <FontAwesomeIcon
               onClick={() => removeProductCart(product._id)}
               className={classes.Cart_delete_icon}
               icon="times"
               size="2x"
            />
         </div>
         <p>0%</p>
         <p>$ {product.price}</p>
         <div className={classes.Cart_details_qtde}>
            <ProductsQty
               productQtyCheckout={productQty}
               changeQtyCallBack={setQtdeHandler}
               max={8}
            />
         </div>
         <p>$ {(productQty * parseFloat(product.price)).toFixed(2)}</p>
         <p>
            <FontAwesomeIcon
               onClick={() => removeProductCart(product._id)}
               className={classes.Cart_delete_icon}
               icon="times"
            />
         </p>
         <div className={classes.Cart_price_mobile}>
            <ProductQtyMobile
               changeQtyCallBack={setQtdeHandler}
               productQtyCheckout={productQty}
               index={prodIndex}
               id={product._id}
               max={8}
            />
            <p>$ {(productQty * parseFloat(product.price)).toFixed(2)}</p>
         </div>
      </div>
   )
}

export default ProductCart