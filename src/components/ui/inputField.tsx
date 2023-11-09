import React from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { TextFieldVariants } from "@mui/material/TextField";

interface InputFieldProps {
  id?: string;
  name?: string;
  label?: string | number | React.ReactNode;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  variant?: TextFieldVariants;
  showPlaceholderLabel?: boolean;
}
const InputField = ({
  id,
  name = "",
  label,
  value,
  onChange,
  disabled,
  variant = "outlined",
  showPlaceholderLabel = false,
}: InputFieldProps) => {
  return (
    <div>
      {!showPlaceholderLabel && label && (
        <InputLabel id={`${id}-label`}>{label} </InputLabel>
      )}
      <TextField
        id={id}
        name={name}
        disabled={disabled}
        label={showPlaceholderLabel && label ? label : null} // If showLabel is true, TextField label is empty
        variant={variant}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default InputField;
