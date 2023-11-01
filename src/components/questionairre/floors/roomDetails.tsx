import React, { useState, useContext } from "react";
import InputField from "../../ui/inputField";
import CustomSelect from "../../ui/customSelect";

import Window from "./window";

import QuestionaireContext from "../../context/questionaireContext";
import {
  updateRoomProperties,
  addWindowsToRoom,
} from "../../../utils/helpers.ts";
import "./roomDetails.scss";

const RoomDetails = ({ data }) => {
  const [roomType, setRoomType] = useState("");
  const [floorType, setFloorType] = useState("");

  const {
    answerData: { floors },
    setAnswerData,
  } = useContext(QuestionaireContext);

  const roomTypes = [
    { value: "bedroom", label: "Bedroom" },
    { value: "lounge", label: "Lounge" },
    { value: "diner", label: "Diner" },
    { value: "kitchen", label: "Kitchen" },
    { value: "bathroom", label: "Bathroom" },
    { value: "office", label: "Office" },
  ];

  const floorTypes = [
    { value: "wood", label: "Wood" },
    { value: "carpet", label: "Carpet" },
  ];
  const handleChange = (event) => {
    const newData = updateRoomProperties(floors, data.id, {
      [event.target.name]: event.target.value,
    });
    setAnswerData((prev) => ({ ...prev, floors: newData }));
  };

  return (
    <div className="room-details">
      <h3>{data.name}</h3>
      <div className="room-details__details">
        <InputField
          label="Size of room in sqm"
          showPlaceholderLabel
          name="size"
          onChange={handleChange}
        />

        <CustomSelect
          label="Type of room"
          name="roomType"
          value={roomType}
          onChange={(event) => {
            handleChange(event);
            setRoomType(event.target.value as string);
          }}
          options={roomTypes}
        />

        <CustomSelect
          label="Floor type"
          name="floorType"
          value={floorType}
          onChange={(event) => {
            handleChange(event);
            setFloorType(event.target.value as string);
          }}
          options={floorTypes}
        />

        <InputField
          label="No. of windows"
          showPlaceholderLabel
          name="windows"
          onChange={(e) => {
            const newData = addWindowsToRoom(floors, data.id, e.target.value);
            setAnswerData((prev) => ({ ...prev, floors: newData }));
          }}
        />
      </div>
      {data.windows?.length > 0 &&
        data.windows.map((window) => <Window data={window} />)}
    </div>
  );
};

export default RoomDetails;
