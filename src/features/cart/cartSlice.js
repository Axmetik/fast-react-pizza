import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = new item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = id
      state.cart = state.cart.filter((elem) => elem.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((elem) => elem.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((elem) => elem.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, curr) => sum + curr.totalPrice, 0);

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, curr) => sum + curr.quantity, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((elem) => elem.pizzaId === id)?.quantity ?? 0;
