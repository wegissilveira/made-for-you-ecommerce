import classes from './MainPageProductsHeader.module.scss'
import { Tag } from 'common/types'


type Props = {
   setTagCB: (tag: Tag) => void
}

const MainPageProductsHeader = (props: Props) => {
   const { 
      setTagCB
   } = props
   
   const setActiveTabHandler = (e: React.MouseEvent<HTMLDivElement>, tag: Tag) => {
      const target = e.target as HTMLDivElement

      const container = target.closest('div[class^=MainPageProductsHeader_Products_select_container]')
      Array.from(container!.children).forEach(child => {
         child.className = classes.Products_select
      })

      target.className = [classes.Products_select, classes.Products_select_active].join(' ')

      setTagCB(tag)
   }

   return (
      <div className={classes.Products_select_container}>
         <div
            onClick={(e) => setActiveTabHandler(e, 'all-products')}
            className={[
               classes.Products_select,
               classes.Products_select_active].join(' ')
            }
         > ALL PRODUCTS
         </div>
         <div
            onClick={(e) => setActiveTabHandler(e, 'furniture')}
            className={classes.Products_select}
         > FURNITURE
         </div>
         <div
            onClick={(e) => setActiveTabHandler(e, 'decorations')}
            className={classes.Products_select}
         > DECORATIONS
         </div>
         <div
            onClick={(e) => setActiveTabHandler(e, 'textile')}
            className={classes.Products_select}
         > TEXTILE
         </div>
      </div>
   )
}

export default MainPageProductsHeader