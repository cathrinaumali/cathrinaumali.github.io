import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Questionairre from "./components/questionairre";
import QuestionaireProvider from "./context/questionaireProvider";

function App() {
  return (
    <React.Fragment>
      <QuestionaireProvider>
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
        <Questionairre />
      </QuestionaireProvider>
    </React.Fragment>
  );
}

export default App;
