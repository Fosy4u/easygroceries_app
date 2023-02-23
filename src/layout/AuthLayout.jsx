import {
  Card,
} from "@mui/material";
import { Box, styled } from "@mui/system";


const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));



const JWTRoot = styled(JustifyBox)(() => ({
  background: "#4D148c",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// layout for sign in pages

const AuthLayout = ({children}) => {

  return (
    <JWTRoot>
      <Card className="card">{children}</Card>
    </JWTRoot>
  );
};

export default AuthLayout;
