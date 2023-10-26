// "use client"
// import React, { createContext, useReducer, ReactNode } from "react"
// // import cartReducer, { sumItems } from "./cartReducer"

// export Interface formValues {

// }
// export interface CartItem {
// 	id: string
// 	quantity: number
// }

// export interface CartState {
// 	// itemCount: number | undefined
// 	// cart: CartItem[]
// 	// clearCart: () => void
// 	// handleQuantity?: (product: any, action: any) => void
// }

// export const FormStateContext = createContext({})
// export const CartContext = createContext<CartState>({} as CartState)

// export const cartFromStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : []

// console.log("cartFromStorage", cartFromStorage)

// const initialState: CartState = {
// 	// itemCount: sumItems(cartFromStorage).cart.length,
// 	// handleCheckout: () => {},
// 	// handleQuantity: (product, action) => {},
// }

// interface CartContextProviderProps {
// 	children: ReactNode
// }

// const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {
// 	const [state, dispatch] = useReducer(cartReducer, initialState)

// 	const addProduct = (product: any) => {
// 		// dispatch({ type: "ADD_ITEM", payload: product })
// 	}

// 	const contextValues: CartState = {
// 		...state,
// 		addProduct,
// 	}

// 	return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>
// }

// export default CartContextProvider
