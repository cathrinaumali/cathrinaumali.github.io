/**
 * Function to create an array of floors with rooms
 *
 *
 * @param {number} numFloors - The number of floors to create.
 * @returns {Array} An array of floors with rooms.
 */
export const addFloorsWithRooms = (numFloors) => {
  const createFloor = (id) => ({
    id,
    name: `Floor ${id}`,
    count: null,
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
export const addRoomsToFloor = (floors, floorId, roomCount) => {
  const floorArray = [...floors];
  const createRoom = (id) => ({
    id,
    name: `Room ${id}`,
    size: null,
    floorType: null,
    windows: [
      //   {
      //     name: null,
      //     type: null,
      //     customType: null,
      //     style: null,
      //     glassType: null,
      //   },
    ],
  });

  const targetFloor = floorArray[floorId - 1];
  if (targetFloor && roomCount > 0) {
    targetFloor.rooms = Array.from({ length: roomCount }, (_, roomIndex) =>
      createRoom(targetFloor.rooms.length + roomIndex + 1)
    );
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
export const updateRoomProperties = (floors, roomId, updates) => {
  const updatedFloors = floors.map((floor) => {
    const updatedRooms = floor.rooms.map((room) => {
      return room.id === roomId ? { ...room, ...updates } : room;
    });

    return { ...floor, rooms: updatedRooms };
  });

  return updatedFloors;
};

export const addWindowsToRoom = (floors, roomId, numberOfWindows) => {
  const updatedFloors = JSON.parse(JSON.stringify(floors));

  // Find the floor and room with the specified roomId
  const roomToUpdate = updatedFloors
    .flatMap((floor) => floor.rooms)
    .find((room) => room.id === roomId);

  if (roomToUpdate) {
    // Create a function to generate a window object
    const createWindow = (id) => ({
      id,
      name: `Window ${id}`,
      type: null,
      customType: null,
      style: null,
      glassType: null,
    });

    // Create an array of new windows
    const newWindows = Array.from(
      { length: numberOfWindows },
      (_, windowIndex) =>
        createWindow(roomToUpdate.windows.length + windowIndex + 1)
    );

    roomToUpdate.windows.push(...newWindows);
  }

  return updatedFloors;
};
