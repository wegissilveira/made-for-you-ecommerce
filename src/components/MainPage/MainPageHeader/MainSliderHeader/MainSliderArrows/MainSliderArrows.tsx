import classes from './MainSliderArrows.module.css'

import { SliderDirection } from 'common/types'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
   clickEnabled: boolean
   mainSliderHandlerCB: (action: SliderDirection) => void
}

const MainSliderArrows = (props: Props) => {
   const {
      clickEnabled,
      mainSliderHandlerCB
   } = props

   return (
      <div className={classes.Change_slide_arrows}>
         <FontAwesomeIcon
            onClick={clickEnabled ? () => mainSliderHandlerCB('previous') : undefined}
            icon="arrow-left"
            color={clickEnabled ? '#000' : "#ccc"}
         />
         <FontAwesomeIcon
            onClick={clickEnabled ? () => mainSliderHandlerCB('next') : undefined}
            icon="arrow-right"
            color={clickEnabled ? '#000' : "#ccc"}
         />
      </div>
   )
}

export default MainSliderArrows