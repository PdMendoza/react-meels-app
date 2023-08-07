import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {}
});

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.payload.amount * action.payload.price;

    const alreadyAddedItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const alreadyAddedItem = state.items[alreadyAddedItemIndex];

    let updatedItems;
    if (alreadyAddedItem) {
      const updatedItem = {
        ...alreadyAddedItem,
        amount: alreadyAddedItem.amount + action.payload.amount
      };
      updatedItems = [...state.items];
      updatedItems[alreadyAddedItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.payload);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === "REMOVE") {
    const alreadyAddedItemIndex = state.items.findIndex(
      (item) => item.id === action.payload
    );

    const alreadyAddedItem = state.items[alreadyAddedItemIndex];
    const updatedTotalAmount = state.totalAmount - alreadyAddedItem.price;

    let updatedItems;
    if (alreadyAddedItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.payload);
    } else {
      const updatedItem = {
        ...alreadyAddedItem,
        amount: alreadyAddedItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[alreadyAddedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

  function addItemToCartHandler(item) {
    dispatch({ type: "ADD", payload: item });
  }

  function removeItemToCartHandler(id) {
    dispatch({ type: "REMOVE", payload: id });
  }

  function clearCartHandler() {
    dispatch({ type: "CLEAR" });
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
