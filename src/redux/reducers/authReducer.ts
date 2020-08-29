import { authActionType } from "../actions/authActions";

export interface AuthState {
  authenticated: Boolean;
}

const initialState = {
  authenticated: false,
};

const authReducer = (state = initialState, action: authActionType) => {
  switch (action.type) {
    case "LOGIN_USER":
      return state;
    case "REGISTER_USER":
      return { ...state, authenticated: action.payload.authenticated };
    case "LOGOUT_USER":
      return { ...state, authenticated: action.payload.authenticated };
    default:
      return state;
  }
};

export default authReducer;
