import classes from './MinorSlider.module.scss'

import { Link } from 'react-router-dom'
import { formatUrlName } from 'helpers/functions'
import { MinorSliderType } from 'common/types'


type Props = {
   sliderProducts: MinorSliderType[]
   minorSlideImg: number
}

const MinorSlider = (props: Props ) => {
   const  {
      sliderProducts,
      minorSlideImg
   } = props
   
   return (
      <div className={classes.MinorSlider_container}>
         {sliderProducts.map((item, i) => {
            return (
               <div
                  key={`${item}-${i}`}
                  className={classes.MinorSlider_subContainer}
                  style={{
                     backgroundColor: item.bgColor,
                     display: i === minorSlideImg ? 'block' : 'none'
                  }}
               >
                  <img
                     src={item.img}
                     alt={"img-1"}
                  />
                  <div>
                     <Link to={process.env.PUBLIC_URL + formatUrlName(item.name, item._id)} >
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                     </Link>
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export default MinorSlider