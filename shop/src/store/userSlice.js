import { createSlice } from "@reduxjs/toolkit";

// useState 역할
let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      // state는 기존 state를 뜻함
      state.name = "park";
    },
    increase(state, action) {
      state.age += action.payload;
    },
    다른함수() {},
  },
});
export let { changeName, increase, 다른함수 } = user.actions;

export default user;
