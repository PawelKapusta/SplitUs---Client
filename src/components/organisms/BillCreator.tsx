import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import DescriptionIcon from "@material-ui/icons/Description";
import InputLabel from "@material-ui/core/InputLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import MultiSelect from "react-multi-select-component";
import SearchIcon from "@material-ui/icons/Search";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import FormInput from "../atoms/FormInput";
import defaultBillImage from "../../assets/svg/defaultBillImage.svg";
import { listCurrencies } from "../../store/actions/currencyActions";
import { listUsers } from "../../store/actions/userActions";
import { createBill } from "../../store/actions/billsActions";

interface Props {
  groupId: string;
  handleClose: any;
}

interface FormValues {
  name: string;
  description: string;
  dataCreated: string;
  dataEnd: string;
  billImage: string;
  currencyCode: string;
  debt: number;
  members: any;
  selectedLength: number;
  splitEvenly: string;
  allDebts: number[];
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
      width: 600,
      minHeight: 820,
    },
    [theme.breakpoints.up("lg")]: {
      width: 700,
      minHeight: 820,
    },
  },
  formInput: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 5,
      marginTop: 10,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 15,
      marginTop: 10,
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 25,
      marginTop: 10,
    },
  },
  title: {
    textAlign: "center",
    fontSize: "1.8em",
  },
  label: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    fontSize: "1.3em",
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
  membersSelector: {
    maxWidth: "90%",
    margin: "auto",
  },
  formControl: {
    marginTop: 12,
    marginBottom: 12,
    minWidth: 200,
  },
  icon: {
    marginBottom: 13,
  },
  currencySelect: {
    width: "100%",
    minWidth: "15ch",
    maxWidth: "30ch",
    border: "1px solid #777",
    borderRadius: "0.25em",
    padding: "0.25em 0.5em",
    fontSize: " 1.25rem",
    cursor: "pointer",
    lineHeight: 1.1,
    backgroundColor: "#fff",
    backgroundImage: "linear-gradient(to top, #f9f9f9, #fff 33%)",
    marginBottom: 12,
  },
  billImageInput: {
    marginLeft: 30,
  },
  membersWarningError: {
    fontSize: ".8em",
    fontWeight: "bold",
    color: "red",
  },
  createBillButton: {
    background: "linear-gradient(to right, #7474bf, #348ac7)",
    fontSize: "1.1em",
    border: 0,
    borderRadius: 5,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 46,
    padding: "0 30px",
    cursor: "pointer",
    marginTop: 25,
    marginLeft: 15,
    marginBottom: 15,
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
  span: {
    display: "block",
    fontSize: "1.05em",
    marginTop: 5,
    marginLeft: 25,
    color: "#FF0000",
  },
  mainNotEvenlySpan: {
    marginLeft: 14,
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "#4776e6",
  },
  debtLabel: {
    marginLeft: 15,
    color: "#ed213a",
    fontSize: "1.1em",
  },
  selectedOneUSer: {
    marginTop: 13,
    border: "2px solid #a8c0ff",
  },
  selectedUserLabel: {
    fontSize: "1.4em",
    marginLeft: 15,
    marginRight: 25,
  },
  selectedUserInput: {
    width: "80%",
    border: "1px solid #777",
    borderRadius: "0.25em",
    padding: "0.25em 0.5em",
    fontSize: " 1.25rem",
    lineHeight: 1.1,
    backgroundColor: "#fff",
    backgroundImage: "linear-gradient(to top, #f9f9f9, #fff 33%)",
    marginBottom: 15,
  },
}));

