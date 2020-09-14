import React, { Fragment } from 'react'

import './ProductCard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import productsData from '../../../Data/productsData'
import ProductsQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'
import ColorSelect from '../../Shared/UI/ColorSelect/ColorSelect'
  

const ProductCard = props => {
    
    let [imgSlide, setImgSlide] = React.useState(0)
    let [productColor, setProductColor] = React.useState('') // => Armazena cor selecionada do produto

    const product = productsData.find(product => product._id === props.match.params.id)

    const changeSlide = arg => {
        if (arg === 'previous') {
            imgSlide > 0 ? setImgSlide(imgSlide - 1) : setImgSlide(product.imgsDemo.length - 1)
        } else if (arg === 'next') {
            imgSlide < product.imgsDemo.length - 1 ? setImgSlide(imgSlide + 1) : setImgSlide(0)
        }else if (typeof arg !== isNaN) {
            setImgSlide(arg)
        }
    }

    // Selecionar cor do produto ao clicar nos círculos.
    // Tal método muda a UI apresentando o slide que se refere a cor selecionada, mas também armazena os valores no objeto com todas as informações do produto enviado para o DB (ainda será criado).
    const selectColorHandler = (color, i) => {
        setProductColor(color)
        setImgSlide(i)
    }



    return (
        
        <Fragment>
            <div className="session-container mt-5">
                <div className="product-card-container container-fluid d-flex">
                    <div className="col-6 pl-0 pr-5">
                        <div className="main-img-slider">
                            <img src={product.imgsDemo[imgSlide]} alt="img-1" />
                            <div className="d-flex justify-content-between change-slide-setas-corrigir-nome">
                                <FontAwesomeIcon onClick={() => changeSlide('previous')} icon="arrow-left" />
                                <FontAwesomeIcon onClick={() => changeSlide('next')} icon="arrow-right" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between product-card-sub-images">
                            <img 
                                onClick={() => changeSlide(0)} 
                                src={product.imgsDemo[0]} alt="img-1" 
                                style={{maxWidth: '30%', maxHeight: '30%', cursor: 'pointer'}} 
                            />
                            <img 
                                onClick={() => changeSlide(1)} 
                                src={product.imgsDemo[1]} alt="img-2" 
                                style={{maxWidth: '30%', maxHeight: '30%', cursor: 'pointer'}} 
                            />
                            <img 
                                onClick={() => changeSlide(2)} 
                                src={product.imgsDemo[2]} alt="img-3" 
                                style={{maxWidth: '30%', maxHeight: '30%', cursor: 'pointer'}} 
                            />
                        </div>
                    </div>
                    <div className="col-6 ml-5">
                        <div className="d-flex justify-content-between">
                            <p>123456</p>
                            <p>exemplo</p>
                        </div>
                        <h1 className="mt-5">{product.name}</h1>
                        <p>A comfortable bed for the dog. It will bring a lot of pleasure to your pet. High quality material does not allow the wool to stick and easy to clean.</p>
                        <div className="product-price-container d-flex justify-content-between mt-4">
                            <h3 className="mb-0">$ {product.price}</h3>
                            <div className="product-price-availability d-flex justify-content-between align-items-center text-success">
                                <FontAwesomeIcon icon="check" />
                                <p>Available</p>
                            </div>
                        </div>
                        <div className="product-details-container d-flex justify-content-between mt-4">
                            <div>
                                <p>Size</p>
                                <select className="
                                        product-details-select 
                                        mt-2 
                                        border-left-0 
                                        border-right-0
                                        border-top-0
                                        border-bottom
                                    "
                                >
                                    <option>100x100 cm</option>
                                    <option>200x200 cm</option>
                                    <option>300x300 cm</option>
                                </select>
                            </div>
                            <div>
                                <p>Color</p>
                                <ColorSelect 
                                    colors={product.colors}
                                    selectColorHandlerCallback={(color, i) => selectColorHandler(color, i)}
                                />
                            </div>
                        </div>
                        <div className="product-qtde-container d-flex justify-content-between align-items-center mt-4">
                            <ProductsQtde />
                            <button type="button" className="btn btn-dark">ADD TO BAG</button>   
                            <FontAwesomeIcon icon={["far", "heart"]} size="2x" />
                        </div>
                        <div className="product-category-container mt-3">
                            <p>Category: <span className="font-weight-bold">{product.category}</span></p>
                            <p>Tags: <span className="font-weight-bold">{product.tag}</span></p>
                        </div>
                        <div className="d-flex justify-content-between align-items-end mt-5">
                            <div className="product-specifications-container d-flex flex-column">
                                <div className="d-flex justify-content-between">
                                    <h6>DETAILS</h6>
                                    <h6>SPECIFICATIONS</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p>Material:</p>
                                        <p>Care:</p>
                                        <p>Size:</p>
                                    </div>
                                    <div>
                                        <p className="font-weight-bold"> Polyester</p>
                                        <p className="font-weight-bold"> 30 degree wash</p>
                                        <p className="font-weight-bold"> 100x100 cm</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end align-items-center">
                                <FontAwesomeIcon icon="share-alt" className="mr-4" />
                                <p>Share</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </Fragment>
    )
}

export default ProductCard