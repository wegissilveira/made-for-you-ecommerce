import React, { forwardRef, useImperativeHandle } from 'react'

import classes from './PriceSlider.module.css'


const PriceSlider = forwardRef((props, ref) => {

    const sliderRef = React.useRef() // => Div que engloba o slider
    const thumb_1_Ref = React.useRef() 
    const thumb_2_Ref = React.useRef() 
    const price_thumb_1_Ref = React.useRef() 
    const price_thumb_2_Ref = React.useRef() 

    const initial_position = 0 // => Valor inicial do thumb esquerdo ***
    const [slider_width, setSliderWidth] = React.useState(0)

    const initial_min_value = props.minValue // => Valor inicial do preço mínimo
    const initial_max_value = props.maxValue // => Valor inicial do preço máximo

    let [mobile_thumb1_position, setValueMobileThumb1] =  React.useState(0)
    let [mobile_thumb2_position, setValueMobileThumb2] =  React.useState(0)
    let [min_value, setMinValue] =  React.useState(initial_min_value)
    let [max_value, setMaxValue] =  React.useState(initial_max_value)
        

    useImperativeHandle(ref, () => ({
        resetPriceSlider() {
            thumb_1_Ref.current.style.transform = `translate(0px)`
            thumb_2_Ref.current.style.transform = `translate(0px)`
            price_thumb_1_Ref.current.style.transform = `translate(0px)`
            price_thumb_2_Ref.current.style.transform = `translate(0px)`

            setMinValue(initial_min_value)
            setMaxValue(initial_max_value)

            props.rangeValues([initial_min_value, initial_max_value])
        }
    }));
    // console.log('TESTE PRICE');

    const beginSliding = e => {
        // slider.target.onpointermove = slide
        e.target.onpointermove = slide
        // slider.ontouchmove = slide
        // slider.target.setPointerCapture(e.pointerId)
        e.target.setPointerCapture(e.pointerId)
    }
    
    const stopSliding = e => {
        // slider.onpointermove = null
        e.target.onpointermove = null
        // slider.releasePointerCapture(e.pointerId)
        e.target.releasePointerCapture(e.pointerId)
    }
    
    const slide = e => {
        const thumb_id = e.target.id
        let priceThumb = thumb_id === 'left-thumb' ? price_thumb_1_Ref : price_thumb_2_Ref

        let rect = sliderRef.current.getBoundingClientRect()
        let current_position = e.clientX - rect.left 
        
        if (thumb_id === 'right-thumb') {
            current_position = current_position - sliderRef.current.offsetWidth

            if (current_position >= initial_position) {
                current_position = initial_position
            }

            if (current_position <= mobile_thumb1_position - (slider_width - 25)) {
                current_position = mobile_thumb1_position - (slider_width - 25)
            }
            
            setValueMobileThumb2(current_position)
        } 
        
        if (thumb_id === 'left-thumb') {

            if (current_position <= initial_position) {
                current_position = initial_position
            }

            if (current_position >= mobile_thumb2_position + (slider_width - 25)) {
                current_position = mobile_thumb2_position + (slider_width - 25)
            }

            setValueMobileThumb1(current_position)
        }
        
        // slider.style.transform = `translate(${current_position}px)`
        e.target.style.transform = `translate(${current_position}px)`
        // slider_price.style.transform = `translate(${current_position}px)`
        priceThumb.current.style.transform = `translate(${current_position}px)`
    }
        
    
    const handleChange = e => {
        
        const thumb_id = e.target.id

        if (thumb_id === 'left-thumb') {

            // slider = thumb_1_Ref.current
            // slider_price = price_thumb_1_Ref.current
            
            // slider.onpointerdown = beginSliding
            // slider.onpointerup = stopSliding

            if (mobile_thumb1_position - initial_position < 1) {
                setMinValue(initial_min_value)
            } else {
                setMinValue((mobile_thumb1_position - initial_position) * (initial_max_value / slider_width))
            }

        } else if (thumb_id === 'right-thumb') {
            
            // slider = thumb_2_Ref.current
            // slider_price = price_thumb_2_Ref.current

            // slider.onpointerdown = beginSliding
            // slider.onpointerup = stopSliding

            if (mobile_thumb2_position > -1) {
                setMaxValue(initial_max_value)
            } else {
                setMaxValue((mobile_thumb2_position + slider_width) * (initial_max_value / slider_width))
            }
        }

        props.rangeValues([min_value, max_value])
    }
    
    React.useEffect(() => {
        setSliderWidth(sliderRef.current.offsetWidth)
    }, [])




    return (
            <div className={classes.Price_slider_container}>
                <h6>PRICE FILTER</h6>
                <div className={classes.Price_slider_subContainer}
                    // onMouseMove={(e) => handleChange(e)}
                    onPointerMove={(e) => handleChange(e)}
                    ref={sliderRef}
                >
                    <div>
                        <span 
                            id="left-thumb"
                            ref={thumb_1_Ref}
                            onPointerDown={e => beginSliding(e)}
                            onPointerUp={e => stopSliding(e)}
                        ></span>
                        <span 
                            id="right-thumb"
                            ref={thumb_2_Ref}
                            onPointerDown={e => beginSliding(e)}
                            onPointerUp={e => stopSliding(e)}
                        ></span>
                        <p ref={price_thumb_1_Ref}> {Math.floor(min_value)} </p>
                        <p ref={price_thumb_2_Ref}> {Math.floor(max_value)} </p>
                    </div>
                </div>
            </div>
    )
})

export default PriceSlider