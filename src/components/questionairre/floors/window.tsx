import React, { useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import QuestionaireContext from "../../context/questionaireContext";

import InputField from "../../ui/inputField";
import CustomSelect from "../../ui/customSelect";

import {
  windowTypes,
  windowStyles,
  glassTypes,
} from "../../../utils/constants.ts";

import "./window.scss";

const Window = ({ data }) => {
  const {
    answerData: { floors },
  } = useContext(QuestionaireContext);

  const [roomType, setRoomType] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRoomType(event.target.value as string);
  };

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
              <InputField
                name="customType"
                value={data?.customType}
                onChange={handleChange}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Select from the list"
              />
              <CustomSelect
                name="type"
                value={data?.type}
                options={windowTypes}
              />
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
