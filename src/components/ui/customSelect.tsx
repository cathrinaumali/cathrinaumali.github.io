import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Types
import { SelectChangeEvent } from "@mui/material";
import { SelectOptionProps } from "../../utils/types";

interface CustomSelectProps {
  label?: string | React.ReactNode;
  name?: string;
  value?: string;
  options: SelectOptionProps[];
  disabled?: boolean;
  variant?: "filled" | "standard" | "outlined" | undefined;
  placeholder?: string;
  handleClose?: () => void;
  onChange: (event: SelectChangeEvent) => void;
}

const CustomSelect = ({
  label,
  name,
  value = "",
  options,
  disabled,
  variant,
  placeholder,
  onChange,
  handleClose,
}: CustomSelectProps) => {
  return (
    <div>
      <InputLabel id={`${name}-label`}>{label} </InputLabel>
      <FormControl fullWidth>
        <Select
          id={`${name}-select`}
          name={name}
          value={value}
          variant={variant}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          onClose={handleClose}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default CustomSelect;
