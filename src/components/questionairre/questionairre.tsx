import React, { useContext } from "react";
// Context
import QuestionaireContext from "../context/questionaireContext";
// Components
import PerfectScrollbar from "react-perfect-scrollbar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// Styles
import "./questionairre.scss";

export default function Questionairre() {
  const { steps, nextStep, prevStep, currentStep } =
    useContext(QuestionaireContext);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <b>PERFORMATIVE BUILDERS</b>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <div className="questionaire">
            <PerfectScrollbar className="questionaire__scroll-container">
              {steps.map((step) => (
                <div
                  key={step.id}
                  style={step.id !== currentStep ? { display: "none" } : {}}
                >
                  <step.content currentStepData={step} />

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
        </Paper>
      </Container>
    </React.Fragment>
  );
}
