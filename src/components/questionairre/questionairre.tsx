import React, { useContext } from "react";
// Context
import QuestionaireContext from "../context/questionaireContext";
// Components
import PerfectScrollbar from "react-perfect-scrollbar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// Styles
import "./questionairre.scss";

const Questionairre = () => {
  const { steps, nextStep, prevStep, currentStep } =
    useContext(QuestionaireContext);
  return (
    <>
      <div className="questionaire">
        <PerfectScrollbar>
          {steps.map((step) => (
            <div
              className="questionaire__wrapper"
              key={step.id}
              style={step.id !== currentStep ? { display: "none" } : {}}
            >
              <Card className="questionaire__container">
                <CardContent className="questionaire__content">
                  <step.content currentStepData={step} />
                </CardContent>
              </Card>
              <div className="questionaire__buttons-container">
                {currentStep > 1 && (
                  <Button
                    variant="outlined"
                    disabled={step?.prevStateIsDisabled}
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                )}
                {steps.length !== currentStep ? (
                  <Button
                    variant="outlined"
                    onClick={nextStep}
                    disabled={step?.nextStepIsDisabled}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    disabled={step?.nextStepIsDisabled}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          ))}
        </PerfectScrollbar>
      </div>
    </>
  );
};

export default Questionairre;
