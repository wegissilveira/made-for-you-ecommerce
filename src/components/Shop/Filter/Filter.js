import React, { Fragment } from 'react'

import classes from './Filter.module.css'

import ColorSelect from '../../Shared/UI/ColorSelect/ColorSelect'
import Products from '../../Shared/Products/Products';
import PriceSlider from './PriceSlider/PriceSlider'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Animated} from "react-animated-css"


const Filter = props => {

    // Sobre o filtro por cores:
    // As imagens de ‘products’ não são as mesmas dos sliders, o que torna um pouco mais complicado mostrar a imagem do produto com a cor específica, ainda que exista a opção de tal cor.
    // Preciso decidir se mostro a imagem original, deixando implícito que existe uma variação do produto apresentado na cor desejada, então o usuário entraria na página do produto pra ver os detalhes, inclusive a cor que busca; ou se crio uma variação das imagens e possibilito a alteração da imagem apresentada para que a variação com a cor buscada apareça.
    // A primeira opção está bem simples de ser realizada, mas a segunda talvez melhore a UX. O que devo considerar é se o trabalho de fazer isso vale a pena.
    // Vou pensar em como fazer e depois decido se vale ou não a pena.
    // Quanto ao filtro por cores, vou ficar ocm a primeira opção, pois como as imagens tem dimensões diferentes a segunda opção implicaria a distorção das imagens em algumas das páginas, seja no slider ou em 'products', ou utilizar a imagem quadrada e centralizá-la dentro de uma div em 'products', o que eu não achei interessante.
    // Para preencher o vazio deixado pelas imagens quadradas seria possível utilizar um fundo colorido como alternativa.
    // A outra opção seria utilizar imagens quadradas em 'products', resolveria o problema, mas esteticamente prefiro as retangulares.
    // O ideal a meu ver é manter imagens distintas para cada área e, em case de haver área administrativa, deixar alertado as dimensões ideais das imagens em cada área, mas também possibilitando as demais opções, seja com as imagens uniformes ou com as quadradas centralizadas em uma div em 'products'. Isso daria liberdade ao administrador e o permitiria realizar aquilo que le agrada mais.
    // Aqui eu manterei de maneira estática como já está feito e a seleção por cores será como foi descrita na primeira opção.
    /* */


    let [filterOpen, setFilterOpen] =  React.useState(false)

    let [translateValue, setTranslateValue] = React.useState(-110)
    let [translateProductsValue, setTranslateProductsValue] = React.useState(-436)

    /* Slider Price */
    const sliderRef = React.useRef()

    const initial_min_value = 5 // => Valor inicial do preço mínimo
    const initial_max_value = 1290 // => Valor inicial do preço máximo

    let [min_value, setMinValue] =  React.useState(initial_min_value)
    let [max_value, setMaxValue] =  React.useState(initial_max_value)

    /* */

    /* Demais filtros */
    let [tag, setTag] = React.useState('all')
    let [category, setCategory] = React.useState('all')
    let [checkColor, setCheckColor] =  React.useState(true)
    let [productColor, setProductColor] = React.useState('') // => Armazena cor selecionada do produto
    let [productColorStep, setProductColorStep] = React.useState('') // => Armazena cor selecionada do produto
    let [offer, setOffer] = React.useState([])
    let [order, setOrder] = React.useState('default')
    /* */

    const categoriesRef = React.useRef()
    const typesRef = React.useRef()
    const offerRef = React.useRef()
    const selectRef = React.useRef()

    const [display, setDisplay] = React.useState('none')

    const translateFilter = {
        transform: `translateY(${translateValue}%)`,
        // display: display,
        transition: '.8s ease-in-out'
    }

    const translateProducts = {
        transform: `translateY(${translateProductsValue}px)`,
        // display: display,
        transition: '.8s ease-in-out'
    }

    const openFilterHandler = () => {
        filterOpen ? setFilterOpen(false) : setFilterOpen(true)

        translateValue < 0 ? setTranslateValue(0) : setTranslateValue(-110)
        translateProductsValue < 0 ? setTranslateProductsValue(0) : setTranslateProductsValue(-436)
    }

    const setPriceRange = values => {
        setMinValue(values[0])
        setMaxValue(values[1])
    }

    // Explicação em 'ProductCard'
    const selectColorHandler = (color) => {
        setProductColorStep(color)
        setProductColor(color)
        setCheckColor(false)
    }

    // Controlando o checkbox de cores
    const setCheckColorHandler = (check) => {
        check ? setProductColor('') : setProductColor(productColorStep)
        setCheckColor(check)
    }


    // Categorias
    let categoriesTotalQtde = 0
    let livingRoomQtde = 0
    let bedRoomQtde = 0
    let bathRoomQtde = 0
    let kitchen = 0
    let childrenRoom = 0

    // Tipos
    let typesTotalQtde = 0
    let furnitureQtde = 0
    let accessoriesQtde = 0
    let decorationsQtde = 0
    let textileQtde = 0
    let lightingQtde = 0

    // Atualizando quantidade de produtos separados por tipos e categorias
    props.products.map(product => {

        //Categorias
        categoriesTotalQtde++

        for (let i in product) {
            if (product[i].toString().match('living-room')) {
                livingRoomQtde++
            }
            if (product[i].toString().match('bedroom')) {
                bedRoomQtde++
            }
            if (product[i].toString().match('bathroom')) {
                bathRoomQtde++
            }
            if (product[i].toString().match('kitchen')) {
                kitchen++
            }
            if (product[i].toString().match('children-room')) {
                childrenRoom++
            }
        }

        // Tipos
        typesTotalQtde++

        for (let i in product) {
            if (product[i].toString().match('furniture')) {
                furnitureQtde++
            }
            if (product[i].toString().match('accessories')) {
                accessoriesQtde++
            }
            if (product[i].toString().match('decorations')) {
                decorationsQtde++
            }
            if (product[i].toString().match('textile')) {
                textileQtde++
            }
            if (product[i].toString().match('lightning')) {
                lightingQtde++
            }
        }

    })

    // Atualiza as states de categoria e tag e torna 'bold' o item selecionado na UI para que se destaque dos não selecionados
    const setFilterDetails = (e, block, arg) => {

        block === 'cat' ? setCategory(arg) : setTag(arg)

        let elementsArr = Array.from(e.target.parentNode.children)

        elementsArr.map(element => {
            element.style.fontWeight = 'normal'
        })

        e.target.style.fontWeight = 'bold'
    }

    // Atualiza state 'offer', responsável por filtrar produtos pelo tipo de oferta
    const setOfferHandler = e => {

        let inputValuesArr = [...offer]
        const input = e.target

        if (input.checked) {
            inputValuesArr.push(input.value)
        } else {
            inputValuesArr = inputValuesArr.filter(value => value !== input.value)
        }

        setOffer(inputValuesArr)
    }

    // Reseta todas as especificações do filtro para os valores iniciais
    const cleanFiltersHandler = () => {

        const selectList = Array.from(selectRef.current.children)
        const categoriesList = Array.from(categoriesRef.current.children)
        const typesList = Array.from(typesRef.current.children)
        const offerList = Array.from(offerRef.current.children)

        selectList.map((element, i) => {
            if (i === 0) {
                element.selected = true
            } else {
                element.selected = false
            }
        })

        categoriesList.map((element, i) => {
            i === 1 ? element.style.fontWeight = 'bold' : element.style.fontWeight = 'normal'
        })

        typesList.map((element, i) => {
            i === 1 ? element.style.fontWeight = 'bold' : element.style.fontWeight = 'normal'
        })

        offerList.map(element => {

            if (element.tagName === 'DIV') {
                Array.from(element.children).map(el => {

                    if (el.tagName === 'INPUT') {
                        el.checked = false
                    }
                })
            }

        })

        setOrder('default')
        setTag('all')
        setCategory('all')
        setCheckColor(true)
        setProductColor('')
        setOffer([])

        sliderRef.current.resetPriceSlider()
    }

    const filterButtonStyle = [classes.Filter_button, classes.Filter_button_active]




    return (
        <Fragment>
            <div className={classes.Filter_container}>
                <div className="d-flex justify-content-between">
                    <div onClick={() => openFilterHandler()}
                        className={`border ${classes.Filter_switch}`}
                    >
                        { filterOpen === false ?
                            <Fragment>
                                <FontAwesomeIcon icon="filter"/>
                                <p>OPEN FILTERS</p>
                            </Fragment>
                          :
                            <Fragment>
                                <FontAwesomeIcon icon="times" />
                                <p>CLOSE FILTERS</p>
                            </Fragment>
                        }

                    </div>
                    <div className={classes.Filter_sort}>
                        {/* Decidir se esta parte ficará realmente aqui, já que depende do 'length' de 'products' que foi retornado pelo filtro. Também pensar se é necessário, talvez eu simplesmente insira o total de produtos retornados */}
                        <p>Showing 1 - 9 of 19 (ILUSTRATIVO)</p>
                        <p>Sort by</p>
                        <select onChange={e => setOrder(e.target.value)} ref={selectRef}>
                            <option value="default">Default Sorting</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                            <option value="alphabetical">Alphabetical Order</option>
                        </select>
                    </div>
                </div>
                {/* { filterOpen ?
                <Animated
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    isVisible={filterOpen}
                >  */}
                <div style={{overflow: 'hidden', paddingLeft: '2%', paddingRight: '2%'}}>
                {/* { filterOpen ? <div> */}
                    <div style={translateFilter}>
                        <div className="mt-5 mb-5 d-flex justify-content-between row">
                            <div className={classes.Sub_filter_type} ref={categoriesRef}>
                                <h6>CATEGORIES</h6>
                                <p onClick={e => setFilterDetails(e, 'cat', 'all')} style={{fontWeight:'bold'}}>All categories ({categoriesTotalQtde}) </p>
                                <p onClick={e => setFilterDetails(e, 'cat', 'bedroom')}>Bedroom ({bedRoomQtde}) </p>
                                <p onClick={e => setFilterDetails(e, 'cat', 'living-room')}>Living room ({livingRoomQtde}) </p>
                                <p onClick={e => setFilterDetails(e, 'cat', 'kitchen')}>Kitchen ({kitchen}) </p>
                                <p onClick={e => setFilterDetails(e, 'cat', 'bathroom')}>Bathroom ({bathRoomQtde}) </p>
                                <p onClick={e => setFilterDetails(e, 'cat', 'children-room')}>Children's room ({childrenRoom}) </p>
                            </div>
                            <div className={classes.Divider}></div>
                            <div className={classes.Sub_filter_type} ref={typesRef}>
                                <h6>TYPE</h6>
                                <p onClick={e => setFilterDetails(e, 'type', 'all')} style={{fontWeight:'bold'}}>All tags ({typesTotalQtde}) </p>
                                <p onClick={e => setFilterDetails(e, 'type', 'furniture')}>Furniture ({furnitureQtde}) </p>
                                <p onClick={e => setFilterDetails(e, 'type', 'accessories')}>Accessories ({accessoriesQtde}) </p>
                                <p onClick={e => setFilterDetails(e, 'type', 'decorations')}>Decorations ({decorationsQtde}) </p>
                                <p onClick={e => setFilterDetails(e, 'type', 'textile')}>Textile ({textileQtde}) </p>
                                <p onClick={e => setFilterDetails(e, 'type', 'lightning')}>Lighting ({lightingQtde}) </p>
                            </div>
                            <div className={classes.Divider}></div>
                            <div className="d-flex flex-column" ref={offerRef}>
                                <h6>OUR OFFER</h6>
                                <div>
                                    <input type="checkbox" value="new" onChange={e => setOfferHandler(e)}/>
                                    <label className="ml-2">New Products</label>
                                </div>
                                <div>
                                    <input type="checkbox" value="old" onChange={e => setOfferHandler(e)}/>
                                    <label className="ml-2">Old Products</label>
                                </div>
                                <div>
                                    <input type="checkbox" value="best-seller" onChange={e => setOfferHandler(e)}/>
                                    <label className="ml-2">Best Sellers</label>
                                </div>
                                <div>
                                    <input type="checkbox" value="sales" onChange={e => setOfferHandler(e)}/>
                                    <label className="ml-2">Sales</label>
                                </div>
                            </div>
                            <div className={classes.Divider}></div>
                            <div className="col-3">
                                <h6>COLOR</h6>
                                <input type="checkbox" onChange={() => setCheckColorHandler(!checkColor)} checked={checkColor}/>
                                <label className="ml-2">Todas as cores</label>
                                <ColorSelect
                                    title={'COLOR'}
                                    colors={['red', 'yellow', 'blue', 'purple', 'green']}
                                    selectColorHandlerCallback={(color) => selectColorHandler(color, false)}
                                />
                            </div>
                            <div className={classes.Divider}></div>

                            <PriceSlider 
                                rangeValues={setPriceRange} 
                                ref={sliderRef}
                                minValue={initial_min_value}
                                maxValue={initial_max_value}
                            />
                        </div>
                    {/* criar toggle entre os botões para serem ativos ou não */}
                    <div className={classes.Filter_button_container}>
                        <p className={filterButtonStyle.join(' ')}>FILTER</p>
                        <p className={classes.Filter_button} onClick={() => cleanFiltersHandler()}>CLEAR ALL</p>
                    </div>
                {/* </div> : null} */}
                </div>
                </div>

                {/* </Animated> : null} */}
                <div style={translateProducts}>
                <Products
                    // products={products} // => Envia o array com os produtos que serão exibidos
                    pageLimit={12}  // => Número limite de produtos a serem mostrados inicialmente
                    tag={tag} // => Tag que determina quais produtos serão mostrados
                    category={category} // => Categoria dos produtos que serão mostrados
                    valueRange={[min_value, max_value]} // => Intervalo de preço que determinará os produtos que serão mostrados
                    productColor={productColor} // => Filtra o produto por cor
                    offer={offer} // => Filtra os produtos por tipo de oferta
                    order={order}
                />
                </div>
            </div>
        </Fragment>
    )
}

export default Filter