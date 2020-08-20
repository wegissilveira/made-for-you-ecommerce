import React, { Fragment } from 'react'

import './ProductCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const productCard = props => {

    return (

        <div className="session-container mt-5">
            <div className="product-card-container container-fluid d-flex">
                <div className="col-6 pl-0 pr-5">
                    <div className="main-img-slider">
                        <img src={require('../../../assets/images/ProductCard/img-1.png')} alt="img-1" />
                        <div className="d-flex justify-content-between change-slide-setas-corrigir-nome">
                            <FontAwesomeIcon icon="arrow-left" />
                            <FontAwesomeIcon icon="arrow-right" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between product-card-sub-images">
                        <img src={require('../../../assets/images/ProductCard/img-1.png')} alt="img-1" style={{maxWidth: '30%', maxHeight: '30%'}} />
                        <img src={require('../../../assets/images/ProductCard/img-2.png')} alt="img-2" style={{maxWidth: '30%', maxHeight: '30%'}} />
                        <img src={require('../../../assets/images/ProductCard/img-3.png')} alt="img-3" style={{maxWidth: '30%', maxHeight: '30%'}} />
                    </div>
                </div>
                <div className="col-6 ml-5">
                    <div className="d-flex justify-content-between">
                        <p>123456</p>
                        <p>exemplo</p>
                    </div>
                    <h1 className="mt-5">DOG HOUSE</h1>
                    <p>A comfortable bed for the dog. It will bring a lot of pleasure to your pet. High quality material does not allow the wool to stick and easy to clean.</p>
                    <div className="product-price-container d-flex justify-content-between mt-4">
                        <h3 className="mb-0">$ 37.99</h3>
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
                            {/* Removi a borda do bootstrap e passei pro css para que seja possível alterá-la durante o hover. Verificar como fazer o mesmo no caso do 'focus'. Além disso transformar esse trecho em algo dinâmico que será lido provavelmente de um objeto. E também é falta inserir a propriedade 'hover' nos spans, para que as cores sejam mais claras quando não estiverem selecionados. Não coloquei aqui, pois já que a lista de opções ainda não está dinâmica eu teria que criar uma classe para cada span. */}
                            <p>Color</p>
                            <div className="d-flex justify-content-between">
                                <div className="
                                        product-details-color 
                                        mt-2 
                                        rounded-circle 
                                        d-flex 
                                        justify-content-center 
                                        align-items-center
                                    "
                                >
                                    <span className="bg-primary rounded-circle"></span>
                                </div>
                                <div className="
                                        product-details-color 
                                        mt-2 
                                        rounded-circle 
                                        d-flex 
                                        justify-content-center 
                                        align-items-center
                                    "
                                >
                                    <span className="bg-success rounded-circle"></span>
                                </div>
                                <div className="
                                        product-details-color 
                                        mt-2 
                                        rounded-circle 
                                        d-flex 
                                        justify-content-center 
                                        align-items-center
                                    "
                                >
                                    <span className="bg-danger rounded-circle"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-qtde-container d-flex justify-content-between align-items-center mt-4">
                        <div className="product-qtde d-flex justify-content-around align-items-center border">
                            <p>1</p>
                            <div className="product-qtde-arrows d-flex flex-column justify-content-between">
                                <FontAwesomeIcon icon="chevron-up" size="xs"/>
                                <FontAwesomeIcon icon="chevron-down" size="xs"/>
                            </div>
                        </div>
                        <button type="button" className="btn btn-dark">ADD TO BAG</button>   
                        <FontAwesomeIcon icon={["far", "heart"]} size="2x" />
                    </div>
                    <div className="product-category-container mt-3">
                        <p>Category: <span className="font-weight-bold"> Living room</span></p>
                        <p>Tags: <span className="font-weight-bold"> Furniture, Decor</span></p>
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
    )
}

export default productCard