import { Tag, Category, ColorValues, Offer, Order, PriceRange, FilterAction } from "common/types"
import { ActionTypeFilter } from "./actionTypes"

export const setTag = (tag: Tag) => ({type: ActionTypeFilter.SET_TAG, tag } as FilterAction)
export const setCategory = (category: Category) => ({type: ActionTypeFilter.SET_CATEGORY, category } as FilterAction)
export const setColor = (color: ColorValues) => ({type: ActionTypeFilter.SET_COLOR, color } as FilterAction)
export const setOffer = (offer: Offer[]) => ({type: ActionTypeFilter.SET_OFFER, offer } as FilterAction)
export const setOrder = (order: Order) => ({type:  ActionTypeFilter.SET_ORDER, order } as FilterAction)
export const setPrice = (priceRange: PriceRange) => ({type:  ActionTypeFilter.SET_PRICE, priceRange } as FilterAction)
export const resetFilter = () => ({type: ActionTypeFilter.RESET_FILTER } as FilterAction)