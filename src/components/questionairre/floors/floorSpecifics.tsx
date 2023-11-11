import { useContext } from "react";
// Context
import QuestionaireContext from "../../../context/questionaireContext";
// Component
import RoomDetails from "./roomDetails";
// Types
import { Floor, Room } from "../../../utils/types";
// Styles
import "./floorSpecifics.scss";

const FloorSpecifics = () => {
  const {
    answerData: { floors },
  } = useContext(QuestionaireContext);

  return (
    <div className="floor-specifics">
      {floors?.length > 0 &&
        floors.map((floor: Floor, index: number) => {
          if (floor.rooms?.length > 0) {
            return (
              <div key={floor.id} className="floor-specifics__item">
                <hr />
                <h1>Floor {index + 1}</h1>
                {floor.rooms?.map((room: Room, index: number) => (
                  <RoomDetails key={room.id} data={room} index={index} />
                ))}
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

export default FloorSpecifics;
