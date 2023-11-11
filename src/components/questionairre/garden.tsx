import { useState, useContext } from "react";
// Context
import QuestionaireContext from "../../context/questionaireContext.tsx";
// Components
import MultipleSelectCheckmarks from "../ui/MultipleSelectCheckmarks";
import CustomSelect from "../ui/customSelect";
import RequiredMessage from "../requiredMessage/requiredMessage";
// Types
import { SelectChangeEvent } from "@mui/material";
import { HouseDetailsData } from "../../utils/types";
// Constants
import { gardenTypes } from "../../utils/constants.ts";
import listOfPlants from "../../utils/plants.json";
// Styles
import "./garden.scss";

const Garden = () => {
  const { answerData, setAnswerData } = useContext(QuestionaireContext);
  const [selectedGarden, setSelectedGarden] = useState(
    answerData?.garden?.type || undefined
  );

  const plantOptions = listOfPlants.data?.map((plant) => plant.common_name);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedGarden(event.target.value as string);
    setAnswerData((prev: HouseDetailsData) => ({
      ...prev,
      garden: { ...prev.garden, type: event.target.value },
    }));
  };

  const hadlePlantChange = (values: string[]) => {
    setAnswerData((prev: HouseDetailsData) => ({
      ...prev,
      garden: {
        ...prev.garden,
        plants: values,
      },
    }));
  };

  return (
    <div className="garden">
      <div>
        <CustomSelect
          label="Select Garden"
          name="garden"
          value={selectedGarden}
          onChange={handleChange}
          options={gardenTypes}
        />
        <RequiredMessage fieldName="Type of Garden" value={selectedGarden} />
      </div>

      {selectedGarden && (
        <div>
          <MultipleSelectCheckmarks
            className="plant-multiple-form-control"
            options={plantOptions}
            value={answerData?.garden?.plants}
            onChange={hadlePlantChange}
          />
          <RequiredMessage
            fieldName="Plant types"
            value={answerData?.garden?.plants?.length}
          />
        </div>
      )}
    </div>
  );
};

export default Garden;
