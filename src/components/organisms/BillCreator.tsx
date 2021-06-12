import React from "react";

interface Props {
  groupId: string;
  handleClose: any;
}

const BillCreator: React.FC<Props> = ({ groupId, handleClose }) => {
  return (
    <div>
      BillCreator {groupId} {handleClose}{" "}
    </div>
  );
};

export default BillCreator;
