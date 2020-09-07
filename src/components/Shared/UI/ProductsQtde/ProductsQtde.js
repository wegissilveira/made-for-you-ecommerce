import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductsQtde = props => {

    let [productQtde, setProductQtde] = React.useState(1)

    const changeQtde = arg => {
        if (arg === "increase") {
            setProductQtde(productQtde + 1)
            props.changeQtdeCallBack(productQtde + 1)
        } else if (arg === 'decrease') {
            productQtde > 1 ? setProductQtde(productQtde - 1) : setProductQtde(1)
            props.changeQtdeCallBack(productQtde - 1)
        }
    }


    return (
        <div className="product-qtde d-flex justify-content-around align-items-center border">
            <p style={{margin: '0'}}>{productQtde}</p>
            <div className="product-qtde-arrows d-flex flex-column justify-content-between" >
                <FontAwesomeIcon onClick={() => changeQtde('increase')} icon="chevron-up" size="xs"/>
                <FontAwesomeIcon onClick={() => changeQtde('decrease')} icon="chevron-down" size="xs"/>
            </div>
        </div>
    )
}

export default ProductsQtde