import { gql } from "@apollo/client"

export const GET_PRODUCT = gql`
   query getProduct($id: ID!) {
      product(id: $id) {
         _id
         name
         price
         img
         tag
         category
         deal
         offer
         imgsDemo
         colors
      }
   }
`