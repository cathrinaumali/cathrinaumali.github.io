import React, { useState, useEffect } from "react";
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
  content: ReactNode;
};

console.log(jsonFilePath);

const QuestionaireProvider = ({ children }) => {
  const [answerData, setAnswerData] = useState(houseDetailsData);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps: Step[] = [
    {
      id: 1,
      content: <Foundation />,
    },
    {
      id: 2,
      content: <HouseSize />,
    },
    {
      id: 3,
      content: <Floors />,
    },
    {
      id: 4,
      content: <FloorSpecifics />,
    },
    {
      id: 5,
      content: <RoofType />,
    },
    {
      id: 6,
      content: <Garden />,
    },
  ];

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
  };

  return (
    <QuestionaireContext.Provider
      value={{
        answerData,
        setAnswerData,
        currentStep,
        // setCurrentStep,
        nextStep,
        prevStep,
        steps,
      }}
    >
      {children}
    </QuestionaireContext.Provider>
  );
};

export default QuestionaireProvider;
