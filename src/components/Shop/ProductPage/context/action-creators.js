export const setQty = (qty, update) => ({type: 'updateQty', qty, update })
export const setSize = (size, update) => ({type: 'updateSize', size, update })
export const setColor = (color, update) => ({type: 'updateColor', color, update })
export const setUpdate = () => ({type: 'finishUpdate' })