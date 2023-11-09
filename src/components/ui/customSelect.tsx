import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  name?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option;
  disabled?: boolean;
  variant?: "filled" | "standard" | "outlined" | undefined;
}
const CustomSelect = ({
  label,
  name,
  value = "",
  onChange,
  options,
  disabled,
  variant,
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
          onChange={onChange}
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
