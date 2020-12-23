import React from 'react'

import classes from './ProductsQtde.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductsQtde = props => {

    let [productQtde, setProductQtde] = React.useState(1) // => Quantidade atual
    let [productQtdeMax, ] = React.useState(props.max) // => Quantidade máxima. Caso não haja o a arrow up estará ativa infinitamente

    React.useEffect(() => {
        if (props.startQtde !== undefined) {
            setProductQtde(props.startQtde)
        }
    }, [props.startQtde])

    const changeQtde = arg => {
        if (arg === "increase" && productQtde < productQtdeMax) {
            setProductQtde(productQtde + 1)
            props.changeQtdeCallBack(productQtde + 1)

        } else if (arg === 'decrease' && productQtde > 1) {            
            if (productQtde > 1) {
                setProductQtde(productQtde - 1)
                props.changeQtdeCallBack(productQtde - 1)
            } else {
                setProductQtde(1)
                props.changeQtdeCallBack(1)
            }
        }
    }

    let active_up
    productQtde < productQtdeMax ? 
        active_up = {color: '#212529', cursor: 'pointer'} : 
        active_up = {color: '#ccc', cursor: 'default'}

    let active_down
    productQtde > 1 ? 
        active_down = {color: '#212529', cursor: 'pointer'} : 
        active_down = {color: '#ccc', cursor: 'default'}
    

    return (
        <div className={classes.Product_qtde}>
            <p>{productQtde}</p>
            <div className={classes.Product_qtde_arrows}>
                <FontAwesomeIcon 
                    style={active_up} 
                    onClick={() => changeQtde('increase')} 
                    icon="chevron-up" size="xs"
                />
                <FontAwesomeIcon 
                    style={active_down} 
                    onClick={() => changeQtde('decrease')} 
                    icon="chevron-down" size="xs"
                />
            </div>
        </div>
    )
}

export default ProductsQtde