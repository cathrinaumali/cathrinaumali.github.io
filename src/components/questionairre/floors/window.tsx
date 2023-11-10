import { useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
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
// Types
import { SelectChangeEvent } from "@mui/material/Select";
import { Window, SELECTED_RADIO, HouseDetailsData } from "../../../utils/types";
// Styles
import "./window.scss";

const RADIO_ONE: SELECTED_RADIO = "add-new";
const RADIO_TWO: SELECTED_RADIO = "select";

interface WindowProps {
  windowData: Window;
  roomId: number;
}

const WindowComponent = ({ windowData, roomId }: WindowProps) => {
  const {
    answerData: { floors },
    setAnswerData,
  } = useContext(QuestionaireContext);

  const [windowType, setWindowType] = useState<string | undefined>(
    windowData?.type || undefined
  );
  const [selectedRadio, setSelectedRadio] = useState<SELECTED_RADIO>(
    windowData.selectedRadio || RADIO_ONE
  );
  const [windowStyle, setWindowStyle] = useState<string | undefined>(
    windowData.style || undefined
  );
  const [glassType, setGlassType] = useState<string | undefined>(
    windowData.glassType
  );

  const updateWindowData = (updates: Partial<Window>) => {
    const newData = updateWindowProperties(
      floors,
      roomId,
      windowData.id,
      updates
    );
    setAnswerData((prev: HouseDetailsData) => ({ ...prev, floors: newData }));
  };

  // const onWindowTypeInputChange = (
  //   event: SelectChangeEvent | ChangeEvent<HTMLInputElement>
  // ) => {
  // const selectedValue = "target" in event ? event.target.value : "";
  //   setWindowType(event.target.value as string);
  //   updateWindowData({ type: event.target.value });
  // };

  const onWindowTypeInputChange = (selectedValue: string) => {
    setWindowType(selectedValue);
    updateWindowData({ type: selectedValue });
  };

  const onCheckboxSelect = (selectedRadio: SELECTED_RADIO) => {
    setSelectedRadio(selectedRadio);
    updateWindowData({ selectedRadio, type: undefined });
    setWindowType(undefined);
  };

  const onSelectChange = (event: SelectChangeEvent) => {
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
                onChange={() => onCheckboxSelect(RADIO_ONE)}
              />
              {selectedRadio === RADIO_ONE && (
                <InputField
                  name="windowType"
                  disabled={selectedRadio !== RADIO_ONE}
                  variant={selectedRadio !== RADIO_ONE ? "filled" : "outlined"}
                  value={windowType}
                  // onChange={onWindowTypeInputChange}
                  onChange={(e) => onWindowTypeInputChange(e.target.value)}
                />
              )}

              <FormControlLabel
                value={RADIO_TWO}
                control={<Radio />}
                label="Select from the list"
                onChange={() => onCheckboxSelect(RADIO_TWO)}
              />

              {selectedRadio === RADIO_TWO && (
                <CustomSelect
                  name="windowType"
                  value={windowType}
                  disabled={selectedRadio !== RADIO_TWO}
                  variant={selectedRadio !== RADIO_TWO ? "filled" : "outlined"}
                  options={windowTypes}
                  onChange={(e) => onWindowTypeInputChange(e.target.value)}
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

export default WindowComponent;
