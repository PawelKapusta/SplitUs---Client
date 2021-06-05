import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  userSignInReducer,
  userRegisterReducer,
  userListReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
  userDeleteReducer,
} from "./reducers/userReducer";
import { currencyListReducer } from "./reducers/currencyReducer";
import { questionsFaqListReducer } from "./reducers/questionsFaqReducer";
import {
  groupsListReducer,
  userGroupsListReducer,
  groupCreateReducer,
  addUsersToGroupReducer,
  usersOfGroupReducer,
  groupDetailsReducer,
} from "./reducers/groupsReducer";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo") as string)
      : null,
  },
};
const reducer = combineReducers({
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  groupsList: groupsListReducer,
  userGroupsList: userGroupsListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  currencyList: currencyListReducer,
  questionsFaqList: questionsFaqListReducer,
  createdGroup: groupCreateReducer,
  groupUsers: addUsersToGroupReducer,
  usersOfGroup: usersOfGroupReducer,
  groupDetails: groupDetailsReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    trace: true;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootStore = ReturnType<typeof reducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
