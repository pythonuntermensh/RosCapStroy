import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {responsibilitiesAPI} from "../services/FormService";

const rootReducer = combineReducers({
    [responsibilitiesAPI.reducerPath]: responsibilitiesAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(responsibilitiesAPI.middleware)
    })
}