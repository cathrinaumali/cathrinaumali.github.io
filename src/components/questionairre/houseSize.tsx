import React, { useContext } from "react";
// Context
import QuestionaireContext from "../../context/questionaireContext";
// Component
import InputField from "../ui/inputField";
// Styles
import "./houseSize.scss";

const HouseSize = () => {
  const {
    setAnswerData,
    answerData: { size },
  } = useContext(QuestionaireContext);

  return (
    <div className="house-size">
      <label>Preferred house size? *</label>
      <div className="house-size__fields">
        <InputField
          label="Size in Sqm?"
          value={size}
          showPlaceholderLabel
          onChange={(event: SelectChangeEvent) => {
            setAnswerData((prev) => ({
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
