import React, { useState, useContext } from "react";
// Context
import QuestionaireContext from "../context/questionaireContext";
// Components
import MultipleSelectCheckmarks from "../ui/MultipleSelectCheckmarks";
import CustomSelect from "../ui/customSelect";
// Constants
import { gardenTypes } from "../../utils/constants.ts";
import listOfPlants from "../../utils/plants.json";
// Styles
import "./garden.scss";

const plantOptions = listOfPlants.data?.map((plant) => plant.common_name);

const Garden = () => {
  const { answerData, setAnswerData } = useContext(QuestionaireContext);
  const [selectedGarden, setSelectedGarden] = useState(
    answerData?.garden?.type || ""
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedGarden(event.target.value as string);
    setAnswerData((prev) => ({
      ...prev,
      garden: { ...prev.garden, type: event.target.value },
    }));
  };

  const hadlePlantChange = (values) => {
    setAnswerData((prev) => ({
      ...prev,
      garden: {
        ...prev.garden,
        plants: values,
      },
    }));
  };

  return (
    <div className="garden">
      <CustomSelect
        label="Select Garden"
        name="garden"
        value={selectedGarden}
        onChange={handleChange}
        options={gardenTypes}
      />
      <MultipleSelectCheckmarks
        className="plant-multiple-form-control"
        options={plantOptions}
        value={answerData?.garden?.plants}
        onChange={hadlePlantChange}
      />
    </div>
  );
};

export default Garden;
