import React, { useState, useEffect, useRef, useContext } from 'react'
import classes from './ProductQtyMobile.module.css'

import { verifyCheckout } from "helpers/functions"

import { ProductDataContext } from "components/Shop/ProductPage/context/ProductContext"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import QtySelectorMobile from './QtySelectorMobile/QtySelectorMobile'

const isCheckout = verifyCheckout()


const ProductQtyMobile = props => {
	const {
		max,
      changeQtyCallBack,
      productQtyCheckout
	} = props

	const [ productQtyState, setProductQtyState ] = useState(1)
	const [maxQty, setMaxQty] = useState([])

	const qtyListRef = useRef()

	const { productQty } = useContext(ProductDataContext)

	const toggleQtySelectMobileHandler = () => {
		const selectStatus = qtyListRef.current.style.display
		qtyListRef.current.style.display = selectStatus === 'flex' ? 'none' : 'flex'
	}

	useEffect(() => {
		const listQty = Array.from(Array(max).keys())
		setMaxQty(listQty)
	}, [])

	useEffect(() => {
      let qty = 1
      if (!isCheckout) qty = productQty
      if (isCheckout) qty = productQtyCheckout

      setProductQtyState(qty)
   }, [productQtyCheckout, productQty])
	
	return (
		<div className={classes.ProductQtde_mobile_container}>
			<div
				onClick={() => toggleQtySelectMobileHandler()}
				className={classes.OpenSelect_btn}
			>
				<p>{productQtyState}</p>
				<FontAwesomeIcon icon="chevron-down" size="xs" />
			</div>
			<QtySelectorMobile 
				qtyListRef={qtyListRef}
				maxQty={maxQty}
				toggleQtySelectMobileCB={toggleQtySelectMobileHandler}
				changeQtyCheckoutCB={changeQtyCallBack}
				productQtyCheckout={productQtyCheckout}
			/>
		</div>
	)
}

export default ProductQtyMobile