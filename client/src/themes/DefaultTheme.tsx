import { createTheme } from "@mui/material";
import { TypographyStyleOptions } from "@mui/material/styles/createTypography";

const headerStyleOptions: TypographyStyleOptions = {
  fontFamily: "Barlow Condensed, Arial",
  fontWeight: "bold",
};

const DefaultTheme = createTheme({
  palette: {
    background: {
      default: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial",
    h1: headerStyleOptions,
    h2: headerStyleOptions,
    h3: headerStyleOptions,
    h4: headerStyleOptions,
    h5: headerStyleOptions,
    h6: headerStyleOptions,
    button: {
      fontFamily: "Barlow Condensed, Arial",
    },
  },
});

export default DefaultTheme;
