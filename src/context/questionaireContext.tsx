import { createContext } from "react";
// Types
import { QuestionaireContextType } from "../utils/types";
// Constants
import { houseDetailsData } from "../utils/constants.ts";

const defaultData = {
  answerData: houseDetailsData,
  setAnswerData: () => {},
  currentStep: 1,
  nextStep: () => {},
  prevStep: () => {},
  steps: [],
  handleReset: () => {},
  submitForm: () => {},
};

const QuestionaireContext = createContext<QuestionaireContextType>(defaultData);

export default QuestionaireContext;
