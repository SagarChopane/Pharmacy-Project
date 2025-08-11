import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: [], // { id, name, price, image, qty }
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i) => i.id === action.item.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: Math.min(i.qty + 1, 99) } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case "INC":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.min(i.qty + 1, 99) } : i
        ),
      };
    case "DEC":
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0),
      };
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalCount = state.items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const value = useMemo(
    () => ({
      items: state.items,
      addToCart: (item) => dispatch({ type: "ADD", item }),
      increment: (id) => dispatch({ type: "INC", id }),
      decrement: (id) => dispatch({ type: "DEC", id }),
      remove: (id) => dispatch({ type: "REMOVE", id }),
      clear: () => dispatch({ type: "CLEAR" }),
      totalCount,
      totalPrice,
    }),
    [state.items, totalCount, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
