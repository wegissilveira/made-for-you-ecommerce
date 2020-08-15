import React, { Fragment } from 'react'

import './ProductCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const productCard = props => {

    return (

        <div className="session-container">
            <div className="product-card-container container-fluid d-flex">
                <div className="col-6">
                    <div>
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
                <div className="col-6">
                    <div className="d-flex justify-content-between">
                        <p>123456</p>
                        <p>exemplo</p>
                    </div>
                    <h1>DOG HOUSE</h1>
                    <p>A comfortable bed for the dog. It will bring a lot of pleasure to your pet.</p>
                    <p>High quality material does not allow the wool to stick and easy to clean.</p>
                    <div className="d-flex justify-content-between">
                        <h3>$ 37.99</h3>
                        <div className="d-flex text-success">
                            <FontAwesomeIcon icon="check" />
                            <p>Available</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <p>Size</p>
                            <select>
                                <option>100x100 cm</option>
                                <option>200x200 cm</option>
                                <option>300x300 cm</option>
                            </select>
                        </div>
                        <div>
                            <p>Color</p>
                            <div>
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <input type="number" name="tentacles" min="0"/>
                        <p>ADD TO BAG</p>     
                        <FontAwesomeIcon icon={["far", "heart"]} />
                    </div>
                    <div>
                        <p>Category: <span className="font-weight-bold"> Living room</span></p>
                        <p>Tags: <span className="font-weight-bold"> Furniture, Decor</span></p>
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                        <div className="d-flex">
                            <div>
                                <h6>DETAILS</h6>
                                <div>
                                    <p>Material <span className="font-weight-bold"> Polyester</span></p>
                                    <p>Care <span className="font-weight-bold"> 30 degree wash</span></p>
                                    <p>Size <span className="font-weight-bold"> 100x100 cm</span></p>
                                </div>
                            </div>
                            <div>
                                <h6>SPECIFICATIONS</h6>
                                <div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
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