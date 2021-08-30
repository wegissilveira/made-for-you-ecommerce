import React from 'react'

import classes from './MinorSliderHeader.module.css'

import { Link } from 'react-router-dom'

import ProgressBar from '../../../Shared/UI/ProgressBar/ProgressBar'
import productsData from '../../../../Data/productsData'


const MinorSliderHeader = props => {
    
    let [minorSlideImg, setMinorSlideImg] = React.useState(0)
    let [sliderProducts, setSliderProducts] = React.useState([])


    const changeSlideHandler = (index) => {
        
        if (typeof index !== 'string') {
            setMinorSlideImg(index)
            
        } else {
            if (minorSlideImg < sliderProducts.length - 1) {
                setMinorSlideImg(minorSlideImg + 1)
                
            } else {
                setMinorSlideImg(0)
                
            }
        }    
    }
    
    const changeSlideCallbackHandler = index => {
        changeSlideHandler(index)
    }

    React.useEffect(() => {
        let sliderProducts = productsData.filter(prod => prod.slide !== undefined)
        setSliderProducts(sliderProducts)
    }, [])
    
    
    return (
        <React.Fragment>
            <ProgressBar 
                bars={sliderProducts.length} // => Qtde de barras
                timer={5000} // => Tempo do loop
                changeDot={changeSlideCallbackHandler} // => Função que controla a passagem automática de slides
                auto={true} // => Determina se a passagem de slides e barras será automática
                direction={'column'} // => Orientação dos pontos, horizontal ou vertical
                height={150} // => Altura que o bloco de pontos ocupará
            />
            <div className={classes.MinorSlider_container}>
                {sliderProducts.map((item, i) => {
                    return (
                        <div 
                            key={`${item}-${i}`}
                            className={classes.MinorSlider_subContainer} 
                            style={{
                                backgroundColor: item.slide[1], 
                                display: i === minorSlideImg ? 'block' : 'none'
                            }}
                        >
                            <img 
                                src={item.img}
                                alt={"img-1"} 
                            />
                            <div>
                                <Link to={`${process.env.PUBLIC_URL}/shop/product/${item._id}`} >
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default MinorSliderHeader