import React from 'react'

import classes from './ProductSlider.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ProductSlider = props => {

    let [imgSlide, setImgSlide] = React.useState(0)

    const changeSlide = arg => {
        if (arg === 'previous') {
             
            if (imgSlide > 0) {
                setImgSlide(imgSlide - 1)
            } else {
                setImgSlide(props.product.imgsDemo.length - 1)
            }
            
        } else if (arg === 'next') {

            if (imgSlide < props.product.imgsDemo.length - 1) {
                setImgSlide(imgSlide + 1)
            } else {
                setImgSlide(0)
            }
            
        }else if (typeof arg === 'number') {
            setImgSlide(arg)
        }
    }
    

    
    return (
        <div>
            <div className={classes.Main_img_slider}>
                <div>
                    {props.product.imgsDemo.map((img, i) => 
                        <img 
                            key={i} 
                            src={img} 
                            alt={"img-"+i}
                            style={{display: imgSlide === i ? 'block' : 'none'}}
                        />
                    )}
                </div>
                <div>
                    <FontAwesomeIcon onClick={() => changeSlide('previous')} icon="arrow-left" />
                    <FontAwesomeIcon onClick={() => changeSlide('next')} icon="arrow-right" />
                </div>
            </div>
            {/* Transformar este bloco em um loop - somente após análise da possibilidade de junção deste componente com o ProductModalSlider */}
            <div className={classes.Product_page_thumb_images}>
                <img 
                    onClick={() => changeSlide(0)} 
                    src={props.product.imgsDemo[0]} alt="img-1" 
                />
                <img 
                    onClick={() => changeSlide(1)} 
                    src={props.product.imgsDemo[1]} alt="img-2" 
                />
                <img 
                    onClick={() => changeSlide(2)} 
                    src={props.product.imgsDemo[2]} alt="img-3" 
                />
            </div>
        </div>
    )
}

export default ProductSlider