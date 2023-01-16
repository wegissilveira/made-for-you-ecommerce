import classes from './FooterMenu.module.scss'

const FooterMenu = () => {
   return (
      <div className={classes.Footer_menu__wrapper}>
         <h3>MENU</h3>
         <div className={classes.Footer_menu}>
            <ul>
               <li>Shop</li>
               <li>Features</li>
               <li>Sales</li>
               <li>Contacts</li>
            </ul>
            <ul>
               <li>Help</li>
               <li>Shipping</li>
               <li>Privacy Police</li>
               <li>FAQs</li>
            </ul>
         </div>
      </div>
   )
}

export default FooterMenu