import classes from './MainPageShopByRoom.module.scss'

import { Link } from 'react-router-dom'

const mainPageShopByRoom = () => {

   return (
      <div className={classes.Session_container}>
         <h1>SHOP BY ROOM</h1>
         <div className={classes.ShoppingByRoom_container}>
            <Link className={classes.ShoppingByRoom_image1} to={'/shop/living-room'}>
               <img src={require("assets/images/Shop/quadro-1-pequeno.jpg")} alt="img-1" />
            </Link>
            <Link className={classes.ShoppingByRoom_image3} to={'/shop/kitchen'}>
               <img src={require("assets/images/Shop/quadro-3-grande.png")} alt="img-2" />
            </Link>
            <Link className={classes.ShoppingByRoom_image2} to={'/shop/bathroom'}>
               <img src={require("assets/images/Shop/quadro-2-grande.jpg")} alt="img-2" />
            </Link>
            <Link className={classes.ShoppingByRoom_image4} to={'/shop/bedroom'}>
               <img src={require("assets/images/Shop/quadro-4-pequeno.png")} alt="img-4" />
            </Link>
         </div>
      </div>
   )
}

export default mainPageShopByRoom