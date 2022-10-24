import React from 'react'

import classes from './MainSliderArrows.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MainSliderArrows = (props) => {
   const {
      clickEnabled,
      mainSliderHandlerCB
   } = props

   return (
      <div className={classes.Change_slide_arrows}>
         <FontAwesomeIcon
            onClick={clickEnabled ? () => mainSliderHandlerCB('previous') : null}
            icon="arrow-left"
            color={clickEnabled ? '#000' : "#ccc"}
         />
         <FontAwesomeIcon
            onClick={clickEnabled ? () => mainSliderHandlerCB('next') : null}
            icon="arrow-right"
            color={clickEnabled ? '#000' : "#ccc"}
         />
      </div>
   )
}

export default MainSliderArrows