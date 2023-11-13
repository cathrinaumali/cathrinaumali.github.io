import { ChangeEvent, useContext, useState } from "react";
// Context
import QuestionaireContext from "../../../context/questionaireContext.tsx";
// Component
import InputField from "../../ui/inputField.tsx";
import FloorSpecifics from "./floorSpecifics.tsx";
import RequiredMessage from "../../requiredMessage/requiredMessage";
// Helpers
import { addFloorsWithRooms, addRoomsToFloor } from "../../../utils/helpers.ts";
// Types
import { Floor, HouseDetailsData } from "../../../utils/types";
// Styles
import "./index.scss";

const Floors = () => {
  const {
    answerData: { floors: floorsArray },
    setAnswerData,
  } = useContext(QuestionaireContext);
  const floors = floorsArray?.length > 0 ? floorsArray?.length : undefined;
  const [floorCount, setFloorCount] = useState<number | undefined>(floors);

  const handleFloorCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCount = Number(event.target.value);
    const floors = addFloorsWithRooms(newCount);
    setAnswerData((prev: HouseDetailsData) => ({ ...prev, floors }));
    setFloorCount(newCount > 0 ? newCount : undefined);
  };

  return (
    <div className="floors-container">
      <InputField
        label="How many floors you'd prefer?"
        value={floorCount}
        type="number"
        onChange={handleFloorCountChange}
        id="floor-count"
        inputProps={{ min: 0, max: 20 }}
      />
      <RequiredMessage fieldName="No. of floors" value={floorCount} />
      {floorsArray?.length > 0 && (
        <div className="floors-container__rooms">
          <h4>How many rooms you'd like on each floor</h4>
          {floorsArray.map((floor: Floor) => {
            return (
              <div className="floors-container__rooms-item" key={floor.id}>
                <InputField
                  label={`No. of rooms in ${floor.name}`}
                  value={floor?.rooms?.length || ""}
                  type="number"
                  inputProps={{ min: 0, max: 20 }}
                  onChange={(e) => {
                    const updatedData = addRoomsToFloor(
                      floorsArray,
                      floor.id,
                      Number(e.target.value)
                    );
                    setAnswerData((prev: HouseDetailsData) => ({
                      ...prev,
                      floors: updatedData,
                    }));
                  }}
                  id="floor-count"
                />
                <RequiredMessage
                  fieldName="No. of rooms"
                  value={floor?.rooms?.length}
                />
              </div>
            );
          })}
        </div>
      )}
      <FloorSpecifics />
    </div>
  );
};

export default Floors;
