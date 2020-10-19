import React from 'react'

import classes from './Cart.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

// import Products from '../../Shared/Products/Products'
import ProductQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'

import cartData from '../../../Data/cartData'
import productsData from '../../../Data/productsData'


const Cart = props => {
    // console.log(cartData)
    let [cartState, setCart] = React.useState(cartData)

    let products = []
    productsData.map(product => {
        if (cartState.includes(product._id)) {
            products.push(product)
        }
    })

    const pricesArr = products.map(item => parseFloat(item.price))
    // const pricesArr = cartData.map(item => parseFloat(item.price))

    // Preencho um array com um índice para cada produto no carrinho utilizando o length do array 'cartData'
    let [qtde, setQtde] = React.useState(Array(cartState.length).fill(1))
    const [pricesArrState, setPricesArrState] = React.useState(pricesArr)
    // let [finalPrice, setFinalPrice] = React.useState(0)
    // console.log(pricesArrState)

    let finalPrice = 0
    pricesArrState.map(item => {
        
        // setFinalPrice(finalPrice + parseFloat(item))
        finalPrice = finalPrice + parseFloat(item)
        return finalPrice
    })

    // Aqui eu atualizo a quantidade de produtos do item que ocupa a posição no array que está sofrendo a alteração.
    // Ou seja, se eu altero a quantidade do produto de índice 2, somente o índice 2 receberá a alteração e somente o preço total deste será alterado, já que o índice é utilizado para realizar o cálculo => qtde[i] * parseInt(product.price)
    // Caso eu não tivesse um array com uma posição para cada produto, eu teria somente uma state para todos, sendo assim, quando a quantidade de um alterasse, os preços de todos acompanhariam, já que se baseariam na mesma variável.
    // Poderia ter sido criada uma state para cada produto, mas isso, além de muito mais verboso que desta forma, só seria possível em caso do número de produtos ser fixo.
    const setQtdeHandler = (value, index) => {
        let arrQtde = [...qtde]
        let arrPrices = [...pricesArrState]

        let newPrice = (arrPrices[index] / arrQtde[index]) * value
        arrPrices[index] = newPrice
        arrQtde[index] = value
        
        setPricesArrState(arrPrices)
        setQtde(arrQtde)
    }
    


    return (
        <div className={classes.Session_container}>
            <h1 className="text-center mb-5 mt-5">CART</h1>
            <div className={classes.Cart_details_container}>
                <div className="
                        d-flex 
                        justify-content-between 
                        row 
                        order-bottom 
                        text-secondary 
                        font-weight-bold
                    "
                >
                    <p className="col-4">PRODUCT</p>
                    <p className="col-2">DISCOUNT</p>
                    <p className="col-2">PRICE</p>
                    <p className="col-2">QUANTITY</p>
                    <p>TOTAL</p>
                </div>
                {products.map((product, i) => {
                    return  <div key={i} className={`row mt-3 ${classes.Cart_details}`}>
                                <div className={`col-4 ${classes.Cart_details_product_container}`}>
                                    
                                    <div className={classes.Cart_details_product_image_container}>
                                        <img className={classes.Cart_details_product_image} src={product.imgsDemo[0]} alt='img' />
                                    </div>

                                    <div className={`mb-1 ${classes.Cart_details_product_description_container}`}
                                    >
                                        <p className="font-weight-bold">{product.name}</p>
                                        <div>
                                            <div className="text-secondary">
                                                <p className="mb-2">Size</p>
                                                <p>Color</p>
                                            </div>
                                            <div className="ml-3">
                                                <p className="mb-2">100 x 100</p>
                                                <p>Pink</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="font-weight-bold col-2">0%</p>
                                <p className="font-weight-bold col-2">$ {product.price}</p>
                                <div className="col-2">
                                    <ProductQtde changeQtdeCallBack={qtde => setQtdeHandler(qtde, i)} />
                                </div>
                                
                                <p className="font-weight-bold">$ {(qtde[i] * parseFloat(product.price)).toFixed(2)}</p>
                                {/* <p className="font-weight-bold">$ {qtde[i]}</p> */}
                                {/* <p className="font-weight-bold">$ {(parseFloat(product.price))}</p> */}
                            </div>
                })
                  
                }
                <div className="
                        d-flex 
                        justify-content-between 
                        mt-5 
                        border-bottom
                    "
                >
                    <Link to="/shop/">
                        <p className={classes.Cart_dark_button}>
                            <FontAwesomeIcon icon="long-arrow-alt-left" />
                            <span>CONTINUE COMPRANDO</span>
                        </p>
                    </Link>
                    <p className={classes.Cart_light_button}>
                        <FontAwesomeIcon icon="sync-alt" />
                        <span>UPDATE CART</span>
                    </p>
                </div>
                <div className={`row mt-4 mr-0 ml-0 ${classes.Form_cart_container}`}>
                    <div className={`col-4 pl-0 ${classes.Form_cart_first_column}`}>
                        <p>COUPON DISCOUNT</p>
                        <p>Enter your coupon code if you have one</p>
                        <input placeholder="Enter your code"/>
                        <p className={classes.Cart_light_button}>APPLY COUPON</p>
                    </div>
                    <div className={`col-4 ${classes.Form_cart_second_column}`}>
                        <p>CALCULATE SHIPPING</p>
                        <select
                            className="
                                select-cart
                                border-left-0 
                                border-right-0
                                border-top-0
                                border-bottom"
                        >
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
                    <div className={`col-4 pr-0 ${classes.Form_cart_third_column}`}>
                        <div className="border">
                            <div className={classes.Form_cart_total_container}>
                                <div className="border-bottom">
                                    <p>SUBTOTAL</p>
                                    <p>$ {finalPrice.toFixed(2)}</p>
                                </div>
                                <div className="border-bottom">
                                    <p>SHIPPING</p>
                                    <p>$ 20.00</p>
                                </div>
                                <div>
                                    <p>TOTAL</p>
                                    <p>$ 40.00</p>
                                </div>
                            </div>
                        </div>
                        <p className={classes.Cart_dark_button} style={{width: '100%'}}>PROCEED TO CHECKOUT</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart