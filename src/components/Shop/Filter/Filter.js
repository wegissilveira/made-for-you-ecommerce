import React, { Fragment } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Filter.css'

const filter = props => {

    return (
        <Fragment>
            <div className="filter-container d-flex justify-content-between">
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
        </Fragment>
    )
}

export default filter