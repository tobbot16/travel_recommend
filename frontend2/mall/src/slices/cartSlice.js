import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import { getCartItems, postChangeCart } from "../api/cartAPI";
 export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
 return getCartItems()
 })
export const postChangeCartAsync = createAsyncThunk(
  'postCartItemsAsync',
  postChangeCart
);
const initState = []
const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initState,
    extraReducers: (builder) => {
      builder
        .addCase(
          getCartItemsAsync.fulfilled,
          (state, action) => {
            console.log("getCartItemsAsync fulfilled");
            return action.payload;
          }
        )
        .addCase(
          postChangeCartAsync.fulfilled,
          (state, action) => {
            console.log("postCartItemsAsync fulfilled");
            return action.payload;
          }
        );
    }
  });
  
  export default cartSlice.reducer;