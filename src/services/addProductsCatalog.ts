import { gql } from "@apollo/client";

export const ADD_PRODUCTS_CATALOG = gql`
  mutation addProducts($products: [ProductInput!]!) {
    addProducts(products: $products) {
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
