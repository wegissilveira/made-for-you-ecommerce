import React from "react"
import { withRouter } from "react-router-dom"

const CategoryHeader = (props) => {
   const {
      match
   } = props

   return (
      <>
         {match && match.params.cat && <h1>{match.params.cat.toUpperCase()}</h1>}
         {match && match.params.searchKey && <h1>SEARCH: '{match.params.searchKey.toUpperCase()}'</h1>}
      </>
   )
}

export default withRouter(CategoryHeader)