import React, { Fragment } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Filter.css'

const Filter = props => {

    let [value, setValue] =  React.useState(70)

    const handleChange = e => {
        setValue(e.target.value);
      };

    return (
        <Fragment>
            <div className="filter-container d-flex justify-content-between">
                {/* <div className="filter-switch border d-flex justify-content-around align-items-center">
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
                </div> */}
                    {/* <input
                        type="range"
                        id={'threshold'}
                        min={1}
                        max={100}
                        step={0.5}
                        value={value}
                        onChange={handleChange}
                    /> */}
                    <div className="range">
                        <span className="rounded-circle" 
                            style={{
                                width:'15px', 
                                height: '15px', 
                                backgroundColor: 'red', 
                                marginTop: '-6px'}}
                            ></span>
                        <span className="rounded-circle" 
                            style={{
                                width:'10px', 
                                height: '10px', 
                                backgroundColor: 'black', 
                                marginTop: '-4px', 
                                marginLeft: '195px'}}
                            ></span>
                    </div>
            </div>
            {/* <div>
                <div>
                    <h6>CATEGORIAS</h6>
                    <p>Bedroom</p>
                    <p>Living room</p>
                    <p>Kitchen</p>
                    <p>Bathroom</p>
                    <p>Children's room</p>
                </div>
                <div>
                    <h6>TYPE</h6>
                    <p>Furniture</p>
                    <p>Accessories</p>
                    <p>Storage</p>
                    <p>Textile</p>
                    <p>Lighting</p>
                </div>
                <div>
                    <h6>OUR OFFER</h6>
                    <input type="checkbox" />
                    <label>New Products</label>
                    <input type="checkbox" />
                    <label>Old Products</label>
                    <input type="checkbox" />
                    <label>Best Sellers</label>
                    <input type="checkbox" />
                    <label>Sales</label>
                </div>
                <div>
                    <h6>COLOR</h6>
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
                        <span className="bg-danger rounded-circle"></span>
                    </div>
                </div>
                <div>
                    <h6>PRICE FILTER</h6>
                    <InputRange
                        maxValue={20}
                        minValue={0}
                        value={value}
                        onChange={value => setValue(value)} 
                    />
                </div>
            </div> */}
        </Fragment>
    )
}

export default Filter