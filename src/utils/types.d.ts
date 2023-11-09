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
  windows: Window[];
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
  size: string | null;
  floors: Floor[];
  roofType: string | null;
  garden: Garden;
}

type Pages = "foundation" | "size" | "floors" | "roofType" | "garden";

export type Step = {
  id: number;
  page: Pages;
  content: React.ComponentType<unknown>;
  completed: boolean;
  nextStepIsDisabled: boolean;
  prevStateIsDisabled: boolean;
};

interface QuestionaireContextType {
  steps: Step[];
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  answerData: HouseDetailsData;
  setAnswerData: React.Dispatch<React.SetStateAction<unknown>>;
  handleReset: () => void;
  submitForm: () => void;
}
