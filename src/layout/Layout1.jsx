import { ThemeProvider, useMediaQuery } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import useSettings from "../hooks/useSettings";
import { sidenavCompactWidth, sideNavWidth } from "../constants/constant";
import React, { useEffect, useRef } from "react";
import SidenavTheme from "../Theme/SidenavTheme/SidenavTheme";
import NavSideBar from "../features/navBar/view/NavSideBar";
import NavTopbar from "../features/navBar/view/NavTopbar";

const Layout1Root = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.background.default,
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  overflowY: "auto",
  overflowX: "hidden",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const LayoutContainer = styled(Box)(({ width }) => ({
  height: "100vh",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  verticalAlign: "top",
  marginLeft: width,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  marginRight: 0,
}));

// the main layout for the app

const Layout1 = (props) => {
  const { settings, updateSettings } = useSettings();
  const { layout1Settings } = settings;
  const topbarTheme = settings.themes[layout1Settings.topbar.theme];
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav },
  } = layout1Settings;

  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case "full":
        return sideNavWidth;

      case "compact":
        return sidenavCompactWidth;

      default:
        return "0px";
    }
  };

  const sidenavWidth = getSidenavWidth();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const ref = useRef({ isMdScreen, settings });
  const layoutClasses = `theme-${theme.palette.type}`;

  useEffect(() => {
    let { settings } = ref.current;
    let sidebarMode = settings.layout1Settings.leftSidebar.mode;
    if (settings.layout1Settings.leftSidebar.show) {
      let mode = isMdScreen ? "close" : sidebarMode;
      updateSettings({ layout1Settings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  return (
    <Layout1Root className={layoutClasses}>
      {showSidenav && sidenavMode !== "close" && (
        <SidenavTheme>
          <NavSideBar />
        </SidenavTheme>
      )}

      <LayoutContainer width={sidenavWidth}>
        {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <NavTopbar fixed={true} className="elevation-z8" />
          </ThemeProvider>
        )}

        <ContentBox>
          {layout1Settings.topbar.show && !layout1Settings.topbar.fixed && (
            <ThemeProvider theme={topbarTheme}>
              <NavTopbar />
            </ThemeProvider>
          )}

          <Box flexGrow={1} position="relative">
            {props.children}
          </Box>
       
        </ContentBox>
      </LayoutContainer>
    </Layout1Root>
  );
};

export default React.memo(Layout1);
