import { configureStore, createSlice } from "@reduxjs/toolkit";

// useState 역할
let user = createSlice({
  name: "user",
  initialState: "kim",
  reducers: {
    changeName(state) {
      // state는 기존 state를 뜻함
      return "john " + state;
    },
    다른함수() {},
  },
});

export let { changeName, 다른함수 } = user.actions;

let cart = createSlice({
  name: "productList",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 1, name: "Grey Yordan", count: 1 },
  ],
});

export default configureStore({
  // 만든 slice는 reducer에 등록해야 함
  reducer: {
    유저_user: user.reducer,
    카트_cart: cart.reducer,
  },
});
