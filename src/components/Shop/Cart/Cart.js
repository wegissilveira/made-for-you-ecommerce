import React from 'react'

import classes from './Cart.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ProductQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'
import * as actionTypes  from '../../../store/actions/actionTypes'

import cartListDataFn from '../../../Data/cartData'
import productsData from '../../../Data/productsData'


const Cart = props => {
    
    // let [update, setUpdate] = React.useState(0) 


    let products = []
    productsData.forEach(product => {
        props.cart.forEach(item => {
            if (item._id === product._id) {
                products.push(product)
            }
        })
    })

    const pricesArrState = products.map(item => parseFloat(item.price))
    

    // let [qtde, setQtde] = React.useState([])
    let [qtde, setQtde] = React.useState(() => {
        let arrQtde = []
        props.cart.map((item, index) => {
            return arrQtde[index] = item.qtde
        })

        return arrQtde
    })


    // Antes da possibilidade de salvar quantidade no carrinho 'qtde' era populada com o array abaixo. 
    // 'qtde' recebia um índice para cada produto no carrinho utilizando o length do array 'cartData'
    // Agora simplesmente utilizo o useEffect para inserir valores customizados
    // let [qtde, setQtde] = React.useState(Array(cartState.length).fill(1))

    // React.useEffect(() => {
    //     let arrQtde = [...qtde]
    //     props.cart.map((item, index) => {
    //         arrQtde[index] = item.qtde
    //     })

    //     setQtde(arrQtde)
    // }, [])

    // console.log(qtde)

    // const [pricesArrState, setPricesArrState] = React.useState([])
    // const [pricesArrState, setPricesArrState] = React.useState(() => {
    //     return products.map(item => parseFloat(item.price))
    // })

    // const [pricesArr, ] = React.useState(() => {
    //     return products.map(item => parseFloat(item.price))
    // })

    // console.log(pricesArr)
    
    
    // React.useEffect(() => {
    //     setPricesArrState(pricesArr)
    // }, [pricesArr]) 
    // }, [update])

    let finalPrice = 0
    pricesArrState.map((item, i) => {

        finalPrice = finalPrice + (item * qtde[i])
        return finalPrice
    })

    // Aqui eu atualizo a quantidade de produtos do item que ocupa a posição no array que está sofrendo a alteração.
    // Ou seja, se eu altero a quantidade do produto de índice 2, somente o índice 2 receberá a alteração e somente o preço total deste será alterado, já que o índice é utilizado para realizar o cálculo => qtde[i] * parseInt(product.price)
    // Caso eu não tivesse um array com uma posição para cada produto, eu teria somente uma state para todos, sendo assim, quando a quantidade de um alterasse, os preços de todos acompanhariam, já que se baseariam na mesma variável.
    // Poderia ter sido criada uma state para cada produto, mas isso, além de muito mais verboso que desta forma, só seria possível em caso do número de produtos ser fixo.
    const setQtdeHandler = (value, index) => {
        let arrQtde = [...qtde]

        arrQtde[index] = value

        setQtde(arrQtde)
    }

    const removeProductCartHandler = id => {
        
        let cartList = props.cart.filter(item => item._id !== id)

        // setUpdate(++update)

        localStorage.setItem('cartList', JSON.stringify(cartList))

        props.onCartListState()
    }





    return (
        <div className={classes.Session_container}>
            <h1>CART</h1>
            <div className={classes.Cart_container}>
                <div>
                    <p>PRODUCT</p>
                    <p>DISCOUNT</p>
                    <p>PRICE</p>
                    <p>QUANTITY</p>
                    <p>TOTAL</p>
                    <p></p>
                </div>
                {products.map((product, i) => {
                    return  <div key={i} className={classes.Cart_details}>
                                <div>
                                    <div>
                                        <img src={product.imgsDemo[0]} alt='img' />
                                    </div>

                                    <div>
                                        <p>{product.name}</p>
                                        <div className={classes.Cart_details_info}>
                                            <div>
                                                <p>Size</p>
                                                <p>Color</p>
                                            </div>
                                            <div>
                                                <p>{props.cart[i].size}</p>
                                                <p>{props.cart[i].color}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p>0%</p>
                                <p>$ {product.price}</p>
                                <div>
                                    <ProductQtde 
                                        startQtde={props.cart[i].qtde}
                                        changeQtdeCallBack={qtde => setQtdeHandler(qtde, i)} 
                                    />
                                </div>
                                <p>$ {(qtde[i] * parseFloat(product.price)).toFixed(2)}</p>
                                <p>
                                    <FontAwesomeIcon
                                        onClick={() => removeProductCartHandler(product._id)}
                                        className={classes.Cart_delete_icon}
                                        icon="times"
                                    />
                                </p>
                                <div>
                                    <div>
                                        <p>1</p>
                                    </div>
                                    <p>$ {product.price}</p>
                                </div>
                            </div>
                    })
                }

                <div>
                    <Link to="/shop/">
                        <p className={classes.Cart_dark_button}>
                            <FontAwesomeIcon icon="long-arrow-alt-left" />
                            <span>CONTINUE COMPRANDO</span>
                        </p>
                    </Link>
                </div>
                <div className={classes.Form_cart_container}>
                    <div>
                        <p>COUPON DISCOUNT</p>
                        <p>Enter your coupon code if you have one</p>
                        <input placeholder="Enter your code"/>
                        <p className={classes.Cart_light_button}>APPLY COUPON</p>
                    </div>
                    <div>
                        <p>CALCULATE SHIPPING</p>
                        <select>
                            <option>Argentina</option>
                            <option>Brazil</option>
                            <option>Germany</option>
                            <option>United States</option>
                        </select>
                        <input placeholder="State/Country" />
                        <input placeholder="Town/City" />
                        <input placeholder="Postcode/ZIP" />
                        <p className={classes.Cart_light_button}>UPDATE</p>
                    </div>
                    <div>
                        <div>
                            <div className={classes.Form_cart_price_container}>
                                <div>
                                    <p>SUBTOTAL</p>
                                    <p>$ {finalPrice.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p>SHIPPING</p>
                                    <p>$ 20.00</p>
                                </div>
                                <div>
                                    <p>TOTAL</p>
                                    <p>$ 40.00</p>
                                </div>
                            </div>
                        </div>
                        <p className={classes.Cart_dark_button} >PROCEED TO CHECKOUT</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        cart: state.cartListState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCartListState: () => dispatch({type: actionTypes.CARTLIST, value: cartListDataFn()})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)