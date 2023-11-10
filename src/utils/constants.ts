import { HouseDetailsData } from "./types";

export const houseDetailsData: HouseDetailsData = {
  foundation: undefined,
  size: undefined,
  floors: [],
  roofType: null,
  garden: {
    type: null,
    plants: [],
  },
};

export const windowTypes = [
  { value: "casement", label: "Casement" },
  { value: "double-hung", label: "Double-Hung" },
  { value: "awning", label: "Awning" },
  { value: "sliding", label: "Sliding" },
  { value: "bay", label: "Bay" },
  { value: "bow", label: "Bow" },
  { value: "picture", label: "Picture" },
  { value: "skylight", label: "Skylight" },
  { value: "frosted", label: "Frosted" },
  { value: "stained-glass", label: "Stained Glass" },
];

export const windowStyles = [
  { value: "bay", label: "Bay" },
  { value: "flat", label: "Flat" },
  { value: "full-height", label: "Full Height" },
];

export const glassTypes = [
  { value: "tempered", label: "Tempered" },
  { value: "triple-glazed", label: "Triple Glazed" },
  { value: "double-glazed", label: "Double Glazed" },
];

export const roomTypes = [
  { value: "bedroom", label: "Bedroom" },
  { value: "lounge", label: "Lounge" },
  { value: "diner", label: "Diner" },
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "office", label: "Office" },
];

export const floorTypes = [
  { value: "wood", label: "Wood" },
  { value: "carpet", label: "Carpet" },
];

export const foundationOptions = [
  { value: "brick", label: "Brick" },
  { value: "slab", label: "Slab" },
  { value: "reinforced-concrete", label: "Reinforced concrete" },
];

export const gardenTypes = [
  { value: "vegetable", label: "Vegetable Garden" },
  { value: "flower", label: "Flower Garden" },
  { value: "rose", label: "Rose Garden" },
  { value: "herb", label: "Herb Garden" },
  { value: "japanese", label: "Japanese Garden" },
  { value: "water", label: "Water Garden" },
  { value: "rock", label: "Rock Garden (Alpine Garden)" },
  { value: "xeriscape", label: "Xeriscape Garden" },
  { value: "wildflower", label: "Wildflower Garden" },
  { value: "cottage", label: "Cottage Garden" },
  { value: "formal", label: "Formal Garden" },
  { value: "sensory", label: "Sensory Garden" },
  { value: "butterfly", label: "Butterfly Garden" },
];

export const requiredRoomFields = ["floorType", "roomType", "size", "windows"];
export const requiredWindowFields = ["type", "style", "glassType"];

// const sampleOutput = {
//   foundation: "brick",
//   size: 120,
//   floors: [
//     {
//       id: 1,
//       name: "Floor 1",
//       count: null,
//       rooms: [
//         {
//           id: 1,
//           name: "Room 1",
//           size: "24",
//           floorType: "wood",
//           count: null,
//           roomType: "lounge",
//           windows: [
//             {
//               id: 3,
//               name: "Window 3",
//               type: null,
//               customType: null,
//               style: null,
//               glassType: null,
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "Floor 2",
//       count: null,
//       rooms: [
//         {
//           id: 1,
//           name: "Room 1",
//           size: "24",
//           floorType: "wood",
//           roomType: "lounge",
//           windows: [],
//         },
//       ],
//     },
//   ],
//   roofType: null,
//   garden: {
//     type: null,
//     plants: null,
//   },
// };
