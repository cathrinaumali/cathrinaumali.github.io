import React, { useState, useContext } from "react";
import CustomSelect from "../ui/customSelect";
import QuestionaireContext from "../context/questionaireContext";

const Garden = () => {
  const [selectedGarden, setSelectedGarden] = useState("");
  const { answerData, setAnswerData } = useContext(QuestionaireContext);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedGarden(event.target.value as string);
    setAnswerData((prev) => ({ ...prev, garden: event.target.value }));
  };

  const gardenTypes = [
    { value: "vegetable", label: "Vegetable Garden" },
    { value: "flower", label: "Flower Garden" },
    { value: "rose", label: "Rose Garden" },
    { value: "herb", label: "Herb Garden" },
    { value: "japanese", label: "Japanese Garden" },
    { value: "water", label: "Water Garden" },
    { value: "rock", label: "Rock Garden (Alpine Garden)" },
    { value: "xeriscape", label: "Xeriscape Garden" },
    { value: "wildflower", label: "Wildflower Garden" },
    { value: "cottage", label: "Cottage Garden" },
    { value: "formal", label: "Formal Garden" },
    { value: "sensory", label: "Sensory Garden" },
    { value: "butterfly", label: "Butterfly Garden" },
  ];

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
