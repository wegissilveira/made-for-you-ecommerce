import classes from './CartList.module.scss'

import CartForm from 'components/Shop/Cart/CartForm/CartForm'
import ProductCartTable from "./ProductCartTable/ProductCartTable"
import KeepBuyingBtn from "../KeepBuyingBtn/KeepBuyingBtn"


const CartList = () => {
   return (
      <div className={classes.Cart_container}>
         <ProductCartTable />
         <KeepBuyingBtn btnText={'KEEP BUYING'} />
         <CartForm />
      </div>
   )
}

export default CartList