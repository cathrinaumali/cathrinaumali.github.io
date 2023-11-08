import React, { useContext } from "react";
import QuestionaireContext from "../context/questionaireContext";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import "./questionairre.scss";

interface QuestionairreProps {}

const Questionairre: React.FC<QuestionairreProps> = () => {
  const {
    answerData,
    currentStepData,
    nextStep,
    prevStep,
    steps,
    currentStep,
  } = useContext(QuestionaireContext);
  //   console.log(currentStep, currentStepData);
  //   console.log(currentStep, steps?.[currentStep]?.id);
  //   console.log(steps.filter((step) => !step.completed));
  //   console.log(currentStep, answerData[steps?.[currentStep]?.page]);

  const currentStepObj = currentStepData?.[0] || {};

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="questionaire">
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid xs sm={8} smOffset={2}>
            <Card
              sx={{ minWidth: 275, minHeight: 600 }}
              className="questionaire__container"
            >
              <CardContent className="questionaire__content">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    style={{
                      //   display: index + 1 === currentStep ? "block" : "none",
                      display: step.id === currentStep ? "block" : "none",
                    }}
                  >
                    <step.content currentStepData={step} />
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="questionaire__buttons-container">
              {currentStep > 1 && (
                <Button
                  variant="outlined"
                  disabled={currentStepObj?.prevStateIsDisabled}
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )}
              {steps.length !== currentStep ? (
                <Button
                  variant="outlined"
                  onClick={nextStep}
                  disabled={currentStepObj?.nextStepIsDisabled}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  disabled={currentStepObj?.nextStepIsDisabled}
                >
                  Submit
                </Button>
              )}
            </div>
          </Grid>
          <Grid xs sm={8} smOffset={2}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Questionairre;
