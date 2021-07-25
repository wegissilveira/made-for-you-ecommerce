import React from 'react'

import classes from './ProductCart.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

import ProductQtde from '../../../Shared/UI/ProductsQtde/ProductsQtde'
import ProductQtdeMobile from '../../../Shared/UI/ProductQtdeMobile/ProductQtdeMobile'


const ProductCart = props => {

    const setQtde = (value, index) => {
        props.setQtdeCallback(value, index)
    }

    const removeProductCart = id => {
        props.removeProductCallback(id)
    }

    const toggleQtdeSelectMobile = (i, qtde) => {
        const select = document.getElementById('product_qtde-'+i)

        if (select.style.display === 'flex') {
            select.style.display = 'none'
        } else {
            select.style.display = 'flex'
        }

        Array.from(select.children[0].children).forEach(item => {
            if (Number(item.children[1].value) === qtde) {
                item.children[1].checked = true
            }
        })
    }

    return (
        <div className={classes.Cart_details}>
            <div className={classes.Cart_details_img}>
                <Link to={"/shop/product/" + props.product._id}>
                    <img src={props.product.imgsDemo[0]} alt='img' />
                </Link>

                <div>
                    <Link to={"/shop/product/" + props.product._id}>{props.product.name}</Link>
                    <div className={classes.Cart_details_info}>
                        <div>
                            <p>Size</p>
                            <p>Color</p>
                        </div>
                        <div>
                            <p>{props.product.size}</p>
                            <p>{props.product.color}</p>
                        </div>
                    </div>
                </div>
                {/* Botão de remover mobile */}
                <FontAwesomeIcon
                    onClick={() => removeProductCart(props.product._id)}
                    className={classes.Cart_delete_icon}
                    icon="times"
                    size="2x"
                />
            </div>
            <p>0%</p>
            <p>$ {props.product.price}</p>
            <div className={classes.Cart_details_qtde}>
                <ProductQtde 
                    startQtde={props.product.qtde}
                    changeQtdeCallBack={qtde => setQtde(qtde, props.prodIndex)} 
                    max={10}
                />
            </div>
            <p>$ {(props.qtde * parseFloat(props.product.price)).toFixed(2)}</p>
            <p>
                <FontAwesomeIcon
                    onClick={() => removeProductCart(props.product._id)}
                    className={classes.Cart_delete_icon}
                    icon="times"
                />
            </p>
            <div className={classes.Cart_price_mobile}>
                <div
                    onClick={() => toggleQtdeSelectMobile(props.prodIndex, props.qtde)}
                >
                    <p>{props.qtde}</p>
                    <FontAwesomeIcon icon="chevron-down" size="xs"/>
                </div>
                <p>$ {(props.qtde * parseFloat(props.product.price)).toFixed(2)}</p>
                <div 
                    id={'product_qtde-' + props.prodIndex}
                    className={classes.Cart_qtde_mobile}
                >
                    <ProductQtdeMobile
                        changeQtdeCallBack={qtde => setQtde(qtde, props.prodIndex)} 
                        productIndex={props.prodIndex}
                        toggle={() =>toggleQtdeSelectMobile(props.prodIndex)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCart