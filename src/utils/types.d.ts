export interface Window {
  name: string | null;
  type: string | null;
  customType: string | null;
  style: string | null;
  glassType: string | null;
}

export interface Room {
  id: number;
  name: string;
  size: number | null;
  floorType: string | null;
  roomType: string | null;
  windows: Window[] | null;
}

export interface Floor {
  id: number;
  name: string;
  count: number | null;
  rooms: Room[];
}

export interface Garden {
  type: string | null;
  plants: string[] | null;
}

export interface HouseDetailsData {
  foundation: string | null;
  size: {
    width: number | null;
    length: number | null;
  };
  floors: Floor[];
  roofType: string | null;
  garden: Garden;
}
