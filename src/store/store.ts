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
  userAdminUpdateReducer,
} from "./reducers/userReducer";
import { currencyListReducer } from "./reducers/currencyReducer";
import { questionsFaqListReducer, questionFaqCreateReducer } from "./reducers/questionsFaqReducer";
import {
  groupsListReducer,
  userGroupsListReducer,
  groupCreateReducer,
  usersOfGroupReducer,
  groupDetailsReducer,
  groupDeleteReducer,
  groupUpdateReducer,
} from "./reducers/groupsReducer";
import {
  ownerBillsListReducer,
  billUpdateReducer,
  billDeleteReducer,
  billsListReducer,
  allBillsInGroupReducer,
  billCreateReducer,
  billDetailsReducer,
  billCodeQrUpdateReducer,
  allUsersInBillReducer,
  settleUpBillUpdateReducer,
  commentCreateReducer,
  commentsListReducer,
  commentDeleteReducer,
} from "./reducers/billsReducer";

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
  createdBill: billCreateReducer,
  usersOfGroup: usersOfGroupReducer,
  groupDetails: groupDetailsReducer,
  deletedGroup: groupDeleteReducer,
  groupUpdate: groupUpdateReducer,
  billsList: billsListReducer,
  ownerBills: ownerBillsListReducer,
  allBillsInGroup: allBillsInGroupReducer,
  updatedBill: billUpdateReducer,
  deletedBill: billDeleteReducer,
  userAdminUpdate: userAdminUpdateReducer,
  billDetails: billDetailsReducer,
  updateCodeQrBill: billCodeQrUpdateReducer,
  usersInBill: allUsersInBillReducer,
  settleUpUpdateBill: settleUpBillUpdateReducer,
  questionFaqCreated: questionFaqCreateReducer,
  createdComment: commentCreateReducer,
  commentsList: commentsListReducer,
  deleteComment: commentDeleteReducer,
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
