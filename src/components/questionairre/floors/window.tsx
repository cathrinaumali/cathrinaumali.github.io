import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import InputField from "../../ui/inputField";
import CustomSelect from "../../ui/customSelect";
import "./window.scss";

const Window = ({ data }) => {
  const [roomType, setRoomType] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRoomType(event.target.value as string);
  };

  const windowTypes = [
    { value: "casement", label: "Casement" },
    { value: "double-hung", label: "Double-Hung" },
    { value: "awning", label: "Awning" },
    { value: "sliding", label: "Sliding" },
    { value: "bay", label: "Bay" },
    { value: "bow", label: "Bow" },
    { value: "picture", label: "Picture" },
    { value: "skylight", label: "Skylight" },
    { value: "frosted", label: "Frosted" },
    { value: "stained-glass", label: "Stained Glass" },
  ];

  const windowStyles = [
    { value: "bay", label: "Bay" },
    { value: "flat", label: "Flat" },
    { value: "full-height", label: "Full Height" },
  ];

  const glassTypes = [
    { value: "tempered", label: "Tempered" },
    { value: "triple-glazed", label: "Triple Glazed" },
    { value: "double-glazed", label: "Double Glazed" },
  ];

  return (
    <div className="window-specifics">
      <h4>{data.name}</h4>
      <div className="window-specifics__details">
        <div className="window-specifics__window-type">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Window type
            </FormLabel>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="add-new"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="add-new"
                control={<Radio />}
                label="Add new"
              />
              <InputField name="size" onChange={handleChange} />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Select from the list"
              />
              <CustomSelect options={windowTypes} />
            </RadioGroup>
          </FormControl>
        </div>
        <CustomSelect label="Style" name="style" options={windowStyles} />
        <CustomSelect
          label="Glass Type"
          name="glass-type"
          options={glassTypes}
        />
      </div>
    </div>
  );
};

export default Window;
