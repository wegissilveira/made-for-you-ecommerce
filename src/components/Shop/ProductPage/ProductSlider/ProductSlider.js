import React, { useState, useEffect } from 'react'
import classes from './ProductSlider.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ProductSlider = props => {
	const {
		imgs
	} = props

	const [images, setImages] = useState([])
	const [imgSlide, setImgSlide] = useState(0)

	const changeSlide = arg => {
		let newImgSlide = imgSlide
		if (arg === 'previous') {
			if (imgSlide > 0) {
				newImgSlide = imgSlide - 1
			} else {
				newImgSlide = imgs.length - 1
			}
		} 
		
		if (arg === 'next') {
			if (imgSlide < imgs.length - 1) {
				newImgSlide = imgSlide + 1
			} else {
				newImgSlide = 0
			}
		} 
		
		if (typeof arg === 'number') {
			newImgSlide = arg
		}

		setImgSlide(newImgSlide)
	}

	useEffect(() => {
		if(imgs) setImages(imgs)
	}, [imgs])


	return (
		<div>
			<div className={classes.Main_img_slider}>
				<div>
					{images.map((img, i) =>
						<img
							key={i}
							src={img}
							alt={"img-" + i}
							style={{ display: imgSlide === i ? 'block' : 'none' }}
						/>
					)}
				</div>
				<div>
					<FontAwesomeIcon onClick={() => changeSlide('previous')} icon="arrow-left" />
					<FontAwesomeIcon onClick={() => changeSlide('next')} icon="arrow-right" />
				</div>
			</div>
			<div className={classes.Product_page_thumb_images}>
				<img
					onClick={() => changeSlide(0)}
					src={images[0]} alt="img-1"
				/>
				<img
					onClick={() => changeSlide(1)}
					src={images[1]} alt="img-2"
				/>
				<img
					onClick={() => changeSlide(2)}
					src={images[2]} alt="img-3"
				/>
			</div>
		</div>
	)
}

export default ProductSlider