import React, { useState, useContext } from "react";
import CustomSelect from "../ui/customSelect";
import QuestionaireContext from "../context/questionaireContext";

import { foundationOptions } from "../../utils/constants.ts";

const Foundation = ({ currentStepData }) => {
  const {
    answerData: { foundation: houseFoundation },
    setAnswerData,
  } = useContext(QuestionaireContext);
  //   console.log(currentStepData);
  const [foundation, setFoundation] = useState(houseFoundation);

  const handleChange = (event: SelectChangeEvent) => {
    setFoundation(event.target.value as string);
    setAnswerData((prev) => ({ ...prev, foundation: event.target.value }));
  };

  return (
    <CustomSelect
      label="What type of foundation would you like for your house"
      placeholder="Select Foundation"
      name="foundation"
      value={foundation}
      onChange={handleChange}
      options={foundationOptions}
    />
  );
};

export default Foundation;
