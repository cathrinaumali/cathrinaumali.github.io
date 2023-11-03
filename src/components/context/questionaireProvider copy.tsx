import React, { useState, useEffect, useMemo, useCallback } from "react";
import QuestionaireContext from "./questionaireContext";

import Foundation from "./../questionairre/foundation";
import HouseSize from "./../questionairre/houseSize";
import Floors from "./../questionairre/floors/floors";
import FloorSpecifics from "./../questionairre/floors/floorSpecifics";
import RoofType from "./../questionairre/roofType";
import Garden from "./../questionairre/Garden";
import jsonFilePath from "../../utils/plants.json";

import { houseDetailsData } from "../../utils/constants.ts";

type Step = {
  id: number;
  page: "foundation" | "size" | "floors" | "floorSpecs" | "roofType" | "garden";
  content: any;
  completed: booelan;
  nextStepEnabled: booelan;
  prevStateEnabled: booelan;
};

// console.log(jsonFilePath);

const defaultSteps: Step[] = [
  {
    id: 1,
    page: "foundation",
    content: Foundation,
    completed: false,
    nextStepEnabled: false,
    prevStateEnabled: false,
  },
  {
    id: 2,
    page: "size",
    content: HouseSize,
    completed: false,
    nextStepEnabled: false,
    prevStateEnabled: false,
  },
  {
    id: 3,
    page: "floors",
    content: Floors,
    completed: false,
    nextStepEnabled: false,
    prevStateEnabled: false,
  },
  {
    id: 4,
    page: "floorSpecs",
    content: FloorSpecifics,
    completed: false,
    nextStepEnabled: false,
    prevStateEnabled: false,
  },
  {
    id: 5,
    page: "roofType",
    content: RoofType,
    completed: false,
    nextStepEnabled: false,
    prevStateEnabled: false,
  },
  {
    id: 6,
    page: "garden",
    content: Garden,
    completed: false,
    nextStepEnabled: false,
    prevStateEnabled: false,
  },
];

const QuestionaireProvider = ({ children }) => {
  const storedAnswerData = JSON.parse(localStorage.getItem("answerData"));

  const [answerData, setAnswerData] = useState(
    storedAnswerData || houseDetailsData
  );
  const [formSteps, setFormSteps] = useState<Step[]>(defaultSteps);
  const [currentStepData, setCurrentStepData] = useState<Step>(defaultSteps[0]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isDisabledNext, setIsDisabledNext] = useState<number>(true);

  const stringifiedAnswerData = JSON.stringify(answerData);

  const hasValues = useCallback((obj: Step): boolean => {
    if (obj === undefined || obj === null) {
      return false;
    }

    if (typeof obj === "string") {
      return obj.trim() !== "";
    }

    if (Array.isArray(obj)) {
      return obj.some((item) => hasValues(item));
    }

    if (typeof obj === "object") {
      return Object.values(obj).some((value) => hasValues(value));
    }

    return true; // Default to true for other cases
  }, []);

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % formSteps.length);
  };

  const prevStep = () => {
    setCurrentStep(
      (prevStep) => (prevStep - 1 + formSteps.length) % formSteps.length
    );
  };

  const updateSteps = (prevSteps, updatedAnswerData) => {
    return prevSteps.map((step, index, steps) => {
      const isCompleted = updatedAnswerData
        ? hasValues(updatedAnswerData[step.page])
        : false;
      const nextStepEnabled = index < steps.length - 1 && isCompleted;
      const prevStateEnabled = index > 0 && steps[index - 1].completed;

      return {
        ...step,
        completed: isCompleted,
        nextStepEnabled,
        prevStateEnabled,
      };
    });
  };

  useEffect(() => {
    const answerDataString = JSON.stringify(answerData);
    const storedAnswerData = localStorage.getItem("answerData");
    // console.log(answerData, JSON.parse(localStorage.getItem("answerData")));
    if (storedAnswerData !== answerDataString) {
      localStorage.setItem("answerData", answerDataString);
    }
  }, [answerData, storedAnswerData]);

  //** Set completed state based on values from localStorage */
  useEffect(() => {
    const storedAnswerData = JSON.parse(localStorage.getItem("answerData"));
    const updatedSteps = updateSteps(defaultSteps, storedAnswerData);
    // defaultSteps.map((step, index, steps) => {
    //   const isCompleted = storedAnswerData
    //     ? hasValues(storedAnswerData[step.page])
    //     : false;
    //   const nextStepEnabled = index < steps.length - 1 && isCompleted;
    //   const prevStateEnabled = index > 0 && steps[index - 1].completed;

    //   return {
    //     ...step,
    //     completed: isCompleted,
    //     nextStepEnabled,
    //     prevStateEnabled,
    //   };
    // });
    // Find the first incomplete step after updating
    const firstIncompleteStep = updatedSteps.find((step) => !step.completed);

    // Set the current step to the id of the first incomplete step
    if (firstIncompleteStep) {
      setCurrentStep(firstIncompleteStep.id);
    } else {
      // Handle the case when all steps are completed
    }

    setFormSteps(updatedSteps);
  }, [hasValues]);
  const findCurrentPage = (steps, id) => steps?.filter((step) => step.id == id);

  useEffect(() => {
    // const storedAnswerData = JSON.parse(localStorage.getItem("answerData"));
    // const updatedSteps = updateSteps(defaultSteps, storedAnswerData);
    // console.log(answerData);
    // console.log(currentStep);
    // console.log(formSteps);
    const stepData = findCurrentPage(formSteps, currentStep);
    setCurrentStepData(stepData);

    // const updated = formSteps.map((step) => {
    //   if (step.id === currentStep) {
    //     step.completed = true;
    //   }
    //   return step;
    // });
    // setFormSteps(updated);
  }, [currentStep, formSteps]);

  useEffect(() => {
    console.log(stringifiedAnswerData);
    console.log(currentStep);
  }, [stringifiedAnswerData]);

  return (
    <QuestionaireContext.Provider
      value={{
        answerData,
        setAnswerData,
        currentStep,
        nextStep,
        prevStep,
        steps: formSteps,
        isDisabledNext,
        currentStepData,
      }}
    >
      {children}
    </QuestionaireContext.Provider>
  );
};

export default QuestionaireProvider;
