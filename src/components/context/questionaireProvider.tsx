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
  completed: boolean;
  nextStepIsDisabled: boolean;
  prevStateIsDisabled: boolean;
};

const defaultSteps: Step[] = [
  {
    id: 1,
    page: "foundation",
    content: Foundation,
    completed: false,
    nextStepIsDisabled: false,
    prevStateIsDisabled: false,
  },
  {
    id: 2,
    page: "size",
    content: HouseSize,
    completed: false,
    nextStepIsDisabled: false,
    prevStateIsDisabled: false,
  },
  {
    id: 3,
    page: "floors",
    content: Floors,
    completed: false,
    nextStepIsDisabled: false,
    prevStateIsDisabled: false,
  },
  {
    id: 4,
    page: "floorSpecs",
    content: FloorSpecifics,
    completed: false,
    nextStepIsDisabled: false,
    prevStateIsDisabled: false,
  },
  {
    id: 5,
    page: "roofType",
    content: RoofType,
    completed: false,
    nextStepIsDisabled: false,
    prevStateIsDisabled: false,
  },
  {
    id: 6,
    page: "garden",
    content: Garden,
    completed: false,
    nextStepIsDisabled: false,
    prevStateIsDisabled: false,
  },
];

const QuestionaireProvider = ({ children }) => {
  const storedAnswerData = JSON.parse(localStorage.getItem("answerData"));

  const [answerData, setAnswerData] = useState(
    storedAnswerData || houseDetailsData
  );
  const [formSteps, setFormSteps] = useState<Step[]>(defaultSteps);
  console.log(formSteps);
  const [currentStepData, setCurrentStepData] = useState<Step>(defaultSteps[0]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const stringifiedAnswerData = JSON.stringify(answerData);
  const findCurrentPage = (steps, id) => steps?.filter((step) => step.id == id);

  const hasValues = useCallback((obj: Step): boolean => {
    if (obj === undefined || obj === null) {
      return false;
    }

    if (typeof obj === "string") {
      return obj.trim() !== "";
    }

    if (Array.isArray(obj)) {
      return obj.every((item) => hasValues(item));
    }

    if (typeof obj === "object") {
      return Object.values(obj).every((value) => hasValues(value));
    }

    return false; // Default to false for other cases
  }, []);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const updateSteps = (prevSteps, updatedAnswerData) => {
    return prevSteps.map((step, index, steps) => {
      let isCompleted = false;
      if (step.page === "floors") {
        isCompleted = updatedAnswerData[step.page]?.length > 0;
      } else {
        isCompleted = updatedAnswerData
          ? hasValues(updatedAnswerData[step.page])
          : false;
      }

      const nextStepIsDisabled = index < steps.length - 1 && isCompleted;

      return {
        ...step,
        completed: isCompleted,
        nextStepIsDisabled,
      };
    });
  };

  useEffect(() => {
    const answerDataString = JSON.stringify(answerData);
    const storedAnswerData = localStorage.getItem("answerData");
    if (storedAnswerData !== answerDataString) {
      localStorage.setItem("answerData", answerDataString);
    }
  }, [answerData, storedAnswerData]);

  //** Set completed state based on values from localStorage */
  //   useEffect(() => {
  //     const storedAnswerData = JSON.parse(localStorage.getItem("answerData"));
  //     const newSteps = updateSteps(defaultSteps, storedAnswerData);
  //     const firstIncompleteStep = newSteps.find((step) => !step.completed);
  //     if (firstIncompleteStep) {
  //       setCurrentStep(firstIncompleteStep.id);
  //     } else {
  //       // Handle the case when all steps are completed
  //     }

  //     setFormSteps(newSteps);
  //   }, []);

  /** Get the form data of current step */
  //   useEffect(() => {
  //     const stepData = findCurrentPage(formSteps, currentStep);
  //     setCurrentStepData(stepData);
  //   }, [currentStep, formSteps]);

  //   const checkCompleted = (step, answerData) => {
  //     let completed = false;

  //     switch (step.page) {
  //       case "floors":
  //         completed = answerData[step.page]?.length > 0;
  //         break;

  //       case "floorSpecs":
  //         break;

  //       default:
  //         completed = answerData ? hasValues(answerData[step.page]) : false;
  //     }

  //     return completed;
  //   };

  //   useEffect(() => {
  //     const storedAnswerData = localStorage.getItem("answerData");
  //     if (storedAnswerData !== stringifiedAnswerData) {
  //       const filtered = formSteps?.filter((step) => step.id === currentStep);
  //       const updatedCurrentStep = filtered?.map((step) => {
  //         if (step.id === currentStep) {
  //           // const completed = hasValues(answerData[step.page]);
  //           let completed = false;
  //           if (step.page === "floors") {
  //             //   console.log(step.page, answerData[step.page]);
  //             completed = answerData[step.page]?.length > 0;
  //           } else {
  //             completed = answerData ? hasValues(answerData[step.page]) : false;
  //           }
  //           return {
  //             ...step,
  //             completed,
  //             nextStepIsDisabled: !completed,
  //           };
  //         }
  //         return step;
  //       });
  //       setCurrentStepData(updatedCurrentStep);
  //     }
  //   }, [answerData, currentStep, formSteps, hasValues, stringifiedAnswerData]);

  return (
    <QuestionaireContext.Provider
      value={{
        answerData,
        setAnswerData,
        currentStep,
        nextStep,
        prevStep,
        steps: formSteps,
        currentStepData,
      }}
    >
      {children}
    </QuestionaireContext.Provider>
  );
};

export default QuestionaireProvider;
