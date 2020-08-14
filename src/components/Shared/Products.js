import React from 'react'

import './Products.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const products = props => {

    return (
        <div className="session-container">
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

export default products