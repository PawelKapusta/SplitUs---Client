import React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LinearProgress from "@material-ui/core/LinearProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import DescriptionIcon from "@material-ui/icons/Description";
import EuroIcon from "@material-ui/icons/Euro";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Button from "../atoms/Button";
import FormInput from "../atoms/FormInput";
import { updateBill } from "../../store/actions/billsActions";

interface Props {
  bill: any;
  handleClose: any;
}

interface FormValues {
  name: string;
  description: string;
  dataCreated: string;
  dataEnd: string;
  billImage?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      width: 300,
      minHeight: 650,
    },
    [theme.breakpoints.down("md")]: {
      width: 400,
      minHeight: 650,
    },
    [theme.breakpoints.up("lg")]: {
      width: 400,
      minHeight: 650,
    },
  },
  editDialogTitle: {
    textAlign: "center",
  },
  label: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: "1.2em",
  },
  input: {
    width: "100%",
    backgroundColor: "#F0FFFF",
  },
  span: {
    display: "block",
    marginTop: 5,
    color: "red",
  },
  select: {
    width: "90%",
    height: "40px",
    background: "white",
    color: "gray",
    paddingLeft: "5px",
    fontSize: "1em",
  },
  selectsBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: 12,
  },
  option: {
    color: "black",
    background: "white",
    display: "flex",
    whiteSpace: "pre",
    minHeight: "20px",
    padding: "0px 2px 1px",
  },
  formControl: {
    marginTop: 12,
    marginBottom: 12,
    minWidth: 200,
  },
  buttons: {
    position: "relative",
    left: 20,
    top: 10,
  },
  icon: {
    marginBottom: 13,
  },
  submitButton: {
    color: "red",
    fontSize: "1em",
    width: "25%",
    height: "34px",
    borderRadius: "7%",
    cursor: "pointer",
    border: "1px solid red",
    marginBottom: 1,
    padding: 0,
    background: "white",
    "&:hover": {
      background: "red",
      color: "white",
    },
  },

  membersSelector: {
    maxWidth: "90%",
    margin: "auto",
  },
  uploadingLoading: {
    background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
    marginTop: 5,
  },
}));

const OwnerBillEdit: React.FC<Props> = ({ bill, handleClose }) => {
  const updatedBill = useSelector((state: RootStateOrAny) => state.updatedBill);
  const { loading: loadingUpdateOwnerBill, success: updateOwnerBillsSuccess } = updatedBill;
  const dispatch = useDispatch();
  const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
  const cutDataCreatedToMinutes = bill?.DataCreated.match(regex);
  const cutDataEndToMinutes = bill?.DataEnd.match(regex);
  const classes = useStyles();

  const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    description: yup.string().required("Description is a required field"),
    dataCreated: yup.string().required("DataCreated is a required field"),
    dataEnd: yup.string().required("DataEnd is a required field"),
  });

  const handleCloseAll = () => {
    handleClose();
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async values => {
    await dispatch(
      updateBill(bill.ID, values.name, values.description, values.dataCreated, values.dataEnd),
    );
    handleClose();

    console.log("values", values);
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className={classes.editDialogTitle} id="alert-dialog-slide-title">
          EDIT BILL
        </DialogTitle>
        <FormInput
          labelTitle="Name"
          name="name"
          control={control}
          register={register}
          defaultValue={bill.Name}
          errors={errors?.name}
          setValue={setValue}
          numberRows={1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FingerprintIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          type="text"
        />
        <FormInput
          labelTitle="Description"
          name="description"
          control={control}
          register={register}
          errors={errors?.description}
          defaultValue={bill.Description}
          setValue={setValue}
          numberRows={8}
          multiline={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          type="text"
        />
        <FormInput
          labelTitle="Data Created"
          name="dataCreated"
          control={control}
          register={register}
          defaultValue={cutDataCreatedToMinutes[0]}
          errors={errors?.dataCreated}
          setValue={setValue}
          required={true}
          numberRows={1}
          InputProps=""
          type="datetime-local"
        />
        <FormInput
          labelTitle="Data End"
          name="dataEnd"
          control={control}
          register={register}
          defaultValue={cutDataEndToMinutes[0]}
          errors={errors?.dataEnd}
          setValue={setValue}
          required={true}
          numberRows={1}
          InputProps=""
          type="datetime-local"
        />
        {loadingUpdateOwnerBill ? (
          <span>
            {" "}
            <LinearProgress className={classes.uploadingLoading} /> <p>Updating bill ...</p>
          </span>
        ) : (
          ""
        )}
        <DialogActions className={classes.buttons}>
          <Button onClick={handleCloseAll} type="cancel_btn" text="Cancel" />
          <input className={classes.submitButton} type="submit" value="Save" />
        </DialogActions>
      </form>
    </div>
  );
};

export default OwnerBillEdit;
