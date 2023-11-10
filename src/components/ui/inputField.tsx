import React, { HTMLInputTypeAttribute } from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { TextFieldVariants } from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  hideSpinner: {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
  },
});
interface InputFieldProps {
  id?: string;
  name?: string;
  label?: string | number | React.ReactNode;
  value?: string | number;
  type?: HTMLInputTypeAttribute;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  disabled?: boolean;
  variant?: TextFieldVariants;
  showPlaceholderLabel?: boolean;
}
const InputField = ({
  id,
  name = "",
  label,
  value,
  type,
  disabled,
  variant = "outlined",
  showPlaceholderLabel = false,
  onChange,
}: InputFieldProps) => {
  const classes = useStyles();

  return (
    <div>
      {!showPlaceholderLabel && label && (
        <InputLabel id={`${id}-label`}>{label} </InputLabel>
      )}
      <TextField
        id={id}
        name={name}
        type={type}
        disabled={disabled}
        label={showPlaceholderLabel && label ? label : null}
        variant={variant}
        value={value}
        className={classes.hideSpinner}
        onChange={(event) => {
          const regex = /^[0-9]*$/;
          if (type === "number" && !regex.test(event.target.value)) {
            return;
          } else {
            onChange?.(event);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
          }
        }}
      />
    </div>
  );
};
export default InputField;
