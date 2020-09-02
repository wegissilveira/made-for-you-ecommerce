import React, { Fragment } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Filter.css'

const Filter = props => {

    const initial_position = 1204 // => Valor inicial do thumb esquerdo
    const end_position = 1403 // => Valor final do thumb direito
    const initial_min_value = 5 // => Valor inicial do preço mínimo
    const initial_max_value = 1290 // => Valor inicial do preço máximo

    let [thumb1_position, setValueThumb1] =  React.useState(initial_position)
    let [thumb2_position, setValueThumb2] =  React.useState(end_position)
    let [min_value, setMinValue] =  React.useState(initial_min_value)
    let [max_value, setMaxValue] =  React.useState(initial_max_value)
    let [move, setMove] =  React.useState(false) // => habilita os thumbs a serem movidos


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
    

    return (
        <Fragment>
            <div className="filter-container">
                <div className="d-flex justify-content-between">
                    <div className="filter-switch border d-flex justify-content-around align-items-center">
                        <FontAwesomeIcon icon="filter" />
                        <p>OPEN FILTERS</p>
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
                <div>
                    <div className="mt-5 mb-5 d-flex justify-content-between row">
                        <div>
                            <h6>CATEGORIAS</h6>
                            <p>Bedroom (31)</p>
                            <p>Living room (31)</p>
                            <p>Kitchen (31)</p>
                            <p>Bathroom (31)</p>
                            <p>Children's room (31)</p>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <h6>TYPE</h6>
                            <p>Furniture (31)</p>
                            <p>Accessories (31)</p>
                            <p>Storage (31)</p>
                            <p>Textile (31)</p>
                            <p>Lighting (31)</p>
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
                            <div className="d-flex justify-content-between">
                                <div className="
                                        product-details-color 
                                        mt-2 
                                        rounded-circle 
                                        d-flex 
                                        justify-content-center 
                                        align-items-center
                                    "
                                >
                                    <span className="bg-primary rounded-circle"></span>
                                </div>
                                <div className="
                                        product-details-color 
                                        mt-2 
                                        rounded-circle 
                                        d-flex 
                                        justify-content-center 
                                        align-items-center
                                    "
                                >
                                    <span className="bg-success rounded-circle"></span>
                                </div>
                                <div className="
                                        product-details-color 
                                        mt-2 
                                        rounded-circle 
                                        d-flex 
                                        justify-content-center 
                                        align-items-center
                                    "
                                >
                                    <span className="bg-warning rounded-circle"></span>
                                </div>
                                <div className="
                                        product-details-color 
                                        mt-2 
                                        rounded-circle 
                                        d-flex 
                                        justify-content-center 
                                        align-items-center
                                    "
                                >
                                    <span className="bg-info rounded-circle"></span>
                                </div>
                                <div className="
                                        product-details-color 
                                        mt-2 
                                        rounded-circle 
                                        d-flex 
                                        justify-content-center 
                                        align-items-center
                                    "
                                >
                                    <span className="bg-danger rounded-circle"></span>
                                </div>
                            </div>
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
                </div>
            </div>
        </Fragment>
    )
}

export default Filter