import React, { useState, useContext } from "react";
import CustomSelect from "../ui/customSelect";
import QuestionaireContext from "../context/questionaireContext";

import { gardenTypes } from "../../utils/constants.ts";

const Garden = () => {
  const [selectedGarden, setSelectedGarden] = useState("");
  const { answerData, setAnswerData } = useContext(QuestionaireContext);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedGarden(event.target.value as string);
    setAnswerData((prev) => ({ ...prev, garden: event.target.value }));
  };

  return (
    <CustomSelect
      label="Select Garden"
      name="garden"
      value={selectedGarden}
      onChange={handleChange}
      options={gardenTypes}
    />
  );
};

export default Garden;
