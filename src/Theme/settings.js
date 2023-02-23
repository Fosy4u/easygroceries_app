import { themes } from "../Theme/initThemes";
import layout1Settings from "../layout/Layout1Settings";


export const LayoutSettings = {
  activeLayout: 'layout1', // layout1, layout2
  activeTheme: 'blue', // View all valid theme colors inside MatxTheme/themeColors.js
  themes: themes,
  layout1Settings, // open Layout1/Layout1Settings.js
    // Footer options
    footer: {
      show: false,
      fixed: false,
      theme: 'slateDark1', // View all valid theme colors inside MatxTheme/themeColors.js
    },

};
