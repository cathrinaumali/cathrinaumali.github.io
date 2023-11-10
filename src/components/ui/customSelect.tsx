import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Types
import { SelectChangeEvent } from "@mui/material";
import { SelectOptionProps } from "../../utils/types";

interface CustomSelectProps {
  label?: string;
  name?: string;
  value?: string;
  onChange: (event: SelectChangeEvent) => void;
  options: SelectOptionProps[];
  disabled?: boolean;
  variant?: "filled" | "standard" | "outlined" | undefined;
  placeholder?: string;
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
