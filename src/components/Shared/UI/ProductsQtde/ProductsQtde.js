import React from 'react'

import classes from './ProductsQtde.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductsQtde = props => {

    let [productQtde, setProductQtde] = React.useState(1) // => Quantidade atual
    let [productQtdeMax, setProductQtdeMax] = React.useState(props.max) // => Quantidade máxima


    const changeQtde = arg => {
        if (arg === "increase") {
            setProductQtde(productQtde + 1)
            props.changeQtdeCallBack(productQtde + 1)

        } else if (arg === 'decrease') {            
            if (productQtde > 1) {
                setProductQtde(productQtde - 1)
                props.changeQtdeCallBack(productQtde - 1)
            } else {
                setProductQtde(1)
                props.changeQtdeCallBack(1)
            }
        }
    }
    

    return (
        <div className={`border ${classes.Product_qtde}`}>
            <p style={{margin: '0'}}>{productQtde}</p>
            <div className={classes.Product_qtde_arrows}>
                {/* Verificando se há um valor máximo, caso não haja a seta 'increase' estará ativada infinitamente */}
                {productQtdeMax !== undefined ?
                    (productQtde < productQtdeMax ?
                            <FontAwesomeIcon onClick={() => changeQtde('increase')} icon="chevron-up" size="xs"/>
                        :
                            <FontAwesomeIcon style={{color: '#ccc', cursor: 'default'}} icon="chevron-up" size="xs"/>)
                    :
                        <FontAwesomeIcon onClick={() => changeQtde('increase')} icon="chevron-up" size="xs"/>
                }
                
                {productQtde > 1 ? 
                        <FontAwesomeIcon onClick={() => changeQtde('decrease')} icon="chevron-down" size="xs"/> 
                    : 
                        <FontAwesomeIcon style={{color: '#ccc', cursor: 'default'}} icon="chevron-down" size="xs"/> 
                }
                
            </div>
        </div>
    )
}

export default ProductsQtde