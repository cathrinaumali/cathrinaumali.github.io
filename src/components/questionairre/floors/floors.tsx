import React, { useContext, useState } from "react";
import QuestionaireContext from "../../context/questionaireContext";
import InputField from "../../ui/inputField";
import { addFloorsWithRooms, addRoomsToFloor } from "../../../utils/helpers.ts";
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
          <h4 htmlFor="">How many rooms you'd like on each floor</h4>
          {floorsArray.map((item) => {
            return (
              <div className="floors-container__rooms-item" key={item.id}>
                <InputField
                  label={item.name}
                  value={item?.rooms?.length}
                  onChange={(e) => {
                    const updatedData = addRoomsToFloor(
                      floorsArray,
                      item.id,
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
    </div>
  );
};

export default Floors;
