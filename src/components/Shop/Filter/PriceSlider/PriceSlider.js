import React, { forwardRef, useRef, useImperativeHandle } from 'react'

import classes from './PriceSlider.module.css'


const PriceSlider = forwardRef((props, ref) => {

    const sliderRef = React.useRef() // => Div que engloba o slider
    const thumb_1_Ref = React.useRef() // => Div que engloba o slider
    const thumb_2_Ref = React.useRef() // => Div que engloba o slider
    const price_thumb_1_Ref = React.useRef() // => Div que engloba o slider
    const price_thumb_2_Ref = React.useRef() // => Div que engloba o slider

    const initial_position = 0 // => Valor inicial do thumb esquerdo ***
    //const end_position = 200 // => Valor final do thumb direito ***

    const initial_min_value = props.minValue // => Valor inicial do preço mínimo
    const initial_max_value = props.maxValue // => Valor inicial do preço máximo

    let [thumb1_position, setValueThumb1] =  React.useState(0)
    let [thumb2_position, setValueThumb2] =  React.useState(0)
    let [mobile_thumb1_position, setValueMobileThumb1] =  React.useState(0)
    let [mobile_thumb2_position, setValueMobileThumb2] =  React.useState(0)
    let [min_value, setMinValue] =  React.useState(initial_min_value)
    let [max_value, setMaxValue] =  React.useState(initial_max_value)
    
    React.useEffect(() => {
        setValueThumb2(sliderRef.current.offsetWidth - 5)
    }, [])

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

    let slider
    let slider_price

    const beginSliding = e => {
        slider.onpointermove = slide
        slider.setPointerCapture(e.pointerId)
    }
    
    const stopSliding = e => {
        slider.onpointermove = null
        slider.releasePointerCapture(e.pointerId)
    }
    
    const slide = e => {
        const thumb_class = e.target.className

        let rect = sliderRef.current.getBoundingClientRect()
        let current_position = e.clientX - rect.left 
        
        if (thumb_class.includes('right-thumb')) {
            // 'tight-thumb' não pode ser 200 (e.clientX - rect.left), ja que a referência é o próprio objeto, ou seja, o seu ponto 0 e onde ele está e não o início do slider, por isso é preciso subtrair o width do slider, ou seja, 200 - 200, o que equivale a 0 inicialmente, caso fosse duzentos ele ficaria 200 pontos a mais para a direita.
            // Da maneira que está ele se inicía com 0 e ao ser movido para a direita recebe valores negativos, o oposto do 'left-thumb'.
            current_position = current_position - sliderRef.current.offsetWidth

            if (current_position >= initial_position) {
                current_position = initial_position
            }

            if (current_position <= mobile_thumb1_position - 175) {
                current_position = mobile_thumb1_position - 175
            }
            
            setValueMobileThumb2(current_position)
        } 
        
        if (thumb_class.includes('left-thumb')) {

            if (current_position <= initial_position) {
                current_position = initial_position
            }

            // estou utilizando o valor de 175 como referência, pois o 'tight-thumb' recebe um valor negativo, como o slider tem o width de 200, o 175 garante uma diferença de 25px entre os thumbs (200 - 175) independente de suas posições.
            if (current_position >= mobile_thumb2_position + 175) {
                current_position = mobile_thumb2_position + 175
            }

            setValueMobileThumb1(current_position)
        }
        
        slider.style.transform = `translate(${current_position}px)`
        slider_price.style.transform = `translate(${current_position}px)`
    }
        
    
    const handleChange = e => {

        const thumb_class = e.target.className

        if (thumb_class.includes('left-thumb')) {

            slider = thumb_1_Ref.current;
            slider_price = price_thumb_1_Ref.current;

            slider.onpointerdown = beginSliding;
            slider.onpointerup = stopSliding;

            if (mobile_thumb1_position - initial_position < 1) {
                setMinValue(initial_min_value)
            } else {
                setMinValue((mobile_thumb1_position - initial_position) * 6.45)
            }

        } else if (thumb_class.includes('right-thumb')) {
            
            slider = thumb_2_Ref.current;
            slider_price = price_thumb_2_Ref.current;

            slider.onpointerdown = beginSliding;
            slider.onpointerup = stopSliding;

            if (mobile_thumb2_position > -1) {
                setMaxValue(initial_max_value)
            } else {
                setMaxValue((mobile_thumb2_position + 200) * 6.45)
            }
        }

        props.rangeValues([min_value, max_value])

    }

    return (
            <div>
                <h6 style={{marginBottom: '35px'}}>PRICE FILTER</h6>
                <div className={classes.Range_container}
                    onMouseMove={(e) => handleChange(e)}
                    ref={sliderRef}
                >
                    <div className={classes.Range}

                    >
                        {/* 'left-thumb' e 'right-thumb' não são classes de estilos, existem simplesmente como referência para os métodos 'slide' e 'handleChange'*/}
                        <span 
                            className="rounded-circle left-thumb"
                            style={{
                                width:'15px',
                                height: '15px',
                                backgroundColor: 'red',
                                marginTop: '-6px',
                                marginLeft: thumb1_position - 7 + 'px'
                            }}
                            ref={thumb_1_Ref}
                        ></span>
                        <span 
                            className="rounded-circle right-thumb"
                            style={{
                                width:'15px',
                                height: '15px',
                                backgroundColor: 'black',
                                marginTop: '-6px',
                                marginLeft: thumb2_position - 7 + 'px'
                            }}
                            ref={thumb_2_Ref}
                        ></span>
                        <p style={{
                            marginLeft: thumb1_position - 15 + 'px',
                            position: 'absolute',
                            marginTop: '15px'}}
                            ref={price_thumb_1_Ref}
                        > {Math.floor(min_value)}
                        </p>
                        <p style={{
                            marginLeft: thumb2_position - 20 + 'px',
                            position: 'absolute',
                            marginTop: '-35px'}}
                            ref={price_thumb_2_Ref}
                        > {Math.floor(max_value)}
                        </p>
                    </div>
                </div>
            </div>
    )
})

export default PriceSlider