const BillCreator: React.FC<Props> = ({ groupId, handleClose }) => {
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;
  const usersOfGroup = useSelector((state: RootStateOrAny) => state.usersOfGroup);
  const { users, loading: usersOfGroupLoading } = usersOfGroup;
  const currencyList = useSelector((state: RootStateOrAny) => state.currencyList);
  const { loading: currencyLoading, currency } = currencyList;
  const { currencies } = currency;
  console.log("currencies", currencies);
  const dispatch = useDispatch();
  const allDebtsEvenly: { id: string; value: number }[] = [];
  const classes = useStyles();
  const [numberOFMembersError, setNumberOfMembersError] = useState(false);
  const [dataComparisionError, setDataComparisionError] = useState(false);
  const [notEqualDebtsError, setNotEqualDebtsError] = useState(false);
  const [image, setImage] = useState(defaultBillImage);
  const allCurrencyCodes = currencies?.map((current: any) => current?.code);
  console.log(allCurrencyCodes);
  const [allDebts, setAllDebts] = useState<any>([]);
  const [selected, setSelected] = useState([
    {
      label: `${userInfo?.data?.FullName} email: ${userInfo?.data?.Email}`,
      value: `${userInfo?.data?.ID}`,
    },
  ]);

  useEffect(() => {
    dispatch(listCurrencies());
    dispatch(listUsers());
  }, []);

  const options: { label: string; value: string }[] = [];
  users?.map((user: any) =>
    options.push({
      label: `${user?.FullName} email: ${user?.Email}`,
      value: `${user?.ID}`,
    }),
  );

  const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    description: yup.string().required("Description is a required field"),
    dataCreated: yup.string().required("DataCreated is a required field"),
    dataEnd: yup.string().required("DataEnd is a required field"),
    billImage: yup.string().url(),
    currencyCode: yup.string().required("Currency code is a required field"),
    debt: yup.number().required("Debt is a required field"),
    selectedLength: yup.number(),
    splitEvenly: yup.string().required("Split evenly option is a required field").default("true"),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const watchSplitEvenly = watch("splitEvenly", "true");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "l0hqmgyr");

    try {
      const resp = await axios.post(
        "https://api.cloudinary.com/v1_1/duk476xud/image/upload",
        formData,
      );
      return resp.data.url;
    } catch (e) {
      console.log(e);
    }
    return defaultBillImage;
  };

  const onSubmit: SubmitHandler<FormValues> = async values => {
    if (selected.length < 2) {
      setNumberOfMembersError(true);
    } else {
      setNumberOfMembersError(false);
      if (values.dataCreated > values.dataEnd) {
        setDataComparisionError(true);
      } else {
        setDataComparisionError(false);
        let sum = 0;
        if (watchSplitEvenly === "true") {
          const eachDebt = Number((values.debt / selected.length).toFixed(2));
          console.log("each", eachDebt);

          selected?.map((user: any) => {
            allDebtsEvenly.push({ id: user?.value, value: eachDebt });
          });

          const send = uploadImage().then(url => {
            dispatch(
              createBill(
                values.name,
                values.description,
                values.dataCreated,
                values.dataEnd,
                url,
                values.currencyCode,
                values.debt,
                userInfo?.data?.ID,
                "",
                groupId,
                allDebtsEvenly,
                false,
              ),
            );
          });

          console.log("values", values);
          console.log(groupId);
          reset();

          handleClose();
        } else {
          /* eslint-disable */
          allDebts.map((user: any) => (sum += user.value));
          /* eslint-enable */
          console.log("sum", sum);
          if (sum !== values.debt) {
            setNotEqualDebtsError(true);
          } else {
            setNotEqualDebtsError(false);
            const send = uploadImage().then(url => {
              dispatch(
                createBill(
                  values.name,
                  values.description,
                  values.dataCreated,
                  values.dataEnd,
                  url,
                  values.currencyCode,
                  values.debt,
                  userInfo?.data?.ID,
                  "",
                  groupId,
                  allDebts,
                  false,
                ),
              );
            });
            console.log("values", values);
            console.log(groupId);
            reset();

            handleClose();
          }
        }
      }
    }
  };
  {
    console.log("All debts", allDebts);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className={classes.title} id="alert-dialog-slide-title">
            CREATE BILL
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
          <div className={classes.formInput}>
            <FormInput
              labelTitle="Data End"
              name="dataEnd"
              control={control}
              register={register}
              errors={errors?.dataEnd}
              setValue={setValue}
              required={true}
              numberRows={1}
              InputProps=""
              type="datetime-local"
            />
          </div>
          {dataComparisionError ? (
            <span className={classes.span}>Check if data created is before data end</span>
          ) : (
            ""
          )}
          <InputLabel className={classes.label}>Bill Image</InputLabel>
          <span className={classes.billImageInput}>
            <input type="file" onChange={event => setImage(event.target.files![0] as any)} />
          </span>
          <span className={classes.span}>{errors.billImage?.message}</span>
          <InputLabel className={classes.label}>Currency</InputLabel>
          {currencyLoading ? (
            <LinearProgress />
          ) : (
            <div className={classes.formInput}>
              <select
                className={classes.currencySelect}
                {...register("currencyCode", { required: true })}>
                {allCurrencyCodes?.map((code: string) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className={classes.formInput}>
            <FormInput
              labelTitle="Debt"
              name="debt"
              control={control}
              register={register}
              errors={errors?.debt}
              setValue={setValue}
              numberRows={1}
              InputProps=""
              type="number"
            />
          </div>
          <InputLabel className={classes.label}>
            Group Members{" "}
            <span className={classes.membersWarningError}>(Must be at least 2 people in bill)</span>
          </InputLabel>
          {usersOfGroupLoading ? (
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
            <span className={classes.span}>Required at least 2 people in the bill</span>
          ) : (
            ""
          )}
          {watchSplitEvenly === "false" && selected.length < 2 ? (
            <span className={classes.span}>Required at least 2 people in the bill</span>
          ) : (
            ""
          )}
          <InputLabel className={classes.label}>
            Split debt evenly between selected users?
          </InputLabel>
          <div className={classes.formInput}>
            <select
              className={classes.currencySelect}
              {...register("splitEvenly", { required: true })}>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
          {/* eslint-disable */}
          {watchSplitEvenly === "false" && !numberOFMembersError ? (
            <>
              <span className={classes.mainNotEvenlySpan}>Please write each user debt: </span>
              {notEqualDebtsError ? (
                <span className={classes.span}>Debts are not split equivalently!</span>
              ) : (
                ""
              )}
              {selected?.map(user => (
                <div className={classes.selectedOneUSer}>
                  <span className={classes.selectedUserLabel}>{user?.label}</span>
                  <div>
                    <span className={classes.debtLabel}>Debt: </span>
                    <input
                      className={classes.selectedUserInput}
                      type="number"
                      required
                      onChange={e =>
                        setAllDebts((prevState: any) => {
                          return [
                            ...(prevState?.filter((el: any) => el.id !== user?.value) || []),
                            {
                              id: user?.value,
                              value: Number(e.target.value),
                            },
                          ];
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            ""
          )}

          {/* eslint-enable */}
          <input type="submit" value="Create bill" className={classes.createBillButton} />
        </form>
      </Paper>
    </div>
  );
};

export default BillCreator;
