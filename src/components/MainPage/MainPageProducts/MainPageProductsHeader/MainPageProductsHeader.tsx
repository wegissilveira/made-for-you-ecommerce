import classes from './MainPageProductsHeader.module.scss'
import { Tag } from 'common/types'


type Props = {
   setTagCB: (tag: Tag) => void
}

const MainPageProductsHeader = (props: Props) => {
   const { 
      setTagCB
   } = props
   
   const setActiveTabHandler = (e: React.MouseEvent<HTMLButtonElement>, tag: Tag) => {
      const target = e.target as HTMLButtonElement

      const container = target.closest('div[class^=MainPageProductsHeader_Products_select_container]')
      Array.from(container!.children).forEach(child => {
         child.className = classes.Products_select
      })

      target.className = [classes.Products_select, classes.Products_select_active].join(' ')

      setTagCB(tag)
   }

   return (
      <div className={classes.Products_select_container}>
         <button
            onClick={(e) => setActiveTabHandler(e, 'all-products')}
            className={[
               classes.Products_select,
               classes.Products_select_active].join(' ')
            }
         > ALL PRODUCTS
         </button>
         <button
            onClick={(e) => setActiveTabHandler(e, 'furniture')}
            className={classes.Products_select}
         > FURNITURE
         </button>
         <button
            onClick={(e) => setActiveTabHandler(e, 'decorations')}
            className={classes.Products_select}
         > DECORATIONS
         </button>
         <button
            onClick={(e) => setActiveTabHandler(e, 'textile')}
            className={classes.Products_select}
         > TEXTILE
         </button>
      </div>
   )
}

export default MainPageProductsHeader