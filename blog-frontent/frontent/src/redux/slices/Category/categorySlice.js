import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { buildQueries } from "@testing-library/react"
import axios from "axios"
import {baseUrl} from "../../../utils/baseURL"


export const createCategoryAction = createAsyncThunk(
    "category/create",
    async(category,{rejectWithValue, getState, dispatch})=>{
        try {
            const {data} = await axios.post(`${baseUrl}/api/category`,{
                title: category?.title,
            })
        } catch (error) {
            if(!error?.response){
                throw error
            }
            return rejectWithValue(error?.respose.data)
        }
    }
)


//slices

const categorySlices= createSlice({
    name: "category",
    initialState: {category:"nodejs"},
    extraReducers: builder =>{
        builder.addCase(createCategoryAction.pending,(state,
            action)=>{
                state.loading=true;
            });
            builder.addCase(createCategoryAction.fulfilled,(state,
                action)=>{
                    state.category =action.payload;
                    state.loading=false;
                    state.appErr = undefined;
                    state.serverErr = undefined;
                })

            builder.addCase(createCategoryAction.rejected,(state,
                action)=>{
                    state.loading = false;
                    state.appErr= action?.payload?.message;
                    state.serverErr = action?.payload?.message;
                })           
    }
});


export default categorySlices.reducer