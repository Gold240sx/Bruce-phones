// import { CartItem, CartState } from "./signUpFormContext"

// export const sumItems = (cartItems: CartItem[]): CartState => {
// 	const itemCount = cartItems.reduce((total, product) => total + product.quantity, 0)

// 	return {
// 		cart: cartItems,
// 		itemCount,
// 	}
// }

// type CartAction = { type: "ADD_ITEM"; payload: CartItem }

// const cartReducer = (state: CartState, action: CartAction, newState: string): CartState => {
// 	switch (action.type) {
// 		case "ADD_ITEM":
// 			return {
// 				...state,
// 			}
// 	}
// }

// export default cartReducer
