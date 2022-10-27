import React from "react"

const CategoryHeader = (props) => {
   const {
      category,
      match
   } = props

   return (
      <>
         {match && match.params.cat && <h1>{category.toUpperCase()}</h1>}
         {match && match.params.searchKey && <h1>SEARCH: '{match.params.searchKey.toUpperCase()}'</h1>}
      </>
   )
}

export default CategoryHeader