import React, { useState, useEffect } from "react";
import QuestionaireContext from "./questionaireContext";
// Components
import Foundation from "./../questionairre/foundation";
import HouseSize from "./../questionairre/houseSize";
import Floors from "./../questionairre/floors/floors";
import RoofType from "./../questionairre/roofType";
import Garden from "./../questionairre/Garden";
// Types
import { Step, HouseDetailsData } from "../../utils/types";
// Constants
import { houseDetailsData } from "../../utils/constants.ts";
// Helpers
import { updateformSteps } from "../../utils/helpers.ts";

const defaultSteps: Step[] = [
  {
    id: 1,
    page: "foundation",
    content: Foundation,
    completed: false,
    nextStepIsDisabled: true,
    prevStateIsDisabled: false,
  },
  {
    id: 2,
    page: "size",
    content: HouseSize,
    completed: false,
    nextStepIsDisabled: true,
    prevStateIsDisabled: false,
  },
  {
    id: 3,
    page: "floors",
    content: Floors,
    completed: false,
    nextStepIsDisabled: true,
    prevStateIsDisabled: false,
  },
  {
    id: 4,
    page: "roofType",
    content: RoofType,
    completed: false,
    nextStepIsDisabled: true,
    prevStateIsDisabled: false,
  },
  {
    id: 5,
    page: "garden",
    content: Garden,
    completed: false,
    nextStepIsDisabled: true,
    prevStateIsDisabled: false,
  },
];

const getDataFromStorage = () => {
  const stringData = localStorage.getItem("answerData");
  const storedAnswerData =
    stringData !== null ? JSON.parse(stringData) : houseDetailsData;
  return storedAnswerData;
};

const getFirstIncompleteStepId = (steps: Step[]): number | null => {
  const firstIncompleteStep = steps.find((step) => step.completed === false);
  console.log(firstIncompleteStep.id, firstIncompleteStep.id - 1);
  return firstIncompleteStep ? firstIncompleteStep.id : 1;
};

const QuestionaireProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultAnswerData = getDataFromStorage();
  const updatedSteps = updateformSteps(defaultSteps, defaultAnswerData);

  const [answerData, setAnswerData] =
    useState<HouseDetailsData>(defaultAnswerData);
  const [formSteps, setFormSteps] = useState<Step[]>(updatedSteps);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    localStorage.removeItem("answerData");
    window.location.href = "/";
  };

  // Update local storage on every update of answerData
  useEffect(() => {
    const updatedAnswers = JSON.stringify(answerData);
    const storedAnswerData = localStorage.getItem("answerData");
    if (storedAnswerData !== updatedAnswers) {
      localStorage.setItem("answerData", updatedAnswers);
      const mappedValues = updateformSteps(formSteps, answerData);
      setFormSteps(mappedValues);
      getFirstIncompleteStepId(mappedValues);
    }
  }, [answerData, formSteps]);

  // Set the first unanswered step to start off where user left off
  useEffect(() => {
    const defaultAnswerData = getDataFromStorage();
    const updatedSteps = updateformSteps(defaultSteps, defaultAnswerData);
    const newStep = getFirstIncompleteStepId(updatedSteps);
    setCurrentStep(newStep);
  }, []);

  return (
    <QuestionaireContext.Provider
      value={{
        answerData,
        setAnswerData,
        currentStep,
        nextStep,
        prevStep,
        steps: formSteps,
        handleReset,
      }}
    >
      {children}
    </QuestionaireContext.Provider>
  );
};

export default QuestionaireProvider;
