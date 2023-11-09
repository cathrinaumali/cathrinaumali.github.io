import React, { useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
// Context
import QuestionaireContext from "../../../context/questionaireContext.tsx";
// Component
import InputField from "../../ui/inputField";
import CustomSelect from "../../ui/customSelect";
// Constants
import {
  windowTypes,
  windowStyles,
  glassTypes,
} from "../../../utils/constants.ts";
// Helpers
import { updateWindowProperties } from "../../../utils/helpers.ts";
// Styles
import "./window.scss";

const RADIO_ONE: string = "add-new";
const RADIO_TWO: string = "select";
type SELECTED_RADIO = "add-new" | "select";

const Window = ({ windowData, roomId }) => {
  const {
    answerData: { floors },
    setAnswerData,
  } = useContext(QuestionaireContext);

  const [windowType, setWindowType] = useState<string | null>(
    windowData?.type || null
  );
  const [selectedRadio, setSelectedRadio] = useState<SELECTED_RADIO>(
    windowData.selectedRadio || RADIO_ONE
  );
  const [windowStyle, setWindowStyle] = useState(windowData.style);
  const [glassType, setGlassType] = useState(windowData.glassType);

  const updateWindowData = (updates) => {
    const newData = updateWindowProperties(
      floors,
      roomId,
      windowData.id,
      updates
    );
    setAnswerData((prev) => ({ ...prev, floors: newData }));
  };

  const onWindowTypeChange = (event: SelectChangeEvent) => {
    setWindowType(event.target.value as string);
    updateWindowData({ type: event.target.value });
  };

  const onCheckboxSelect = (e) => {
    setSelectedRadio(e.target.value);
    updateWindowData({ selectedRadio: e.target.value, type: null });
    setWindowType(null);
  };

  const onSelectChange = (event) => {
    const updates = { [event.target.name]: event.target.value };
    updateWindowData(updates);
  };

  return (
    <div className="window-specifics">
      <h4>{windowData.name}</h4>
      <div className="window-specifics__details">
        <div className="window-specifics__window-type">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Window type
            </FormLabel>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={selectedRadio}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={RADIO_ONE}
                control={<Radio />}
                label="Add new"
                onChange={onCheckboxSelect}
              />
              {selectedRadio === RADIO_ONE && (
                <InputField
                  name="windowType"
                  disabled={selectedRadio !== RADIO_ONE}
                  variant={selectedRadio !== RADIO_ONE ? "filled" : "outlined"}
                  value={windowType}
                  onChange={onWindowTypeChange}
                />
              )}

              <FormControlLabel
                value={RADIO_TWO}
                control={<Radio />}
                label="Select from the list"
                onChange={onCheckboxSelect}
              />

              {selectedRadio === RADIO_TWO && (
                <CustomSelect
                  name="windowType"
                  value={windowType}
                  disabled={selectedRadio !== RADIO_TWO}
                  variant={selectedRadio !== RADIO_TWO ? "filled" : "outlined"}
                  options={windowTypes}
                  onChange={onWindowTypeChange}
                />
              )}
            </RadioGroup>
          </FormControl>
        </div>
        <CustomSelect
          label="Style"
          name="style"
          value={windowStyle}
          options={windowStyles}
          onChange={(e) => {
            onSelectChange(e);
            setWindowStyle(e.target.value);
          }}
        />
        <CustomSelect
          label="Glass Type"
          name="glassType"
          value={glassType}
          options={glassTypes}
          onChange={(e) => {
            onSelectChange(e);
            setGlassType(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Window;
