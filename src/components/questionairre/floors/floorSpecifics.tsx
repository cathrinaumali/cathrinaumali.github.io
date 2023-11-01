import React, { useContext } from "react";
import QuestionaireContext from "../../context/questionaireContext";
import RoomDetails from "./roomDetails";

import "./floorSpecifics.scss";

const FloorSpecifics = () => {
  const {
    answerData: { floors },
  } = useContext(QuestionaireContext);

  return (
    <div className="floor-specifics">
      {floors?.length > 0 &&
        floors.map((floor) => {
          return (
            <div key={floor.id} className="floor-specifics__item">
              <h1>{floor.name}</h1>
              {floor.rooms?.map((room) => (
                <RoomDetails key={room.id} data={room} />
              ))}
            </div>
          );
        })}
    </div>
  );
};

export default FloorSpecifics;
