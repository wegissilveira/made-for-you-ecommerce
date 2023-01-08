import classes from './ProductModalImages.module.scss'


type Props = {
   productImgs: string[]
   translateValue: number
}

const ProductModalImages = (props: Props) => {
   const {
      productImgs,
      translateValue
   } = props

   return (
      <div
         className={classes.Main_img_slider}
         style={{transform: `translateX(${translateValue}%)`}}
      >
         {productImgs.map((slide, i) =>
            <img
               key={slide+'-'+i}
               src={slide}
               alt="img-1"
            />
         )}
      </div>
   )
}

export default ProductModalImages