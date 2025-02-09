import { combineReducers } from "redux";
import authReducer from "./auth";
import CartReducer from "./cart";

const rootReducer = combineReducers({
    auth: authReducer,
    cart: CartReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer