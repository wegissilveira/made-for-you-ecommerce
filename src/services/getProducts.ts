import { gql } from "@apollo/client" 

export const GET_PRODUCTS = gql`
   query getProducts {
      products {
         _id
         name
         price
         img
         tag
         category
         imgsDemo
         colors
         deal
         offer
      }
   }
`