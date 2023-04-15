import classes from './HeaderLogo.module.scss'

import { Link } from 'react-router-dom'


const HeaderLogo = () => {
   return (
      <Link
         to={`${process.env.PUBLIC_URL}/`}
         className={classes.Logo}
      > m
         <span>y</span>Home
      </Link>
   )
}

export default HeaderLogo