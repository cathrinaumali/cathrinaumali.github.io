import React, { useContext } from "react";
import QuestionaireContext from "../context/questionaireContext";
import InputField from "../ui/inputField";

import "./houseSize.scss";

const HouseSize = () => {
  const {
    setAnswerData,
    answerData: {
      size: { width, length },
    },
  } = useContext(QuestionaireContext);

  return (
    <div className="house-size">
      <label>Preferred house size? *</label>
      <div className="house-size__fields">
        <InputField
          label="Width in meters?"
          value={width}
          showPlaceholderLabel
          onChange={(event: SelectChangeEvent) => {
            setAnswerData((prev) => ({
              ...prev,
              size: {
                ...prev.size,
                width: event.target.value,
              },
            }));
          }}
          id="floor-count"
        />
        <InputField
          label="Length in meters?"
          value={length}
          showPlaceholderLabel
          onChange={(event: SelectChangeEvent) => {
            setAnswerData((prev) => ({
              ...prev,
              size: {
                ...prev.size,
                length: event.target.value,
              },
            }));
          }}
          id="floor-count"
        />
      </div>
    </div>
  );
};

export default HouseSize;
