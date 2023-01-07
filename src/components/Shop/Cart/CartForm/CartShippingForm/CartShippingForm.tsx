import classes from './CartShippingForm.module.css'

const CartShippingForm = () => {
   return (
      <div>
         <p>CALCULATE SHIPPING</p>
         <select>
            <option>Argentina</option>
            <option>Brazil</option>
            <option>Germany</option>
            <option>United States</option>
         </select>
         <input placeholder="State/Country" />
         <input placeholder="Town/City" />
         <input placeholder="Postcode/ZIP" />
         <p className={classes.Cart_light_button}>UPDATE</p>
      </div>
   )
}

export default CartShippingForm