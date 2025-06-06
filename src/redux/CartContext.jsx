import { createContext, useReducer, useContext } from "react";

const initialState = {
  cartItems: [],
  notification: "", // ⭐ 新增通知訊息
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((_, i) => i !== action.payload),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: action.payload,
      };
    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        notification: "",
      };
    default:
      return state;
  }
};


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
