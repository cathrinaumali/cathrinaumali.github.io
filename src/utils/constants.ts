interface Window {
  name: string | null;
  style: string | null;
  glassType: string | null;
}

interface Room {
  id: number;
  name: string;
  size: number | null;
  floorType: string | null;
  roomType: string | null;
  windows: Window[] | null;
}

interface Floor {
  id: number;
  name: string;
  count: number | null;
  rooms: Room[];
}

interface Garden {
  type: string | null;
  plants: string[] | null;
}

interface HouseDetailsData {
  foundation: string | null;
  size: {
    width: number | null;
    length: number | null;
  };
  floors: Floor[];
  roofType: string | null;
  garden: Garden;
}

export const houseDetailsData: HouseDetailsData = {
  foundation: null,
  size: {
    width: null,
    length: null,
  },
  floors: [],
  roofType: null,
  garden: {
    type: null,
    plants: null,
  },
};
