import React, { useState, useEffect, useRef, useContext } from 'react'
import classes from './ProductQtyMobile.module.css'

import { verifyCheckout } from "helpers/functions"

import { ProductDataContext } from "components/Shop/ProductPage/context/ProductContext"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from "react-router-dom"

import { QtyProps } from 'common/types'

import QtySelectorMobile from './QtySelectorMobile/QtySelectorMobile'


interface Props extends QtyProps {}

const ProductQtyMobile = (props: Props) => {
	const {
		max,
      changeQtyCallBack,
      productQtyCheckout
	} = props

	const [ productQtyState, setProductQtyState ] = useState(1)
	const [maxQty, setMaxQty] = useState<number[]>([] as number[])
	const [ isCheckoutRoute, setIsCheckout ] = useState(false)

	const qtyListRef = useRef<HTMLDivElement>(null)
	const { productQty } = useContext(ProductDataContext)
	const location = useLocation()

	const toggleQtySelectMobileHandler = () => {
		const currentRef = qtyListRef.current
		if (currentRef) {
			const selectStatus = currentRef.style.display
			currentRef.style.display = selectStatus === 'flex' ? 'none' : 'flex'
		}
	}

	useEffect(() => {
		const listQty = Array.from(Array(max).keys())
		setMaxQty(listQty)
	}, [])

	useEffect(() => {
      let qty = 1
      if (!isCheckoutRoute) qty = productQty
		if (productQtyCheckout) {
			if (isCheckoutRoute) qty = productQtyCheckout
		}      

      setProductQtyState(qty)
   }, [productQtyCheckout, productQty, isCheckoutRoute])

	useEffect(() => {
      const isCheckout = verifyCheckout()
      setIsCheckout(isCheckout)
   }, [location])
	
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
				changeQtyCallBack={changeQtyCallBack}
				productQtyCheckout={productQtyCheckout}
			/>
		</div>
	)
}

export default React.memo(ProductQtyMobile)