import React from 'react'
import { Fragment } from 'react'

import classes from './MainPageHeader.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import MinorSliderHeader from './MinorSliderHeader/MinorSliderHeader'
import MainSliderHeader from './MainSliderHeader/MainSliderHeader'


const MainPageHeader = props => {
    // Configurar import absoluto sem essa série de '../../'
    // Remover Fragment, não faz sentido aqui já que há uma div wrapper
    // Transformar cada um dos blocos 'div' em um componente e analisar se o que já é componente precisa ser englobado nesses novos componentes ou podem simplesmente serem adaptados para se enquadrarem na estrutura
    return (
        <Fragment>
            <div className={classes.Header_container}>
                <div className={classes.Header_block_1}>
                    <MinorSliderHeader />
                </div>
                <div className={classes.Header_block_2}>
                    <MainSliderHeader />
                    <div className={classes.Icons_container}>
                        <FontAwesomeIcon icon={['fab', 'facebook-f']}/>
                        <FontAwesomeIcon icon={['fab', 'instagram']} />
                        <FontAwesomeIcon icon={['fab', 'vk']} />
                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                    </div>
                </div>
                <div className={classes.Header_title}>
                    <p>MADE</p>
                    <p>FOR YOU</p>
                    <p>MADE FOR YOU</p>
                </div>
            </div>
        </Fragment>
    )
}

export default MainPageHeader