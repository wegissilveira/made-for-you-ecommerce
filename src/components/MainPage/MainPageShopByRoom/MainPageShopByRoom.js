import React from 'react'

import './MainPageShopByRoom.css'

import { Link } from 'react-router-dom'

const mainPageShopByRoom  = props => {

    return (
        <div className="session-container">
            <h1 className="text-center">SHOP BY ROOM</h1>
            <div className="d-flex justify-content-center mt-5">
                <div className="pr-2 shop-img-container">
                    <Link to={'/shop/bedroom'}>
                        <img className="pb-2" src={require("../../../assets/images/Shop/quadro-1-pequeno.png")} alt="img-1" />
                    </Link>
                    <Link to={'/shop/living-room'}>
                        <img className="pb-2" src={require("../../../assets/images/Shop/quadro-3-grande.png")} alt="img-2" />
                    </Link>
                </div>
                <div className="pl-2 shop-img-container">
                    <Link to={'/shop/bathroom'}>
                        <img className="pb-2" src={require("../../../assets/images/Shop/quadro-2-grande.png")} alt="img-2" />
                    </Link>
                    <Link to={'/shop/kitchen'}>
                        <img className="pb-2" src={require("../../../assets/images/Shop/quadro-4-pequeno.png")} alt="img-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default mainPageShopByRoom