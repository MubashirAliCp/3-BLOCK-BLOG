import { configureStore} from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices"
import categoriesReducer from "../slices/Category/categorySlice"
const store  = configureStore({
    reducer:{
        users: usersReducer,
        category : categoriesReducer

    },
})

export default store;
