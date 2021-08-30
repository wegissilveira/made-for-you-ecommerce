import React from 'react'

import classes from './MainPageShopByRoom.module.css'

import { Link } from 'react-router-dom'

const mainPageShopByRoom  = props => {

    return (
        <div className={classes.Session_container}>
            <h1>SHOP BY ROOM</h1>
            <div className={classes.ShoppingByRoom_container}>
                <div>
                    <div>
                        <Link to={`${process.env.PUBLIC_URL}/shop/living-room`}>
                            <img src={require("../../../assets/images/Shop/quadro-1-pequeno.jpg")} alt="img-1" />
                        </Link>
                    </div>
                    <div>
                        <Link to={`${process.env.PUBLIC_URL}/shop/kitchen`}>
                            <img src={require("../../../assets/images/Shop/quadro-3-grande.png")} alt="img-2" />
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <Link to={`${process.env.PUBLIC_URL}/shop/bathroom`}>
                            <img src={require("../../../assets/images/Shop/quadro-2-grande.jpg")} alt="img-2" />
                        </Link>
                    </div>
                    <div>
                        <Link to={`${process.env.PUBLIC_URL}/shop/bedroom`}>
                            <img src={require("../../../assets/images/Shop/quadro-4-pequeno.png")} alt="img-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default mainPageShopByRoom