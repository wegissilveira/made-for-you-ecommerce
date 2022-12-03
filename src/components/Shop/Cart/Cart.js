import React, { useState, useEffect } from 'react'

import classes from './Cart.module.scss'

import { connect } from 'react-redux'

import CartList from './CartList/CartList'
import KeepBuyingBtn from './KeepBuyingBtn/KeepBuyingBtn'


const Cart = props => {
   const {
      cart
   } = props

   const [qty, setQty] = useState([])
   const [finalPrice, setFinalPrice] = useState(0)

   const setQtdeHandler = (value, prodId) => {
      const arrQty = [...qty]
      arrQty.forEach((prod) => {
         if (prod.id === prodId) prod.qty = value
      })
      setQty(arrQty)
   }

   useEffect(() => {
      const arrQty = []      
      cart.map((item) => {
         const productsQty = {}
         productsQty.qty = item.qtde
         productsQty.id = item._id
         arrQty.push(productsQty)
      })

      setQty(arrQty)
   }, [])

   useEffect(() => {
      let fullPrice = 0
      const prodQty = [...qty]

      cart.forEach(prod => {
         prodQty.forEach(p => {
            if (p.id === prod._id) {
               fullPrice = fullPrice + (Number(p.qty) * parseFloat(prod.price))
            } 
         })
      }) 

      setFinalPrice(fullPrice)
   }, [JSON.stringify(qty), cart])


   return (
      <div className={classes.Session_container}>
         <h1>SHOPPING BAG</h1>
         {cart.length > 0 ?
            <CartList 
               productsCartDetails={cart}
               setQtdeHandlerCB={setQtdeHandler}
               finalPrice={finalPrice}
            />
            :
            <>
               <h1>YOUR BAG IS EMPTY</h1>
               <KeepBuyingBtn btnText={'GO SHOPPING'} />
            </>
            
         }
      </div>
   )
}

const mapStateToProps = state => {
   return {
      cart: state.cartListState
   }
}


export default connect(mapStateToProps)(Cart)