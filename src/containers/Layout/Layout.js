import React, { Component, Fragment } from 'react'

import Navigation from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import GoogleFontLoader from 'react-google-font-loader'


class Layout extends Component {
   render() {
      return (
         <Fragment>
            <GoogleFontLoader
               fonts={[
                  {
                     font: 'Lemonada',
                     weights: [],
                  },
               ]}
            />
            <Navigation />
            <main>
               {this.props.children}
            </main>
            <Footer></Footer>
         </Fragment>
      )
   }
}

export default Layout