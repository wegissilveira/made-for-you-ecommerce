import React from 'react'

import './MainPageShop.css'

const mainPageShop  = props => {

    return (
        <div className="session-container">
            <h1 className="text-center">SHOP BY ROOM</h1>
            <div className="d-flex justify-content-center mt-5">
                <div className="pr-2 shop-img-container">
                    <img className="pb-2" src={require("../../assets/images/Shop/quadro-1-pequeno.png")} alt="img-1" />
                    <img className="pt-2" src={require("../../assets/images/Shop/quadro-3-grande.png")} alt="img-2" />
                </div>
                <div className="pl-2 shop-img-container">
                    <img className="pb-2" src={require("../../assets/images/Shop/quadro-2-grande.png")} alt="img-3" />
                    <img className="pt-2" src={require("../../assets/images/Shop/quadro-4-pequeno.png")} alt="img-4" />
                </div>
            </div>
        </div>
    )
}

export default mainPageShop