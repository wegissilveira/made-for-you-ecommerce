import React from 'react'

import classes from './MainPageShopByRoom.module.css'

import { Link } from 'react-router-dom'

const mainPageShopByRoom  = props => {

    return (
        <div className={classes.Session_container}>
            <h1 className="text-center">SHOP BY ROOM</h1>
            <div className="d-flex justify-content-center mt-5">
                <div className={classes.Shop_img_container}>
                    <div style={{overflow: 'hidden', marginBottom: '8px'}}>
                        <Link to={'/shop/living-room'}>
                            {/* <img src={require("../../../assets/images/Shop/quadro-1-pequeno.png")} alt="img-1" /> */}
                            <img src={require("../../../assets/images/Shop/quadro-1-pequeno.jpg")} alt="img-1" />
                        </Link>
                    </div>
                    <div style={{height: '54%', overflow: 'hidden'}}>
                        <Link to={'/shop/kitchen'}>
                            <img src={require("../../../assets/images/Shop/quadro-3-grande.png")} alt="img-2" />
                            {/* <img src={require("../../../assets/images/Shop/quadro-3-grande.jpg")} alt="img-2" /> */}
                        </Link>
                    </div>
                </div>
                <div className={classes.Shop_img_container}>
                    <div style={{height: '54%', overflow: 'hidden', marginBottom: '8px'}}>
                        <Link to={'/shop/bathroom'}>
                            {/* <img src={require("../../../assets/images/Shop/quadro-2-grande.png")} alt="img-2" /> */}
                            <img src={require("../../../assets/images/Shop/quadro-2-grande.jpg")} alt="img-2" />
                        </Link>
                    </div>
                    <div style={{overflow: 'hidden'}}>
                        <Link to={'/shop/bedroom'}>
                            <img src={require("../../../assets/images/Shop/quadro-4-pequeno.png")} alt="img-4" />
                            {/* <img src={require("../../../assets/images/Shop/quadro-4-pequeno.jpg")} alt="img-4" /> */}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default mainPageShopByRoom