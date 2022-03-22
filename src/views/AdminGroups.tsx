import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getListGroups } from "../store/actions/groupsActions";
import AdminGroupsList from "../components/organisms/AdminGroupsList";

const AdminGroups = () => {
  const dispatch = useDispatch();
  const deletedGroup = useSelector((state: RootStateOrAny) => state.deletedGroup);
  const { success: deletedGroupSuccess } = deletedGroup;

  useEffect(() => {
    dispatch(getListGroups());
  }, [deletedGroupSuccess]);

  return (
    <div>
      <AdminGroupsList />
    </div>
  );
};
export default AdminGroups;
