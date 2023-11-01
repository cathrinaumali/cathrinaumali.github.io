import React, { useState, useContext } from "react";
import CustomSelect from "../ui/customSelect";
import QuestionaireContext from "../context/questionaireContext";

const Foundation = () => {
  const [foundation, setFoundation] = useState("");
  const { answerData, setAnswerData } = useContext(QuestionaireContext);

  const handleChange = (event: SelectChangeEvent) => {
    setFoundation(event.target.value as string);
    setAnswerData((prev) => ({ ...prev, foundation: event.target.value }));
  };
  console.log(answerData);

  const foundationOptions = [
    { value: "brick", label: "Brick" },
    { value: "slab", label: "Slab" },
    { value: "reinforced-concrete", label: "Reinforced concrete" },
  ];

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
