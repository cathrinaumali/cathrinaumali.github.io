import React, { useState, useContext } from "react";
import CustomSelect from "../ui/customSelect";
import QuestionaireContext from "../context/questionaireContext";

const RoofType = () => {
  const [selectedRoof, setSelectedRoof] = useState("");
  const { answerData, setAnswerData } = useContext(QuestionaireContext);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedRoof(event.target.value as string);
    setAnswerData((prev) => ({ ...prev, roofType: event.target.value }));
  };

  const roofTypes = [
    { value: "straw", label: "Straw" },
    { value: "thatched", label: "Thatched" },
    { value: "tiled", label: "Tiled" },
    { value: "flat", label: "Flat" },
  ];

  return (
    <CustomSelect
      label="Select Roof type"
      name="roofType"
      value={selectedRoof}
      onChange={handleChange}
      options={roofTypes}
    />
  );
};

export default RoofType;
