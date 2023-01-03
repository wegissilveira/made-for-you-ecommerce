import classes from './HeaderLogo.module.css'

import { Link } from 'react-router-dom'


const HeaderLogo = () => {
   return (
      <Link
         to="/"
         className={classes.Logo}
      > m
         <span>y</span>Home
      </Link>
   )
}

export default HeaderLogo