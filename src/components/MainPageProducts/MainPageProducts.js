import React from 'react'

import './MainPageProducts.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mainPageProducts = props => {

    return (
        <div className="session-container text-center">
            <h1>FEATURED PRODUCTS</h1>
            <p>Select a catecory using special switches or go to the section with a convenient filter by product</p>
            <div className="d-flex justify-content-between products-select-container  mt-5">
                <p className="products-select">ALL PRODUCTS</p>
                <p className="products-select">FURNITURE</p>
                <p className="products-select">DECORATION</p>
                <p className="products-select">TEXTILE</p>
            </div>
            <div>
                <div className="d-flex products-container justify-content-between mt-5">
                    <div className="border">
                        <img src={require('../../assets/images/Products/molde.png')} alt="Produto" />
                        <div className="products-description d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start products-description-icons">
                                <p>Produto</p>
                                <p>$ 28.99</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center products-description-icons">
                                <FontAwesomeIcon icon="eye" />
                                <FontAwesomeIcon icon="suitcase" size="2x" />
                            </div>
                        </div>
                    </div>
                    <div className="border">
                        <img src={require('../../assets/images/Products/molde.png')} alt="Produto" />
                        <div className="products-description d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start products-description-icons">
                                <p>Produto</p>
                                <p>$ 28.99</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center products-description-icons">
                                <FontAwesomeIcon icon="eye" />
                                <FontAwesomeIcon icon="suitcase" size="2x" />
                            </div>
                        </div>
                    </div>
                    <div className="border">
                        <img src={require('../../assets/images/Products/molde.png')} alt="Produto" />
                        <div className="products-description d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start products-description-icons">
                                <p>Produto</p>
                                <p>$ 28.99</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center products-description-icons">
                                <FontAwesomeIcon icon="eye" />
                                <FontAwesomeIcon icon="suitcase" size="2x" />
                            </div>
                        </div>
                    </div>
                    <div className="border">
                        <img src={require('../../assets/images/Products/molde.png')} alt="Produto" />
                        <div className="products-description d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start products-description-icons">
                                <p>Produto</p>
                                <p>$ 28.99</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center products-description-icons">
                                <FontAwesomeIcon icon="eye" />
                                <FontAwesomeIcon icon="suitcase" size="2x" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex products-container justify-content-between mt-5">
                    <div className="border">
                        <img src={require('../../assets/images/Products/molde.png')} alt="Produto" />
                        <div className="products-description d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start products-description-icons">
                                <p>Produto</p>
                                <p>$ 28.99</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center products-description-icons">
                                <FontAwesomeIcon icon="eye" />
                                <FontAwesomeIcon icon="suitcase" size="2x" />
                            </div>
                        </div>
                    </div>
                    <div className="border">
                        <img src={require('../../assets/images/Products/molde.png')} alt="Produto" />
                        <div className="products-description d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start products-description-icons">
                                <p>Produto</p>
                                <p>$ 28.99</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center products-description-icons">
                                <FontAwesomeIcon icon="eye" />
                                <FontAwesomeIcon icon="suitcase" size="2x" />
                            </div>
                        </div>
                    </div>
                    <div className="border">
                        <img src={require('../../assets/images/Products/molde.png')} alt="Produto" />
                        <div className="products-description d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start products-description-icons">
                                <p>Produto</p>
                                <p>$ 28.99</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center products-description-icons">
                                <FontAwesomeIcon icon="eye" />
                                <FontAwesomeIcon icon="suitcase" size="2x" />
                            </div>
                        </div>
                    </div>
                    <div className="border">
                        <img src={require('../../assets/images/Products/molde.png')} alt="Produto" />
                        <div className="products-description d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start products-description-icons">
                                <p>Produto</p>
                                <p>$ 28.99</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center products-description-icons">
                                <FontAwesomeIcon icon="eye" />
                                <FontAwesomeIcon icon="suitcase" size="2x" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="products-showmore">
                <div className="products-showmore-text">
                    <p>SHOW MORE</p>
                </div>
            </div>
        </div>
    )
}

export default mainPageProducts