import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// import './App.css';
import Routes from "./components/Routes";
import themes from "./themes";
import ConfirmDialog from "./utils/ui-components/pop-ups/ConfirmDialog";
import ErrorDialog from "./utils/ui-components/pop-ups/ErrorDialog";
import SuccessDialog from "./utils/ui-components/pop-ups/SuccessDialog";
import { useSelector } from "react-redux";
import { StyledEngineProvider } from "@mui/material";
// import {injectStore} from "./assets/api/interceptor";
import CustomConfirmDialog from "./utils/ui-components/pop-ups/CustomConfirmDialog";
import CustomizedSnackbar from "./utils/ui-components/CustomSnackBar";
import { injectStore } from "./assets/api/interceptor";

function App({ store }: any) {
  injectStore(store);
  const customization = useSelector((state: any) => state.customization);

  console.log(customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <Routes />
        <ConfirmDialog />
        <CustomConfirmDialog />
        <SuccessDialog />
        <ErrorDialog />
        <CustomizedSnackbar />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
