import React from 'react'

import classes from './ProductCart.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

import ProductQtde from '../../../Shared/UI/ProductsQtde/ProductsQtde'
import ProductQtdeMobile from '../../../Shared/UI/ProductQtdeMobile/ProductQtdeMobile'


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
                <ProductQtde 
                    startQtde={props.product.qtde}
                    changeQtdeCallBack={setQtdeHandler} 
                    max={10}
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
                <ProductQtdeMobile 
                    changeQtdeCallBack={setQtdeHandler} 
                    startQtde={productQtde}
                    index={props.prodIndex}
                    id={props.product._id}
                    max={10}
                />
                <p>$ {(productQtde * parseFloat(props.product.price)).toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ProductCart