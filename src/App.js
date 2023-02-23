import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import "./style/global.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import AllRoutes from "./routing/AllRoutes";
import routes from "./routing/routes";
import AuthProvider from "./context/AuthProvider";
import { SettingsProvider } from "./context/SettingsContext";
import ToastContainer from "./features/toast/ToastContainer";
import { mainTheme } from "./Theme/MainTheme";

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <SettingsProvider>
            <AuthProvider>
              <AllRoutes routes={routes} />
              <ToastContainer />
            </AuthProvider>
          </SettingsProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
