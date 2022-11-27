import React, { useState, useEffect, useRef } from 'react'

import classes from './ProductQtyMobile.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductQtyMobile = props => {
	const {
		startQty,
		max,
		changeQtyCallBack
	} = props

	const [maxQty, setMaxQty] = useState([])
	const qtyListRef = useRef()

	const changeQtdeHandler = e => {
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
				<p>{startQty}</p>
				<FontAwesomeIcon icon="chevron-down" size="xs" />
			</div>
			<div
				ref={qtyListRef}
				className={classes.selectList_container}
			>
				<div
					className={classes.selectList_subContainer}
				>
					<div className={classes.SelectList_header}>
						<h3>Select Quantity</h3>
						<FontAwesomeIcon
							onClick={() => toggleQtySelectMobileHandler()}
							icon="times"
							size="2x"
						/>
					</div>
					<div onClick={e => changeQtdeHandler(e)} className={classes.selectList_items}>
						{
							maxQty.map((item, i) => {
								return (
									<div key={item + i}>
										<label>{i + 1}</label>
										<input
											type="radio"
											value={i + 1}
											checked={startQty === i + 1}
										/>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductQtyMobile