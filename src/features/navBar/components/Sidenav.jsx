import { styled } from "@mui/system";
import VerticalNav from "./VerticalNav";
import useSettings from "../../../hooks/useSettings";
import { navigations } from "../util/navigations";

const SideNavMobile = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100vw",
  background: "rgba(0, 0, 0, 0.54)",
  zIndex: -1,
  [theme.breakpoints.up("lg")]: { display: "none" },
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();

  //Navbar is controlled by the settings in React Context API
  //This function updates the settings
  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  return (
    <div style={{ height: "100vh", overflow: "scroll" }}>
      <>
        {children}
        <VerticalNav items={navigations} />
      </>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </div>
  );
};

export default Sidenav;
