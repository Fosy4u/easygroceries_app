import { createTheme } from "@mui/material";
import { forEach, merge } from "lodash";
import { themeColors } from "./themeColors";
import { red } from "@mui/material/colors";

const themeOptions = {
  typography: {
    fontSize: 14,
    body1: { fontSize: "14px" },
  },

  status: { danger: red[500] },
};

function createMatxThemes() {
  let themes = {};

  forEach(themeColors, (value, key) => {
    themes[key] = createTheme(merge({}, themeOptions, value));
  });

  return themes;
}
export const themes = createMatxThemes();
