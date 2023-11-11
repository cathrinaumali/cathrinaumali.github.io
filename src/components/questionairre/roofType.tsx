import { useState, useContext } from "react";
// Context
import QuestionaireContext from "../../context/questionaireContext";
// Components
import CustomSelect from "../ui/customSelect";
import RequiredMessage from "../requiredMessage/requiredMessage";
// Types
import { SelectChangeEvent } from "@mui/material";
import { SelectOptionProps, HouseDetailsData } from "../../utils/types";

const RoofType = () => {
  const { answerData, setAnswerData } = useContext(QuestionaireContext);
  const [selectedRoof, setSelectedRoof] = useState(answerData?.roofType || "");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedRoof(event.target.value as string);
    setAnswerData((prev: HouseDetailsData) => ({
      ...prev,
      roofType: event.target.value,
    }));
  };

  const roofTypes: SelectOptionProps[] = [
    { value: "straw", label: "Straw" },
    { value: "thatched", label: "Thatched" },
    { value: "tiled", label: "Tiled" },
    { value: "flat", label: "Flat" },
  ];

  return (
    <>
      <CustomSelect
        label="Select Roof type"
        name="roofType"
        value={selectedRoof}
        onChange={handleChange}
        options={roofTypes}
      />
      <RequiredMessage fieldName="Roof Type" value={selectedRoof} />
    </>
  );
};

export default RoofType;
