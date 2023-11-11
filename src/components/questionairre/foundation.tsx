import { useState, useContext } from "react";
// Context
import QuestionaireContext from "../../context/questionaireContext.tsx";
// Component
import CustomSelect from "../ui/customSelect";
import RequiredMessage from "../requiredMessage/requiredMessage";
// Types
import { SelectChangeEvent } from "@mui/material";
import { HouseDetailsData } from "../../utils/types";
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
    setAnswerData((prev: HouseDetailsData) => ({
      ...prev,
      foundation: event.target.value,
    }));
  };

  return (
    <>
      <CustomSelect
        label="What type of foundation would you like for your house?"
        placeholder="Select Foundation"
        name="foundation"
        value={foundation}
        onChange={handleChange}
        handleClose={() => console.log("closed")}
        options={foundationOptions}
      />
      <RequiredMessage fieldName="foundation" value={foundation} />
    </>
  );
};

export default Foundation;
