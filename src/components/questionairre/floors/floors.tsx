import React, { useContext, useState } from "react";
// Context
import QuestionaireContext from "../../../context/questionaireContext.tsx";
// Component
import InputField from "../../ui/inputField";
import FloorSpecifics from "./floorSpecifics";
// Helpers
import { addFloorsWithRooms, addRoomsToFloor } from "../../../utils/helpers.ts";
// Styles
import "./floors.scss";

const Floors = () => {
  const {
    answerData: { floors: floorsArray },
    setAnswerData,
  } = useContext(QuestionaireContext);
  const [floorCount, setFloorCount] = useState(floorsArray?.length);

  const handleFloorCountChange = (event) => {
    const newCount = event.target.value;
    const floors = addFloorsWithRooms(newCount);

    setAnswerData((prev) => ({ ...prev, floors }));
    setFloorCount(newCount);
  };

  return (
    <div className="floors-container">
      <InputField
        label="How many floors you'd prefer?"
        value={floorCount}
        onChange={handleFloorCountChange}
        id="floor-count"
      />
      {floorsArray?.length > 0 && (
        <div className="floors-container__rooms">
          <h4>How many rooms you'd like on each floor</h4>
          {floorsArray.map((floor) => {
            return (
              <div className="floors-container__rooms-item" key={floor.id}>
                <InputField
                  label={`No. of rooms in ${floor.name}`}
                  value={floor?.rooms?.length || ""}
                  onChange={(e) => {
                    const updatedData = addRoomsToFloor(
                      floorsArray,
                      floor.id,
                      e.target.value
                    );
                    setAnswerData((prev) => ({
                      ...prev,
                      floors: updatedData,
                    }));
                  }}
                  id="floor-count"
                />
              </div>
            );
          })}
        </div>
      )}
      <hr />
      <FloorSpecifics />
    </div>
  );
};

export default Floors;
