import React, { useState, useContext } from "react";
// Context
import QuestionaireContext from "../context/questionaireContext";
// Component
import CustomSelect from "../ui/customSelect";
// Constants
import { foundationOptions } from "../../utils/constants.ts";

const Foundation = () => {
  const {
    answerData: { foundation: houseFoundation },
    setAnswerData,
  } = useContext(QuestionaireContext);

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
