import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import DescriptionIcon from "@material-ui/icons/Description";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import FormInput from "../atoms/FormInput";
import { createQuestionFAQ } from "../../store/actions/questionsFaqActions";

interface FormValues {
  question: string;
  answer: string;
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
      minHeight: 420,
    },
    [theme.breakpoints.down("md")]: {
      width: 600,
      minHeight: 420,
    },
    [theme.breakpoints.up("lg")]: {
      width: 600,
      minHeight: 420,
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
  formControl: {
    marginTop: 12,
    marginBottom: 12,
    minWidth: 200,
  },
  icon: {
    marginBottom: 13,
  },
  createQuestionButton: {
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
  loadingCreate: {
    background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
    marginTop: 5,
  },
}));

const QuestionFaqCreator: React.FC = () => {
  const questionFaqCreated = useSelector((state: RootStateOrAny) => state.questionFaqCreated);
  const { loading } = questionFaqCreated;
  const dispatch = useDispatch();
  const classes = useStyles();

  const schema = yup.object().shape({
    question: yup.string().max(1024).required("Question is a required field"),
    answer: yup.string().required("Answer is a required field"),
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
    dispatch(createQuestionFAQ(values.question, values.answer));
    console.log(values);
    reset();
    setValue("answer", "");
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className={classes.title} id="alert-dialog-slide-title">
            CREATE QUESTION FAQ
          </DialogTitle>
          <div className={classes.formInput}>
            <FormInput
              labelTitle="Question"
              name="question"
              control={control}
              register={register}
              errors={errors?.question}
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
              labelTitle="Answer"
              name="answer"
              control={control}
              register={register}
              errors={errors?.answer}
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
          {/* eslint-enable */}
          <input type="submit" value="Create question" className={classes.createQuestionButton} />
        </form>
        {loading ? (
          <span>
            <LinearProgress color="secondary" className={classes.loadingCreate} />{" "}
            <p>Create loading ...</p>
          </span>
        ) : (
          ""
        )}
      </Paper>
    </div>
  );
};

export default QuestionFaqCreator;
