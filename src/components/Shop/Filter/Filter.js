import React, { Fragment } from 'react'

import classes from './Filter.module.css'

import Toastify from '../../Shared/UI/Toastify/Toastify'
import ColorSelect from '../../Shared/UI/ColorSelect/ColorSelect'
import Products from '../../Shared/Products/Products';
import PriceSlider from './PriceSlider/PriceSlider'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const initial_min_value = 5 // => Valor inicial do preço mínimo
const initial_max_value = 1290 // => Valor inicial do preço máximo

const _ = undefined

const toastifyMsg = [
    'Reload The Page',
    'In order for all components to adjust to the new screen dimensions, the page should be reloaded.'
]

const Filter = props => {

    let [pageLimit, setPageLimit ] = React.useState(12)
    const [filter_height, setFilterHeight] = React.useState()
    const [containerHeight, setContainerHeight] = React.useState()

    let [filterOpen, setFilterOpen] =  React.useState(false)
    
    let [translateValue, setTranslateValue] = React.useState()

    let [resize, setResize] = React.useState(true)
    
    /* Slider Price */
    let [min_value, setMinValue] =  React.useState(initial_min_value)
    let [max_value, setMaxValue] =  React.useState(initial_max_value)

    /* Demais filtros */
    let [tag, setTag] = React.useState('all-products')
    let [category, setCategory] = React.useState('all')
    let [checkColor, setCheckColor] =  React.useState(true)
    let [productColor, setProductColor] = React.useState('') // => Armazena cor selecionada do produto
    let [productColorStep, setProductColorStep] = React.useState('') // => Armazena cor selecionada do produto
    let [offer, setOffer] = React.useState([])
    let [order, setOrder] = React.useState('default')
    /* */
    
    const containerRef = React.useRef()
    const filterRef = React.useRef()
    const sliderRef = React.useRef()
    const categoriesRef = React.useRef()
    const typesRef = React.useRef()
    const offerRef = React.useRef()
    const selectRef = React.useRef()


    const translateFilter = {
        transform: `translateY(${translateValue}px)`,
        transition: '.8s ease-in-out'
    }

    const containerStyle = {
        height: containerHeight+'px'
    }

    const containerHeightHandler = (cHeight=containerHeight, fHeight=filter_height, open=filterOpen, addRow) => {
        let height
        if (addRow) {
            height = addRow[0] === 'more' ? containerHeight + addRow[1] : containerHeight - addRow[1]
        }  else {
            height = open ? containerHeight + fHeight : cHeight - fHeight
        }

        setContainerHeight(height)
    }
    
    const openFilterHandler = () => {
        const open = filterOpen ? false : true
        const translate = translateValue < 0 ? 0 : -filter_height
        
        setFilterOpen(open)   
        setTranslateValue(translate)    
        containerHeightHandler(_,_,open) 
    }

    const setPriceRange = values => {
        setMinValue(values[0])
        setMaxValue(values[1])
    }

    const selectColorHandler = color => {
        setProductColorStep(color)
        setProductColor(color)
        setCheckColor(false)
    }

    const setCheckColorHandler = check => {
        const checked = check ? '' : productColorStep

        setCheckColor(check)
        setProductColor(checked)
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

    props.products.forEach(product => {
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

    const setProductTypeHandler = (e, block, arg) => {

        block === 'cat' ? setCategory(arg) : setTag(arg)

        let elementsArr = Array.from(e.target.parentNode.children)

        elementsArr.forEach(element => {
            element.style.fontWeight = 'normal'
        })

        e.target.style.fontWeight = 'bold'
    }

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

    const cleanFiltersHandler = () => {

        const selectList = Array.from(selectRef.current.children)
        const categoriesList = Array.from(categoriesRef.current.children)
        const typesList = Array.from(typesRef.current.children)
        const offerList = Array.from(offerRef.current.children)

        selectList.forEach((element, i) => {
            if (i === 0) {
                element.selected = true
            } else {
                element.selected = false
            }
        })

        categoriesList.forEach((element, i) => {
            i === 1 ? element.style.fontWeight = 'bold' : element.style.fontWeight = 'normal'
        })

        typesList.forEach((element, i) => {
            i === 1 ? element.style.fontWeight = 'bold' : element.style.fontWeight = 'normal'
        })

        offerList.forEach(element => {

            if (element.tagName === 'DIV') {
                Array.from(element.children).forEach(el => {

                    if (el.tagName === 'INPUT') {
                        el.checked = false
                    }
                })
            }

        })

        setOrder('default')
        setTag('all-products')
        setCategory('all')
        setCheckColor(true)
        setProductColor('')
        setOffer([])

        sliderRef.current.resetPriceSlider()
    }

    const filterButtonStyle = [classes.Filter_button, classes.Filter_button_active]

    const filter_toggle = 
        filterOpen === false ? 
            ['OPEN FILTERS', 'filter'] :
            ['CLOSE FILTERS', 'times']    

    let [openToastify, setOpenToastify] = React.useState(false)

    const callResizeAlert = () => {// alert('Atualize a página para que todos os componentes se ajustem às novas dimensões. Essa mensagem não aparecerá novamente nesta sessão.')
        setOpenToastify(true)
        setTimeout(() => {
            setOpenToastify(false)
        }, 5000)
        setResize(false)
        sessionStorage.setItem('warned', true)
    }

    const reportWindowSize = () => {    
        const fHeight = filterRef.current.offsetHeight

        setTranslateValue(-fHeight)
        setFilterHeight(fHeight)

        setTimeout(() => {
            const containerHeight = containerRef.current.offsetHeight
            containerHeightHandler(containerHeight, fHeight)
        }, 30)
    }
    
    React.useEffect(() => {
        reportWindowSize()
    }, [])

    React.useEffect(() => {

        sessionStorage.removeItem('rendered')

        setTimeout(() => {
            sessionStorage.setItem('rendered', true)
        }, 1000)
    }, [])
    
    React.useEffect(() => {
        const warned = sessionStorage.getItem('warned')
        if (warned) {
            setResize(false)
        }
    }, [])
    

    const observer = React.useRef(
        new ResizeObserver(() => {
            let rendered = sessionStorage.getItem('rendered')
            if (rendered) {
                callResizeAlert()
            }
        })
    )

    React.useEffect(() => {
        if (containerRef.current) {
            const body = document.getElementsByTagName('BODY')[0]
            if (resize) {
                observer.current.observe(body)
            } else {
                observer.current.unobserve(body) 
            }
        }
    })

    React.useEffect(() => {
        if (window.matchMedia('(max-width: 480px)').matches) {
            setPageLimit(6)
        } else if (window.matchMedia('(max-width: 768px)').matches) {
            setPageLimit(8)
        }
    }, [])

   

    return (
        <Fragment>
            <Toastify 
                toastifyDetails={toastifyMsg}
                open={openToastify}
            />
            <div className={classes.Filter_container} ref={containerRef} style={containerStyle}>
                <div className={classes.FilterHeader}>
                    <div onClick={() => openFilterHandler()}
                        className={classes.Filter_toggle}
                    >
                        <FontAwesomeIcon icon={filter_toggle[1]}/>
                        <p>{filter_toggle[0]}</p>
                    </div>
                    <div className={classes.Filter_sort}>
                        <p>Sort by</p>
                        <select 
                            onChange={e => setOrder(e.target.value)} 
                            ref={selectRef}
                        >
                            <option value="default">Default Sorting</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                            <option value="alphabetical">Alphabetical Order</option>
                        </select>
                    </div>
                </div>
                <div style={translateFilter}>
                    <div 
                        className={classes.Filter_subContainer} 
                        ref={filterRef}
                    >
                        <div className={classes.Filter_Blocks}>
                            <div ref={categoriesRef}>
                                <h6>CATEGORIES</h6>
                                <p onClick={e => setProductTypeHandler(e, 'cat', 'all')}>All categories ({categoriesTotalQtde}) </p>
                                <p onClick={e => setProductTypeHandler(e, 'cat', 'bedroom')}>Bedroom ({bedRoomQtde}) </p>
                                <p onClick={e => setProductTypeHandler(e, 'cat', 'living-room')}>Living room ({livingRoomQtde}) </p>
                                <p onClick={e => setProductTypeHandler(e, 'cat', 'kitchen')}>Kitchen ({kitchen}) </p>
                                <p onClick={e => setProductTypeHandler(e, 'cat', 'bathroom')}>Bathroom ({bathRoomQtde}) </p>
                                <p onClick={e => setProductTypeHandler(e, 'cat', 'children-room')}>Children's room ({childrenRoom}) </p>
                            </div>
                            <div></div>
                            <div ref={typesRef}>
                                <h6>TYPE</h6>
                                <p onClick={e => setProductTypeHandler(e, 'type', 'all-products')}>All tags ({typesTotalQtde}) </p>
                                <p onClick={e => setProductTypeHandler(e, 'type', 'furniture')}>Furniture ({furnitureQtde}) </p>
                                <p onClick={e => setProductTypeHandler(e, 'type', 'accessories')}>Accessories ({accessoriesQtde}) </p>
                                <p onClick={e => setProductTypeHandler(e, 'type', 'decorations')}>Decorations ({decorationsQtde}) </p>
                                <p onClick={e => setProductTypeHandler(e, 'type', 'textile')}>Textile ({textileQtde}) </p>
                                <p onClick={e => setProductTypeHandler(e, 'type', 'lightning')}>Lighting ({lightingQtde}) </p>
                            </div>
                            <div></div>
                            <div ref={offerRef}>
                                <h6>OUR OFFER</h6>
                                <div>
                                    <input 
                                        type="checkbox"    
                                        value="new" 
                                        onChange={e => setOfferHandler(e)}
                                    />
                                    <label>New Products</label>
                                </div>
                                <div>
                                    <input 
                                        type="checkbox"    
                                        value="old" 
                                        onChange={e => setOfferHandler(e)}
                                    />
                                    <label>Old Products</label>
                                </div>
                                <div>
                                    <input 
                                        type="checkbox"    
                                        value="best-seller" 
                                        onChange={e => setOfferHandler(e)}
                                    />
                                    <label>Best Sellers</label>
                                </div>
                                <div>
                                    <input 
                                        type="checkbox"    
                                        value="sales" 
                                        onChange={e => setOfferHandler(e)}
                                    />
                                    <label>Sales</label>
                                </div>
                            </div>
                            <div></div>
                            <div className={classes.FilterColor_container}>
                                <h6>COLOR</h6>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        onChange={() => setCheckColorHandler(!checkColor)} 
                                        checked={checkColor}
                                    />
                                    <label>All available colors</label>
                                </div>
                                <ColorSelect
                                    title={'COLOR'}
                                    colors={['red', 'yellow', 'blue', 'purple', 'green']}
                                    selectColorHandlerCallback={color => selectColorHandler(color, false)}
                                />
                            </div>
                            <div></div>
                            <PriceSlider 
                                rangeValues={setPriceRange} 
                                ref={sliderRef}
                                minValue={initial_min_value}
                                maxValue={initial_max_value}
                            />
                        </div>
                        <div className={classes.Filter_buttons_container}>
                            <p className={filterButtonStyle.join(' ')}>FILTER</p>
                            <p 
                                className={classes.Filter_button} 
                                onClick={() => cleanFiltersHandler()}
                            > CLEAR ALL
                            </p>
                        </div>
                    </div>
                    <Products
                        // products={products} // => Envia o array com os produtos que serão exibidos
                        pageLimit={pageLimit}  // => Número limite de produtos a serem mostrados inicialmente
                        tag={tag} // => Tag que determina quais produtos serão mostrados
                        category={category} // => Categoria dos produtos que serão mostrados
                        valueRange={[min_value, max_value]} // => Intervalo de preço que determinará os produtos que serão mostrados
                        productColor={productColor} // => Filtra o produto por cor
                        offer={offer} // => Filtra os produtos por tipo de oferta
                        order={order}
                        filterOpen={containerHeightHandler}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default Filter