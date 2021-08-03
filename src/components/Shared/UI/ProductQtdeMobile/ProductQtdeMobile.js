import React from 'react'

import classes from './ProductQtdeMobile.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductQtdeMobile = props => {

    let [productQtde, setProductQtde] = React.useState(1)
    let [id, setId] = React.useState('product_qtde')

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
                        <h3>Select Quantity: {props.index}</h3>
                        <FontAwesomeIcon 
                            onClick={() => toggleQtdeSelectMobileHandler()}
                            icon="times" 
                            size="2x" 
                        />
                    </div>
                    <div  onClick={e => changeQtdeHandler(e)} className={classes.selectList_items}>
                        <div>
                            <label>1</label>
                            <input type="radio" value={1} checked={productQtde === 1}/>
                        </div>
                        <div>
                            <label>2</label>
                            <input type="radio" value={2} checked={productQtde === 2}/>
                        </div>
                        <div>
                            <label>3</label>
                            <input type="radio" value={3} checked={productQtde === 3}/>
                        </div>
                        <div>
                            <label>4</label>
                            <input type="radio" value={4} checked={productQtde === 4}/>
                        </div>
                        <div>
                            <label>5</label>
                            <input type="radio" value={5} checked={productQtde === 5}/>
                        </div>
                        <div>
                            <label>6</label>
                            <input type="radio" value={6} checked={productQtde === 6}/>
                        </div>
                        <div>
                            <label>7</label>
                            <input type="radio" value={7} checked={productQtde === 7}/>
                        </div>
                        <div>
                            <label>8</label>
                            <input type="radio" value={8} checked={productQtde === 8}/>
                        </div>
                        <div>
                            <label>9</label>
                            <input type="radio" value={9} checked={productQtde === 9}/>
                        </div>
                        <div>
                            <label>10</label>
                            <input type="radio" value={10} checked={productQtde === 10}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ProductQtdeMobile