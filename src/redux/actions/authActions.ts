export const RegisterUserAction = (authenticated: Boolean) => ({
  type: "REGISTER_USER",
  payload: { authenticated },
});

interface RegisterUserActionInterface {
  type: String;
  payload: {
    authenticated: Boolean;
  };
}
export const LogOutUser = (authenticated: Boolean) => ({
  type: "LOGOUT_USER",
  payload: { authenticated },
});

interface LogOutUserInterface {
  type: String;
  payload: {
    authenticated: Boolean;
  };
}
export type authActionType = RegisterUserActionInterface | LogOutUserInterface;
