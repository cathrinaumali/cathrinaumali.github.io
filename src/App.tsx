import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Questionairre from "./components/questionairre/questionairre";
import QuestionaireProvider from "./context/questionaireProvider";

function App() {
  return (
    <React.Fragment>
      <QuestionaireProvider>
        <CssBaseline />
        <Questionairre />
      </QuestionaireProvider>
    </React.Fragment>
  );
}

export default App;
