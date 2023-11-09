import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultipleSelectCheckmarks {
  className?: string;
  options: string[];
  value: string[];
  onChange: (values: string) => void;
}

export default function MultipleSelectCheckmarks({
  className,
  options,
  value,
  onChange,
}: MultipleSelectCheckmarks) {
  const [plantName, setPersontName] = React.useState<string[]>(value);

  const handleChange = (event: SelectChangeEvent<typeof plantName>) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === "string" ? [...value] : value;
    setPersontName(newValue);
    onChange(newValue);
  };

  return (
    <FormControl className={className}>
      <InputLabel id="plant-multiple-checkbox-label">Plants</InputLabel>
      <Select
        labelId="plant-multiple-checkbox-label"
        id="plant-multiple-checkbox"
        multiple
        value={plantName}
        onChange={handleChange}
        input={<OutlinedInput label="Plants" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((plant) => (
          <MenuItem key={plant} value={plant}>
            <Checkbox checked={plantName.indexOf(plant) > -1} />
            <ListItemText primary={plant} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
