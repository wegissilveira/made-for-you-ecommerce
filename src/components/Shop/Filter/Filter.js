import React, { Fragment } from 'react'

import './Filter.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ColorSelect from '../../Shared/UI/ColorSelect/ColorSelect'
import Products from '../../Shared/Products/Products';


const Filter = props => {

    // Ainda faltam o ‘our offer’, que tenho que decidir se existirá e, caso seja mantido, decidir como será, provavelmente entrará na propriedade ‘tag’, ou posso criar uma nova propriedade, como fiz com ‘deal’, pensando bem a segunda opção é melhor. 
    // Também falta determinar como a seleção de cores se comportará, já que as imagens de ‘products’ não são as mesmas dos sliders, o que torna um pouco mais complicado mostrar a imagem do produto com a cor específica, ainda que a exista a opção de tal cor.
    // Preciso decidir se mostro a imagem original, deixando implícito que existe uma variação do produto apresentado na cor desejada, então o usuário entraria na página do produto pra ver os detalhes, inclusive a cor que busca; ou se crio uma variação das imagens e possibilito a alteração da imagem apresentada para que a variação com a cor buscada apareça.
    // A primeira opção está bem simples de ser realizada, mas a segunda talvez melhore a UX. O que devo considerar é se o trabalho de fazer isso valha a pena. 
    // Vou pensar em como fazer e depois decido se vale ou não a pena.
    // Além disso falta criar um método pra limpar o filtro, mas isso vai ser a última coisa, já que é bem simples e quando criar já terei todas as variáveis para trabalhar.


    const initial_position = 1204 // => Valor inicial do thumb esquerdo
    const end_position = 1403 // => Valor final do thumb direito
    const initial_min_value = 5 // => Valor inicial do preço mínimo
    const initial_max_value = 1290 // => Valor inicial do preço máximo

    let [filterOpen, setFilterOpen] =  React.useState(false)

    let [tag, setTag] = React.useState('all')
    let [category, setCategory] = React.useState('all')

    let [thumb1_position, setValueThumb1] =  React.useState(initial_position)
    let [thumb2_position, setValueThumb2] =  React.useState(end_position)
    let [min_value, setMinValue] =  React.useState(initial_min_value)
    let [max_value, setMaxValue] =  React.useState(initial_max_value)
    let [move, setMove] =  React.useState(false) // => habilita os thumbs a serem movidos

    let [productColor, setProductColor] = React.useState('') // => Armazena cor selecionada do produto


    const openFilterHandler = () => {
        filterOpen ? setFilterOpen(false) : setFilterOpen(true)
    }

    const handleChange = e => {

        let thumb_class = e.target.className
        const current_position = e.clientX // => Posição atual do cursor
        
        if (move === true) {
            
            // Aqui, dentro das primeiras sub verificações se verifica se os thumbs estão dentro dos limites da linha e se estão mantendo a distância mínima de 25 píxels entre si
            // Já a segunda sub verificação atribuí o preço proporcional de acordo com a posição de cada thumb
            if (thumb_class.includes('left-thumb')) {

                if (current_position >= initial_position && current_position < thumb2_position - 25) {
                    setValueThumb1(current_position)
                } else if (current_position >= initial_position && current_position >= thumb2_position - 25) {
                    setValueThumb1(thumb2_position - 25)
                    setMove(false)
                } else {
                    setValueThumb1(initial_position)
                    setMove(false)
                }

                if (thumb1_position - initial_position < 1) {
                    setMinValue(initial_min_value)
                } else {
                    setMinValue((thumb1_position - initial_position) * 6.46)
                }

            } else if (thumb_class.includes('right-thumb')) {

                if (current_position >= thumb1_position + 25 && current_position <= end_position) {
                    setValueThumb2(current_position)
                } else if (current_position >= thumb1_position + 25 && current_position >= end_position) {
                    setValueThumb2(end_position)
                    setMove(false)
                } else {
                    setValueThumb2(thumb1_position + 25)
                    setMove(false)
                }
                
                if (thumb2_position > end_position - 1) {
                    setMaxValue(initial_max_value)
                } else {
                    setMaxValue((thumb2_position - initial_position) * 6.48)
                }
            }
        }
        
    }
    
    const moveOn = e => {
        setMove(true)
    }
    
    const moveOff = () => {
        setMove(false)
    }

    // Explicação em 'ProductCard'
    const selectColorHandler = (color, i) => {
        setProductColor(color)
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




    return (
        <Fragment>
            <div className="filter-container">
                <div className="d-flex justify-content-between">
                    <div onClick={() => openFilterHandler()} className="filter-switch border d-flex justify-content-around align-items-center">
                        { filterOpen === false ? 
                            <Fragment>
                                <FontAwesomeIcon icon="filter" /> 
                                <p>OPEN FILTERS</p>
                            </Fragment>
                          :
                            <Fragment>
                                <FontAwesomeIcon icon="times" />
                                <p>CLOSE FILTERS</p>
                            </Fragment>
                        }
                        
                    </div>
                    <div className="filter-sort d-flex justify-content-between align-items-center">
                        <p>Showing 1 - 9 of 19 results</p>
                        <p>Sort by</p>
                        <select>
                            <option>Default Sorting</option>
                            <option>Price</option>
                            <option>Importance</option>
                        </select>
                    </div>                    
                </div>
                { filterOpen ? <div>
                    <div className="mt-5 mb-5 d-flex justify-content-between row">
                        <div className="sub-filter-type">
                            <h6>CATEGORIES</h6>
                            <p onClick={e => setFilterDetails(e, 'cat', 'all')} style={{fontWeight:'bold'}}>All categories ({categoriesTotalQtde}) </p>
                            <p onClick={e => setFilterDetails(e, 'cat', 'bedroom')}>Bedroom ({bedRoomQtde}) </p>
                            <p onClick={e => setFilterDetails(e, 'cat', 'living-room')}>Living room ({livingRoomQtde}) </p>
                            <p onClick={e => setFilterDetails(e, 'cat', 'kitchen')}>Kitchen ({kitchen}) </p>
                            <p onClick={e => setFilterDetails(e, 'cat', 'bathroom')}>Bathroom ({bathRoomQtde}) </p>
                            <p onClick={e => setFilterDetails(e, 'cat', 'children-room')}>Children's room ({childrenRoom}) </p>
                        </div>
                        <div className="divider"></div>
                        <div className="sub-filter-type">
                            <h6>TYPE</h6>
                            <p onClick={e => setFilterDetails(e, 'type', 'all')} style={{fontWeight:'bold'}}>All tags ({typesTotalQtde}) </p>
                            <p onClick={e => setFilterDetails(e, 'type', 'furniture')}>Furniture ({furnitureQtde}) </p>
                            <p onClick={e => setFilterDetails(e, 'type', 'accessories')}>Accessories ({accessoriesQtde}) </p>
                            <p onClick={e => setFilterDetails(e, 'type', 'decorations')}>Decorations ({decorationsQtde}) </p>
                            <p onClick={e => setFilterDetails(e, 'type', 'textile')}>Textile ({textileQtde}) </p>
                            <p onClick={e => setFilterDetails(e, 'type', 'lightning')}>Lighting ({lightingQtde}) </p>
                        </div>
                        <div className="divider"></div>
                        <div className="d-flex flex-column">
                            <h6>OUR OFFER</h6>
                            <div>
                                <input type="checkbox" />
                                <label className="ml-2">New Products</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label className="ml-2">Old Products</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label className="ml-2">Best Sellers</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label className="ml-2">Sales</label>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="col-3">
                            <h6>COLOR</h6>
                            <ColorSelect
                                title={'COLOR'}
                                colors={['red', 'yellow', 'blue', 'purple', 'green']}
                                selectColorHandlerCallback={(color, i) => selectColorHandler(color, i)}
                            />
                        </div>
                        <div className="divider"></div>
                        <div>
                            <h6 style={{marginBottom: '35px'}}>PRICE FILTER</h6>
                            <div className="range-container"
                                onMouseMove={(e) => handleChange(e)}
                                onMouseDown={(e) => moveOn(e)}
                                onMouseUp={() => moveOff()}
                                onMouseLeave={() => moveOff()}
                            >
                                <div className="range" 
                                    
                                >
                                    <span className="rounded-circle left-thumb" 
                                        style={{
                                            width:'15px', 
                                            height: '15px', 
                                            backgroundColor: 'red', 
                                            marginTop: '-6px',
                                            left: thumb1_position - 7 + 'px'
                                        }}
                                    ></span>
                                    <span className="rounded-circle right-thumb" 
                                        style={{
                                            width:'15px', 
                                            height: '15px', 
                                            backgroundColor: 'black', 
                                            marginTop: '-6px', 
                                            left: thumb2_position - 7 + 'px'
                                        }}
                                        
                                    ></span>
                                    <p style={{left: thumb1_position - 4 + 'px', position: 'absolute', marginTop: '15px'}}>{Math.floor(min_value)}</p>
                                    <p style={{left: thumb2_position - 15 + 'px', position: 'absolute', marginTop: '15px'}}>{Math.floor(max_value)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* criar toggle entre os botões para serem ativos ou não */}
                    <div className="filter-button-container">
                        <p className="filter-button filter-button-active">FILTER</p>
                        <p className="filter-button">CLEAR ALL</p>
                    </div>
                </div> : null}
                <Products 
                    // products={products} // => Envia o array com os produtos que serão exibidos
                    pageLimit={12}  // => Número limite de produtos a serem mostrados inicialmente
                    tag={tag} // => Tag que determina quais produtos serão mostrados
                    category={category} // => Categoria dos produtos que serão mostrados
                    valueRange={[min_value, max_value]} // => Intervalo de preço que determinará os produtos que serão mostrados
                />
            </div>
        </Fragment>
    )
}

export default Filter