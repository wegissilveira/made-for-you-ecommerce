import React from 'react'

import './BestDeal.css'

const bestDeal = props => {

    return (
        <div className="session-container">
            <h1 className="text-center mb-5">BEST DEAL</h1>
            <div className="products-container d-flex justify-content-between mb-5">
                <div className="border">
                    <img src={require('../../../assets/images/Products/molde - deal.png')} alt="img-deal" />
                    <div className="products-description d-flex flex-column justify-content-center">
                        <p>DECORATIVE PILLOW</p>
                        <p>$ 12.99</p>
                    </div>
                </div>
                <div className="border">
                    <img src={require('../../../assets/images/Products/molde - deal.png')} alt="img-deal" />
                    <div className="products-description d-flex flex-column justify-content-center">
                        <p>DECORATIVE PILLOW</p>
                        <p>$ 12.99</p>
                    </div>
                </div>
                <div className="border">
                    <img src={require('../../../assets/images/Products/molde - deal.png')} alt="img-deal" />
                    <div className="products-description d-flex flex-column justify-content-center">
                        <p>DECORATIVE PILLOW</p>
                        <p>$ 12.99</p>
                    </div>
                </div>
                <div className="border">
                    <img src={require('../../../assets/images/Products/molde - deal.png')} alt="img-deal" />
                    <div className="products-description d-flex flex-column justify-content-center">
                        <p>DECORATIVE PILLOW</p>
                        <p>$ 12.99</p>
                    </div>
                </div>
                
            </div>
            <div className="d-flex justify-content-center" >
                <div className="bestDeal-passaSlide d-flex justify-content-between">
                    <p>*</p>
                    <p>*</p>
                    <p>*</p>
                    <p>*</p>
                </div>
            </div>
        </div>
    )
}

export default bestDeal