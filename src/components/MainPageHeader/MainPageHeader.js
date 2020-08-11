import React from 'react'
import { Fragment } from 'react'

import './MainPageHeader.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mainPageHeader = props => {

    return (
        <Fragment>
            <div className="container-fluid d-flex">
                <div className="col-6 container-fluid d-flex align-items-center" style={{height:'700px'}}>
                    <div style={{height:'65%', width:'25%'}}></div>
                    <img style={{height:'65%', width:'50%'}} src={require("../../assets/images/imgSolo-mainpage.png")} alt={"img-1"} />
                    <div style={{height:'65%', width:'40%'}}></div>
                </div>
                <div className="col-6" style={{height:'700px'}}>
                    <img style={{height:'90%', maxWidth:'100%'}} src={require("../../assets/images/imgSlider1-mainpage.png")} alt={"img-2"} />
                    <div className="change-slide-setas d-flex justify-content-between">
                        <FontAwesomeIcon icon="arrow-left" />
                        <FontAwesomeIcon icon="arrow-right" />
                    </div>
                </div>
            </div>
            <div className="header-text">
                <div className="icone-provisorio">
                    <p>*</p>
                    <p>*</p>
                    <p>*</p>
                    <p>*</p>
                </div>
                <div style={{fontSize: '100px', fontWeight: 'bold', lineHeight:'70px'}}>
                    <p>MADE</p>
                    <p>FOR YOU</p>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon={['fab', 'facebook-f']} className="icones"/>
                    <FontAwesomeIcon icon={['fab', 'instagram']} className="icones" />
                    <FontAwesomeIcon icon={['fab', 'vk']} className="icones" />
                    <FontAwesomeIcon icon={['fab', 'twitter']} className="icones" />
                </div>
            </div>
        </Fragment>
    )
}

export default mainPageHeader