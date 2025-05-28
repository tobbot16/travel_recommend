import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import cartSlice from "./slices/cartSlice";

//store : 금고, reducer : 금고지기
export default configureStore({
    reducer: {
        "loginSlice":loginSlice,
        "cartSlice" : cartSlice
    }
})