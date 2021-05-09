import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../../constants/usersConstatnts";
import http from "../../lib/axios";
import User from "../types/types";

export const signIn = (email: string, password: string) => async (dispatch: any) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const user: User = await http.post("/login", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: user });
    localStorage.setItem("userInfo", JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
