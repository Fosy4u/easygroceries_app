import {
  Avatar,
  Badge,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { HamburgerSpin } from "react-animated-burgers";
import Logo from "../../../images/brand1.png";
import useSettings from "../../../hooks/useSettings";
import { topBarHeight } from "../../../constants/constant";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useDispatch, useSelector } from "react-redux";
import { globalActions, globalSelectors } from "../../../global/global.slice";
import { Span } from "../../../utils/components/Typography";
import { themeShadows } from "../../../Theme/themeColors";
import RoyaltyMembership from "../../products/components/RoyaltyMembership";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: "all 0.3s ease",
  boxShadow: themeShadows[0],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 24,
  padding: 4,
  "& span": { margin: "0 8px" },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const NavTopbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const cart = useSelector(globalSelectors.selectCart);
  const quantity = cart.reduce((acc, item) => acc + Number(item?.quantity), 0);
  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  // handle logout actions
  // clear local storage
  // clear redux store
  // Would be to store these data on database on logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    dispatch(globalActions.setCurrentUser({}));
    dispatch(globalActions.setCart([]));
    dispatch(globalActions.setOrder([]));
    localStorage.removeItem("cart");
    localStorage.removeItem("order");
    localStorage.removeItem("placeOrder");
    navigate("easyGroceries-Shop/login");
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <HamburgerSpin
            isActive={
              settings.layout1Settings.leftSidebar.mode === "mobile" ||
              settings.layout1Settings.leftSidebar.mode === "full"
            }
            toggleButton={handleSidebarToggle}
            buttonColor={"#F15A29"}
            barColor="white"
            buttonWidth={20}
          />
        </Box>

        <Box display="flex" alignItems="center">
          <IconBox>
            <StyledIconButton>
              <img width="50px" height="50px" src={Logo} alt="e-log logo" />
            </StyledIconButton>
          </IconBox>

          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => navigate("/easyGroceries-Shop/checkOut/cart")}
          >
            <Badge badgeContent={quantity} color="error">
              <ShoppingBasketIcon />
            </Badge>
          </IconButton>
          <NavMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    <strong>{currentUser?.firstName}</strong>
                  </Span>
                </Hidden>
                <Avatar
                  src={currentUser?.imageUrl || "/assets/images/face-6.jpg"}
                  sx={{ cursor: "pointer" }}
                />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>

            <StyledItem onClick={handleLogout}>
              <Icon> power_settings_new </Icon>
              <Span> Logout </Span>
            </StyledItem>

            <StyledItem>
              <RoyaltyMembership
                memberText="RoyalTy Member"
                nonMemberText="Become a RoyalTy Member"
              />
            </StyledItem>
          </NavMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(NavTopbar);
