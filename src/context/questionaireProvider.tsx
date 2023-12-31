import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import QuestionaireContext from "./questionaireContext.tsx";
// Components
import Foundation from "../components/questionairre/foundation.tsx";
import HouseSize from "../components/questionairre/houseSize.tsx";
import Floors from "../components/questionairre/floors";
import RoofType from "../components/questionairre/roofType.tsx";
import Garden from "../components/questionairre/garden.tsx";
// Types
import { Step, HouseDetailsData } from "../utils/types";
// Constants
import { houseDetailsData } from "../utils/constants.ts";
// Helpers
import { updateformSteps } from "../utils/helpers.ts";

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

const getFirstIncompleteStepId = (steps: Step[]): number => {
  const firstIncompleteStep = steps.find((step) => step.completed === false);
  return firstIncompleteStep ? firstIncompleteStep.id : 1;
};

const QuestionaireProvider = ({ children }: { children: React.ReactNode }) => {
  const initialLoad = useRef(true);
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
    localStorage.removeItem("allAnswersCompleted");
    window.location.href = "/";
  };

  const submitForm = () => {
    const allCompleted = formSteps.every((item) => item.completed);
    localStorage.setItem("allAnswersCompleted", JSON.stringify(allCompleted));
    window.location.href = "/";
  };

  // Update local storage on every update of answerData
  useEffect(() => {
    const storedAnswerData = localStorage.getItem("answerData");
    const updatedAnswers = JSON.stringify(answerData);
    if (storedAnswerData !== updatedAnswers) {
      localStorage.setItem("answerData", updatedAnswers);
      const mappedValues = updateformSteps(formSteps, answerData);
      setFormSteps(mappedValues);
    }
  }, [setAnswerData, answerData, formSteps]);

  // Set the first unanswered step to start off where user left off
  useLayoutEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false; // Set to false after initial load
      const allCompleted = formSteps?.every((step) => step.completed);
      if (allCompleted) {
        setCurrentStep(formSteps?.length);
      } else {
        const defaultAnswerData = getDataFromStorage();
        const updatedSteps = updateformSteps(defaultSteps, defaultAnswerData);
        const newStep = getFirstIncompleteStepId(updatedSteps);
        setCurrentStep(newStep);
      }
    }
  }, [formSteps]);

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
        submitForm,
      }}
    >
      {children}
    </QuestionaireContext.Provider>
  );
};

export default QuestionaireProvider;
