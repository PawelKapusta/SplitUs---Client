import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Redirect } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles, Theme } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import SearchIcon from "@material-ui/icons/Search";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Paper } from "@material-ui/core";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import DescriptionIcon from "@material-ui/icons/Description";
import InputAdornment from "@material-ui/core/InputAdornment";
import MultiSelect from "react-multi-select-component";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import FormInput from "../components/atoms/FormInput";
import { listUsers } from "../store/actions/userActions";
import { createGroup } from "../store/actions/groupsActions";

interface FormValues {
  name: string;
  description: string;
  dataCreated: string;
  members: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: "4%",
  },
  paper: {
    margin: "auto",
    maxWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      width: 200,
      minHeight: 820,
    },
    [theme.breakpoints.down("md")]: {
      width: 400,
      minHeight: 820,
    },
    [theme.breakpoints.up("lg")]: {
      width: 600,
      minHeight: 820,
    },
  },
  formInput: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 5,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 15,
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 25,
    },
  },
  title: {
    textAlign: "center",
    fontSize: "1.8em",
  },
  label: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    fontSize: "1.2em",
  },
  input: {
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 5,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 15,
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 25,
    },
    backgroundColor: "#F0FFFF",
  },
  groupMembersError: {
    display: "block",
    marginTop: 5,
    color: "red",
    marginLeft: 15,
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
  membersSelector: {
    maxWidth: "90%",
    margin: "auto",
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
  icon: {
    marginBottom: 13,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  createGroupButton: {
    background: "linear-gradient(to right, #eb3349, #f45c43)",
    fontSize: "1.1em",
    border: 0,
    borderRadius: 5,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 46,
    padding: "0 30px",
    cursor: "pointer",
    marginTop: 35,
    marginLeft: 30,
  },
  createLoading: {
    background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
    marginTop: 5,
  },
  addLoading: {
    marginTop: 5,
  },
  alert: {
    backgroundColor: "transparent",
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const GroupCreator: React.FC = () => {
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userList = useSelector((state: RootStateOrAny) => state.userList);
  const { users, loading } = userList;
  const createdGroup = useSelector((state: RootStateOrAny) => state.createdGroup);
  const { loadingCreate, successCreate } = createdGroup;
  const [numberOFMembersError, setNumberOfMembersError] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState([
    {
      label: `${userInfo?.data?.FullName} email: ${userInfo?.data?.Email}`,
      value: `${userInfo?.data?.ID}`,
    },
  ]);
  const options: { label: string; value: string }[] = [];
  const idUsersAsGroupMembers: string[] = [];
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(listUsers());
  }, []);

  const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    description: yup.string().max(1024).required("Description is a required field"),
    dataCreated: yup.string().required("DataCreated is a required field"),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async values => {
    if (selected.length < 2) {
      setNumberOfMembersError(true);
    } else {
      setNumberOfMembersError(false);
      selected?.map(user => idUsersAsGroupMembers.push(user.value));
      console.log("all ids", idUsersAsGroupMembers);
      await dispatch(
        createGroup(values.name, values.description, values.dataCreated, idUsersAsGroupMembers),
      );
      if (successCreate) {
        setOpen(true);
      }
      reset();
      setValue("description", "");
    }
  };

  users?.map((user: any) =>
    options.push({
      label: `${user.FullName} email: ${user.Email}`,
      value: `${user.ID}`,
    }),
  );

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    const temporary = event;
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className={classes.title} id="alert-dialog-slide-title">
            CREATE GROUP
          </DialogTitle>
          <div className={classes.formInput}>
            <FormInput
              labelTitle="Name"
              name="name"
              control={control}
              register={register}
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
          </div>
          <div className={classes.formInput}>
            <FormInput
              labelTitle="Description"
              name="description"
              control={control}
              register={register}
              errors={errors?.description}
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
          </div>
          <div className={classes.formInput}>
            <FormInput
              labelTitle="Data Created"
              name="dataCreated"
              control={control}
              register={register}
              errors={errors?.dataCreated}
              setValue={setValue}
              required={true}
              numberRows={1}
              InputProps=""
              type="datetime-local"
            />
          </div>
          <InputLabel className={classes.label}>Group Members</InputLabel>
          {loading ? (
            <LinearProgress />
          ) : (
            <div className={classes.membersSelector}>
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
                ClearIcon={<SearchIcon />}
                ClearSelectedIcon={<DeleteForeverIcon />}
              />
            </div>
          )}
          {numberOFMembersError ? (
            <span className={classes.groupMembersError}>Group required at least2 members</span>
          ) : (
            ""
          )}
          <input type="submit" value="Create group" className={classes.createGroupButton} />
          {loadingCreate ? (
            <span>
              {" "}
              <LinearProgress className={classes.createLoading} /> <p>Creating group ...</p>
            </span>
          ) : (
            ""
          )}
        </form>
      </Paper>
      {successCreate ? (
        <Snackbar
          className={classes.alert}
          open={open}
          autoHideDuration={4000}
          onClose={handleAlertClose}>
          <Alert severity="success">Successfully created group with selected users</Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </div>
  );
};

export default GroupCreator;
