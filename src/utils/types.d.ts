export interface Window {
  id: number;
  name: string | undefined;
  type: string | undefined;
  style: string | undefined;
  glassType: string | undefined;
  selectedRadio: SELECTED_RADIO;
}

export interface Room {
  id: number;
  name: string;
  size: number | undefined;
  floorType: string | null;
  roomType: string | null;
  windows: Window[];
}

export interface Floor {
  id: number;
  name: string;
  rooms: Room[];
}

export interface Garden {
  type: string | null;
  plants: string[];
}

export interface HouseDetailsData {
  foundation: string | undefined;
  size: string | undefined;
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

export interface SelectOptionProps {
  value: string;
  label: string;
}

export type SELECTED_RADIO = "add-new" | "select";

interface QuestionaireContextType {
  steps: Step[];
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  answerData: HouseDetailsData;
  setAnswerData: React.Dispatch<React.SetStateAction<HouseDetailsData>>;
  handleReset: () => void;
  submitForm: () => void;
}
