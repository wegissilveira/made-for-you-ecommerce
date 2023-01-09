import { useParams } from "react-router-dom"

const CategoryHeader = () => {
   const { searchKey, cat} = useParams<{searchKey: string, cat: string}>()

   return (
      <>
         {cat && <h1>{cat.toUpperCase()}</h1>}
         {searchKey && <h1>SEARCH: '{searchKey.toUpperCase()}'</h1>}
      </>
   )
}

export default CategoryHeader