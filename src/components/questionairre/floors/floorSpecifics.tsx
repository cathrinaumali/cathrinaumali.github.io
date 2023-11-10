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
        floors.map((floor: Floor) => {
          if (floor.rooms?.length > 0) {
            return (
              <div key={floor.id} className="floor-specifics__item">
                <hr />
                <h1>{floor.name}</h1>
                {floor.rooms?.map((room: Room) => (
                  <RoomDetails key={room.id} data={room} />
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
