import React from 'react'

import classes from './ProductCart.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

import ProductsQty from "components/Shared/UI/ProductsQty/ProductsQty"
import ProductQtyMobile from 'components/Shared/UI/ProductQtyMobile/ProductQtyMobile'


const ProductCart = props => {

    let [productQtde, setQtde] = React.useState(1)

    const setQtdeHandler = value => {
        setQtde(value)
        props.setQtdeCallback(value, props.prodIndex)
    }

    const removeProductCart = id => {
        props.removeProductCallback(id)
    }

    React.useEffect(() => {
        setQtde(props.product.qtde)
    }, [])



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
                <ProductsQty 
                    productQty={props.product.qtde}
                    changeQtyCallBack={setQtdeHandler} 
                    max={8}
                />
            </div>
            <p>$ {(productQtde * parseFloat(props.product.price)).toFixed(2)}</p>
            <p>
                <FontAwesomeIcon
                    onClick={() => removeProductCart(props.product._id)}
                    className={classes.Cart_delete_icon}
                    icon="times"
                />
            </p>
            <div className={classes.Cart_price_mobile}>
                <ProductQtyMobile 
                    changeQtyCallBack={setQtdeHandler} 
                    productQty={productQtde}
                    index={props.prodIndex}
                    id={props.product._id}
                    max={8}
                />
                <p>$ {(productQtde * parseFloat(props.product.price)).toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ProductCart