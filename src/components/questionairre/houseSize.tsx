import { ChangeEvent, useState, useContext } from "react";
// Context
import QuestionaireContext from "../../context/questionaireContext";
// Component
import InputField from "../ui/inputField";
// Types
import { HouseDetailsData } from "../../utils/types";
// Styles
import "./houseSize.scss";

const HouseSize = () => {
  const {
    setAnswerData,
    answerData: { size },
  } = useContext(QuestionaireContext);
  const [houseSize, setHouseSize] = useState<string | undefined>(size);
  return (
    <div className="house-size">
      <label>
        Preferred house size? <span className="required-form-field">*</span>
      </label>
      <div className="house-size__fields">
        <InputField
          label="Size in sqm?"
          value={houseSize}
          type="number"
          showPlaceholderLabel
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setHouseSize(event.target.value);
            setAnswerData((prev: HouseDetailsData) => ({
              ...prev,
              size: event.target.value,
            }));
          }}
          id="floor-count"
        />
      </div>
    </div>
  );
};

export default HouseSize;
