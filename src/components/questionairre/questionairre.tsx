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
  const { answerData, nextStep, prevStep, steps, currentStep } =
    useContext(QuestionaireContext);

  console.log(answerData);

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
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    style={{
                      display: index === currentStep ? "block" : "none",
                    }}
                  >
                    {step.content}
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="questionaire__buttons-container">
              {currentStep > 0 && (
                <Button variant="outlined" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {steps.length !== currentStep + 1 ? (
                <Button variant="outlined" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button variant="outlined">Submit</Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Questionairre;

// type Step = {
//     id: number;
//     content: ReactNode;
//   };
//   const [currentStep, setCurrentStep] = useState<number>(0);

//   const steps: Step[] = [
//     {
//       id: 1,
//       content: <Foundation />,
//     },
//     {
//       id: 2,
//       content: <HouseSize />,
//     },
//     {
//       id: 3,
//       content: <NumberOfFloors />,
//     },
//     {
//       id: 4,
//       content: <FloorSpecifics />,
//     },
//   ];

//   const nextStep = () => {
//     setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
//   };

//   const prevStep = () => {
//     setCurrentStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
//   };
