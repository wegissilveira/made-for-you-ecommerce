import React from 'react'

import classes from './ProductQtdeMobile.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductQtdeMobile = props => {

    let [productQtde, setProductQtde] = React.useState(1)
    let [id, setId] = React.useState('product_qtde')
    let [maxQtde, setMaxQtde] = React.useState([])

    const changeQtdeHandler = e => {
        const tagName = e.target.tagName
        
        let input_value
        if (tagName === 'INPUT') {
            input_value = Number(e.target.value)
        } else if (tagName === 'DIV') {
            input_value = Number(e.target.children[1].value)
        } else if (tagName === 'LABEL') {
            input_value = Number(e.target.parentNode.children[1].value)
        }

        props.changeQtdeCallBack(input_value)
        toggleQtdeSelectMobileHandler()
    }

    const toggleQtdeSelectMobileHandler = () => {
        const select = document.getElementById(id)

        if (select.style.display === 'flex') {
            select.style.display = 'none'
        } else {
            select.style.display = 'flex'
        }
    }

    React.useEffect(() => {
        if (props.startQtde !== undefined) {
            setProductQtde(props.startQtde)
        }
    }, [props.startQtde])

    React.useEffect(() => {
        if (props.id) {
            setId(`product_qtde-${props.id}`)
        }
    }, [])

    React.useEffect(() => {
        let listArray 
        if (props.max) {
            listArray = Array.from(Array(props.max).keys())
        } else {
            listArray = Array.from(Array(10).keys())
        }

        setMaxQtde(listArray)
    }, [])




    return (
        <div className={classes.ProductQtde_mobile_container}>
            <div 
                onClick={() => toggleQtdeSelectMobileHandler()}
                className={classes.OpenSelect_btn}
            >
                <p>{productQtde}</p>
                <FontAwesomeIcon icon="chevron-down" size="xs"/>
            </div>
            <div 
                id={id}
                className={classes.selectList_container}
            >
                <div 
                    className={classes.selectList_subContainer}
                >
                    <div className={classes.SelectList_header}>
                        <h3>Select Quantity</h3>
                        <FontAwesomeIcon 
                            onClick={() => toggleQtdeSelectMobileHandler()}
                            icon="times" 
                            size="2x" 
                        />
                    </div>
                    <div  onClick={e => changeQtdeHandler(e)} className={classes.selectList_items}>
                        {
                            maxQtde.map((item, i) => {
                                return (
                                    <div key={item+i}>
                                        <label>{i+1}</label>
                                        <input 
                                            type="radio" 
                                            value={i+1} 
                                            checked={productQtde === i+1}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductQtdeMobile