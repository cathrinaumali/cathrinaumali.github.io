import React, { HTMLInputTypeAttribute } from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { TextFieldVariants } from "@mui/material/TextField";
import "./inputField.scss";

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
  inputProps?: { min: number; max: number };
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
  inputProps,
  onChange,
}: InputFieldProps) => {
  return (
    <div>
      {!showPlaceholderLabel && label && (
        <InputLabel id={`${id}-label`}>{label} </InputLabel>
      )}
      <TextField
        id={id}
        name={name}
        type={"text"}
        disabled={disabled}
        label={showPlaceholderLabel && label ? label : null}
        variant={variant}
        value={value}
        onChange={(event) => {
          const regex = /^[0-9]*$/;
          if (type === "number") {
            if (!regex.test(event.target.value)) {
              return;
            }
            if (inputProps) {
              const maxValue = inputProps.max
                ? parseFloat(inputProps.max.toString())
                : Number.MAX_VALUE;

              const enteredValue = event.target.value;

              if (
                enteredValue !== "" &&
                (isNaN(parseFloat(enteredValue)) ||
                  parseFloat(enteredValue) > maxValue)
              ) {
                // Input is either not a number or higher than the allowed max
                // Prevent updating the state
                return;
              }
            }
            onChange?.(event);
          } else {
            onChange?.(event);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
          }
        }}
        inputProps={{
          ...inputProps,
          id: "your-number-input-id",
          ...(type === "number"
            ? {
                inputMode: "numeric",
                pattern: "[0-9]*", // Allows only numbers
              }
            : {}),
        }}
      />
    </div>
  );
};
export default InputField;
