import { Tag, Category, ColorValues, Offer, Order, PriceRange, Action } from "common/types"
import { ActionType } from "./actionTypes"

export const setTag = (tag: Tag) => ({type: ActionType.SET_TAG, tag } as Action)
export const setCategory = (category: Category) => ({type: ActionType.SET_CATEGORY, category } as Action)
export const setColor = (color: ColorValues) => ({type: ActionType.SET_COLOR, color } as Action)
export const setOffer = (offer: Offer[]) => ({type: ActionType.SET_OFFER, offer } as Action)
export const setOrder = (order: Order) => ({type:  ActionType.SET_ORDER, order } as Action)
export const setPrice = (priceRange: PriceRange) => ({type:  ActionType.SET_PRICE, priceRange } as Action)
export const resetFilter = () => ({type: ActionType.RESET_FILTER } as Action)