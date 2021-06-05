import React from "react";
import { InputLabel } from "@material-ui/core";
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";

interface Props {
  labelTitle: string;
  name: string;
  control: any;
  register: any;
  errors: any;
  numberRows: number;
  InputProps: any;
  type: any;
  required?: boolean;
  defaultValue?: any;
  setError?: any;
  setValue?: any;
  multiline?: boolean;
}

const useStyles = makeStyles(
  createStyles({
    label: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: "1.3em",
    },
    input: {
      width: "90%",
      backgroundColor: "#F0FFFF",
    },
    span: {
      display: "block",
      fontSize: "1em",
      marginTop: 5,
      color: "#FF0000",
    },
  }),
);

const FormInput: React.FC<Props> = ({
  labelTitle,
  control,
  register,
  errors,
  name,
  numberRows,
  InputProps,
  type,
  required,
  defaultValue,
  multiline,
  setValue,
}) => {
  const classes = useStyles();

  return (
    <>
      <InputLabel className={classes.label}>{labelTitle}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value } }) => (
          <TextField
            className={classes.input}
            {...register(name, { required: true })}
            id="filled-multiline-flexible"
            name={name}
            rows={numberRows}
            value={value}
            onChange={e => setValue(name, e.target.value)}
            variant="filled"
            margin="normal"
            multiline={multiline}
            InputProps={InputProps}
            type={type}
            required={required}
          />
        )}
        rules={{ required: `${name} required` }}
      />
      <span className={classes.span}>{errors?.message}</span>
    </>
  );
};

export default FormInput;
