import { configureStore, createSlice } from "@reduxjs/toolkit";

import user from "./store/userSlice";

let cart = createSlice({
  name: "productList",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 1, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increaseCount(state, action) {
      let { itemId } = action.payload;
      let searchedItem = state.find((item) => {
        return item.id === itemId;
      });
      searchedItem.count += 1;
    },
    addItem(state, action) {
      let temp = {
        id: action.payload.id,
        name: action.payload.title,
        count: action.payload.id,
      };
      return [...state, temp];
    },
  },
});

export let { increaseCount, addItem } = cart.actions;

export default configureStore({
  // 만든 slice는 reducer에 등록해야 함
  reducer: {
    유저_user: user.reducer,
    카트_cart: cart.reducer,
  },
});
