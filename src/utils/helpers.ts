import { requiredRoomFields, requiredWindowFields } from "./constants";
import { Step, Floor, Window, Room } from "./types";

/**
 * Function to create an array of floors with rooms
 *
 *
 * @param {number} numFloors - The number of floors to create.
 * @returns {Array} An array of floors with rooms.
 */
export const addFloorsWithRooms = (numFloors: number) => {
  const createFloor = (id: number) => ({
    id,
    name: `Floor ${id}`,
    // count: null,
    rooms: [],
  });

  const floors = Array.from({ length: numFloors }, (_, floorIndex) =>
    createFloor(floorIndex + 1)
  );

  return floors;
};

/**
 * Function to add rooms to a specific floor
 *
 *
 * @param {Array} floors - The array of floors to which rooms will be added.
 * @param {number} floorId - The ID of the floor to which rooms will be added.
 * @param {number} roomCount - The number of rooms to add.
 * @returns {Array} An updated array of floors.
 */
export const addRoomsToFloor = (
  floors: Floor[],
  floorId: number,
  roomCount: number
) => {
  const floorArray = [...floors];
  const createRoom = (id: number) => ({
    id,
    name: `Room ${id}`,
    size: null,
    floorType: null,
    windows: [],
  });

  const targetFloor = floorArray[floorId - 1];
  if (targetFloor) {
    targetFloor.rooms =
      roomCount > 0
        ? Array.from({ length: roomCount }, (_, roomIndex) =>
            createRoom(targetFloor.rooms.length + roomIndex + 1)
          )
        : [];
  }
  return floorArray;
};

/**
 * Function to update properties of a specific room
 *
 *
 * @param {Array} floors - The array of floors containing the room to be updated.
 * @param {number} roomId - The ID of the room to update.
 * @param {object} updates - An object containing the properties to update.
 * @returns {Array} An updated array of floors.
 */
export const updateRoomProperties = (
  floors: Floor[],
  roomId: number,
  updates: Room
) => {
  const updatedFloors = floors.map((floor) => {
    const updatedRooms = floor.rooms.map((room) => {
      return room.id === roomId ? { ...room, ...updates } : room;
    });

    return { ...floor, rooms: updatedRooms };
  });

  return updatedFloors;
};

export const addWindowsToRoom = (
  floors: Floor[],
  roomId: number,
  numberOfWindows: number
) => {
  const updatedFloors = JSON.parse(JSON.stringify(floors));

  // Find the floor and room with the specified roomId
  const roomToUpdate = updatedFloors
    .flatMap((floor) => floor.rooms)
    .find((room) => room.id === roomId);

  if (roomToUpdate) {
    // Create a function to generate a window object
    const createWindow = (id: number) => ({
      id,
      name: `Window ${id}`,
      type: null,
      customType: null,
      style: null,
      glassType: null,
      selectedRadio: "add-new",
    });
    // Create an array of new windows
    const newWindows = Array.from(
      { length: numberOfWindows },
      (_, windowIndex) =>
        createWindow(roomToUpdate.windows.length + windowIndex + 1)
    );
    roomToUpdate.windows = newWindows;
  }

  return updatedFloors;
};

export const updateWindowProperties = (
  floors: Floor[],
  roomId: number,
  windowId: number,
  updates: Window
) => {
  const updatedFloors = JSON.parse(JSON.stringify(floors));
  const roomToUpdate = updatedFloors
    .flatMap((floor: { rooms: [] }) => floor.rooms)
    .find((room: { id: number }) => room.id === roomId);

  if (roomToUpdate) {
    const windowIndex = roomToUpdate.windows.findIndex(
      (window: { id: number }) => window.id === windowId
    );

    if (windowIndex !== -1) {
      // Replace the old window with the updated window
      roomToUpdate.windows[windowIndex] = {
        ...roomToUpdate.windows[windowIndex],
        ...updates,
      };
    }
  }

  return updatedFloors;
};

export const validateFloors = (floors: Floor[]) => {
  if (!Array.isArray(floors) || floors.length === 0) {
    console.error("Floors array is empty or not an array.");
    return false;
  }

  let isValid = true;

  for (const floor of floors) {
    if (
      !floor.rooms ||
      !Array.isArray(floor.rooms) ||
      floor.rooms.length === 0
    ) {
      console.error(
        "Rooms array is empty or not an array in Floor",
        floor.name
      );
      isValid = false;
    }

    for (const room of floor.rooms) {
      const missingRoomFields = requiredRoomFields.filter(
        (field) => !room[field] && room[field] !== ""
      );

      if (missingRoomFields.length > 0) {
        console.error(
          "Missing required room fields in Room",
          room.name,
          missingRoomFields
        );
        isValid = false;
      }

      if (
        !room.windows ||
        !Array.isArray(room.windows) ||
        room.windows.length === 0
      ) {
        console.error(
          "The 'windows' array is empty or not an array in Room",
          room.name
        );
        isValid = false;
      }

      for (const window of room.windows) {
        const missingWindowFields = requiredWindowFields.filter(
          (field) => !window[field] && window[field] !== ""
        );

        if (missingWindowFields.length > 0) {
          console.error(
            "Missing required window fields in Room",
            room.name,
            missingWindowFields
          );
          isValid = false;
        }
      }
    }
  }

  return isValid;
};

export const hasValues = (obj: Step): boolean => {
  if (obj === undefined || obj === null) {
    return false;
  }

  if (typeof obj === "string") {
    return obj?.trim() !== "";
  }
  if (Array.isArray(obj)) {
    return obj?.length > 0 ? obj.every((item) => hasValues(item)) : false;
  }

  if (typeof obj === "object") {
    return Object.values(obj).every((value) => hasValues(value));
  }

  return false; // Default to false for other cases
};

const validateGarden = (garden) => {
  if (
    !garden ||
    !garden.type ||
    !Array.isArray(garden.plants) ||
    garden.plants.length === 0
  ) {
    console.error("Missing required fields in the garden object.");
    return false;
  }

  return true;
};

export const updateformSteps = (steps: Step[], answers: string | null) => {
  return steps?.map(
    (value: { page: string | number; nextStepIsDisabled: boolean }) => {
      let completed = false;
      if (value.page === "floors") {
        completed = validateFloors(answers?.[value.page]);
      } else if (value.page === "garden") {
        completed = validateGarden(answers?.[value.page]);
      } else {
        completed = hasValues(answers?.[value.page]);
      }
      if (completed) {
        value.nextStepIsDisabled = false;
      }
      return { ...value, completed };
    }
  );
};
