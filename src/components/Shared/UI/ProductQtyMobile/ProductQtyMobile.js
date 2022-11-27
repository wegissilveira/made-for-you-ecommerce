import React, { useState, useEffect, useRef } from 'react'

import classes from './ProductQtyMobile.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import QtySelectorMobile from './QtySelectorMobile/QtySelectorMobile'


const ProductQtyMobile = props => {
	const {
		productQty,
		max,
		changeQtyCallBack
	} = props

	const [maxQty, setMaxQty] = useState([])
	const qtyListRef = useRef()

	const changeQtyHandler = e => {
		const inputValue = e.target.closest('DIV').getElementsByTagName('INPUT')[0].value

		changeQtyCallBack(inputValue)
		toggleQtySelectMobileHandler()
	}

	const toggleQtySelectMobileHandler = () => {
		const selectStatus = qtyListRef.current.style.display
		qtyListRef.current.style.display = selectStatus === 'flex' ? 'none' : 'flex'
	}

	useEffect(() => {
		const listQty = Array.from(Array(max).keys())
		setMaxQty(listQty)
	}, [])

	return (
		<div className={classes.ProductQtde_mobile_container}>
			<div
				onClick={() => toggleQtySelectMobileHandler()}
				className={classes.OpenSelect_btn}
			>
				<p>{productQty}</p>
				<FontAwesomeIcon icon="chevron-down" size="xs" />
			</div>
			<QtySelectorMobile 
				qtyListRef={qtyListRef}
				maxQty={maxQty}
				startQty={productQty}
				toggleQtySelectMobileCB={toggleQtySelectMobileHandler}
				changeQtyCB={changeQtyHandler}
			/>
		</div>
	)
}

export default ProductQtyMobile