import authReducer, { AuthState } from "./authReducer";

import { combineReducers } from "redux";

export interface StateInterface {
  auth: AuthState;
}

export const rootReducer = combineReducers({
  auth: authReducer,
});
