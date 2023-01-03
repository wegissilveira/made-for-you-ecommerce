import classes from './MainPageHeader.module.css'

import MinorSliderHeader from './MinorSliderHeader/MinorSliderHeader'
import MainSliderHeader from './MainSliderHeader/MainSliderHeader'
import HeaderTitle from './HeaderTitle/HeaderTitle'


const MainPageHeader = () => {
   return (
      <div className={classes.Header_container}>
         <MinorSliderHeader />
         <MainSliderHeader />
         <HeaderTitle />
      </div>
   )
}

export default MainPageHeader