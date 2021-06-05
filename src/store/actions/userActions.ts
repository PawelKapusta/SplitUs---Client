import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../../constants/usersConstatnts";
import http from "../../lib/axios";
import auth from "../../auth";

export const signIn = (email: string, password: string) => async (dispatch: any) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const user = await http.post("/login", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: user });
    localStorage.setItem("userInfo", JSON.stringify(user));
    localStorage.setItem("firstRender", JSON.stringify(true));
    if (user?.data.token) {
      auth.login(user?.data.token);
      document.location.href = "/";
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listUsers = () => async (dispatch: any, getState: any) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.get("/users", {
      headers: {
        Authorization: `Bearer ${userInfo.data.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data?.users });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

export const signUp = (
  FullName: string,
  Email: string,
  Password: string,
  Phone: number,
  BirthDate: string,
  AvatarImage?: string,
  isAdmin?: boolean,
  isBlocked?: boolean,
) => async (dispatch: any) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { FullName, Email, Password, Phone, BirthDate, AvatarImage, isAdmin, isBlocked },
  });
  try {
    const { data } = await http.post("/register", {
      FullName,
      Email,
      Password,
      Phone,
      BirthDate,
      AvatarImage,
      isAdmin,
      isBlocked,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    sessionStorage.setItem("firstSignIn", JSON.stringify(true));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const signOut = () => (dispatch: any) => {
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("firstSignIn");
  dispatch({ type: USER_SIGNOUT });
  auth.logout();
};

export const updateUserProfile = (
  FullName: string,
  Email: string,
  Password: string,
  Phone: number,
  BirthDate: string,
  AvatarImage: string,
) => async (dispatch: any, getState: any) => {
  dispatch({
    type: USER_UPDATE_PROFILE_REQUEST,
    payload: { FullName, Email, Password, Phone, BirthDate, AvatarImage },
  });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await http.put(
      `/profile`,
      { FullName, Email, Password, Phone, BirthDate, AvatarImage },
      {
        headers: { Authorization: `Bearer ${userInfo?.data?.token}` },
      },
    );
    console.log("profile update", data);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data?.user });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data?.user });
  } catch (error) {
    console.log("detail actions error", error);
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

export const deleteUser = (userId: number) => async (dispatch: any, getState: any) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await http.delete(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.data?.token}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

export const detailsUser = (userId: number) => async (dispatch: any, getState: any) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await http.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.data?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};
