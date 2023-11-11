import { useState, useContext } from "react";
// Context
import QuestionaireContext from "../../../context/questionaireContext.tsx";
// Component
import InputField from "../../ui/inputField";
import CustomSelect from "../../ui/customSelect";
import Window from "./window";
// Helpers
import {
  updateRoomProperties,
  addWindowsToRoom,
} from "../../../utils/helpers.ts";
// Types
import { Room, HouseDetailsData } from "../../../utils/types";
// Constants
import { roomTypes, floorTypes } from "../../../utils/constants.ts";
// Styles
import "./roomDetails.scss";

const RoomDetails = ({ data, index }: { data: Room; index: number }) => {
  const {
    answerData: { floors },
    setAnswerData,
  } = useContext(QuestionaireContext);

  const [roomType, setRoomType] = useState<string>(data?.roomType || "");
  const [floorType, setFloorType] = useState<string>(data?.floorType || "");
  const [windowCount, setWindowCount] = useState<number | undefined>(
    data?.windows?.length
  );

  const handleChange = (name: string, value: string) => {
    const newData = updateRoomProperties(floors, data.id, { [name]: value });
    setAnswerData((prev: HouseDetailsData) => ({ ...prev, floors: newData }));
  };
  return (
    <div className="room-details">
      <h3>Room {index + 1}</h3>
      <div className="room-details__details">
        <InputField
          name="size"
          type="number"
          label="Size of room in sqm"
          value={data?.size}
          showPlaceholderLabel
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
        />

        <CustomSelect
          label="Type of room"
          name="roomType"
          value={roomType}
          onChange={(event) => {
            handleChange(event.target.name, event.target.value as string);
            setRoomType(event.target.value as string);
          }}
          options={roomTypes}
        />

        <CustomSelect
          label="Floor type"
          name="floorType"
          value={floorType}
          onChange={(event) => {
            handleChange(event.target.name, event.target.value as string);
            setFloorType(event.target.value as string);
          }}
          options={floorTypes}
        />

        <InputField
          label="No. of windows"
          value={windowCount}
          showPlaceholderLabel
          name="windows"
          type="number"
          onChange={(e) => {
            const count = Number(e.target.value);
            const newData = addWindowsToRoom(floors, data.id, count);
            setAnswerData((prev: HouseDetailsData) => ({
              ...prev,
              floors: newData,
            }));
            setWindowCount(count > 0 ? count : undefined);
          }}
        />
      </div>
      {data.windows?.length > 0 &&
        data.windows.map((window) => (
          <Window key={data.id} roomId={data.id} windowData={window} />
        ))}
    </div>
  );
};

export default RoomDetails;
