import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import UserGroupsList from "../components/organisms/UserGroupsList";
import UserOwnerBillsList from "../components/organisms/UserOwnerBillsList";
import { getListGroupsOfUser } from "../store/actions/groupsActions";
import { listUsers } from "../store/actions/userActions";
import { getOwnerBillsList } from "../store/actions/billsActions";
import { UPDATE_BILL_RESET } from "../constants/billsConstants";

const Membership: React.FC = () => {
  const dispatch = useDispatch();
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;
  const groupUpdate = useSelector((state: RootStateOrAny) => state.groupUpdate);
  const { success: updateGroupSuccess } = groupUpdate;
  const deletedGroup = useSelector((state: RootStateOrAny) => state.deletedGroup);
  const { success: deleteSuccess } = deletedGroup;
  const ownerBills = useSelector((state: RootStateOrAny) => state.ownerBills);
  const { success: ownerBillsSuccess } = ownerBills;
  const deletedBill = useSelector((state: RootStateOrAny) => state.deletedBill);
  const { success: deleteBillSuccess } = deletedBill;
  const updatedBill = useSelector((state: RootStateOrAny) => state.updatedBill);
  const { success: updateOwnerBillsSuccess } = updatedBill;

  useEffect(() => {
    dispatch(listUsers());
    dispatch(getListGroupsOfUser());
  }, [updateGroupSuccess, deleteSuccess]);

  useEffect(() => {
    dispatch({ type: UPDATE_BILL_RESET });
    dispatch(getOwnerBillsList(userInfo?.data?.ID));
  }, [ownerBillsSuccess, deleteBillSuccess, updateOwnerBillsSuccess]);

  return (
    <div>
      <UserGroupsList />
      <UserOwnerBillsList />
    </div>
  );
};

export default Membership;
