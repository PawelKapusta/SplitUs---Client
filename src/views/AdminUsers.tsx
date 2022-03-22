import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { listUsers } from "../store/actions/userActions";
import AdminUsersList from "../components/organisms/AdminUsersList";

const AdminUsers = () => {
  const userAdminUpdate = useSelector((state: RootStateOrAny) => state.userAdminUpdate);
  const { success: userAdminUpdateSuccess } = userAdminUpdate;
  const userDelete = useSelector((state: RootStateOrAny) => state.userDelete);
  const { success: userDeleteSuccess } = userDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, [userAdminUpdateSuccess, userDeleteSuccess]);

  return (
    <div>
      <AdminUsersList />
    </div>
  );
};

export default AdminUsers;
