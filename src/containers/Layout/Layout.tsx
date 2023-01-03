import React, { Component, Fragment, ReactNode } from 'react'

import Navigation from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import GoogleFontLoader from 'react-google-font-loader'


type Props = {
   children: ReactNode
}

class Layout extends Component<Props> {
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