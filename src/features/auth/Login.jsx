import { LoadingButton } from "@mui/lab";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import Image from "../../images/brand1.png";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { globalActions } from "../../global/global.slice";
import organisationsApi from "../../services/organisationsApi.slice";
import { Paragraph } from "../../utils/components/Typography";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState();
  const getCustomersQuery = organisationsApi.useGetCustomersQuery();
  const customers = getCustomersQuery?.data;

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const user = customers?.find((customer) => customer.id === userId);
      setCustomer(user);
    }
  }, [customers]);

  const signIn = () => {
    setLoading(true);
    if (customer) {
      dispatch(globalActions.setCurrentUser(customer));
      setLoading(false);
      const currentUrl = localStorage.getItem("currentUrl");
      if (currentUrl) {
        localStorage.removeItem("currentUrl");
        localStorage.setItem("userId", customer.id);
        return navigate(currentUrl);
      }
      return navigate(`/easyGroceries-Shop`);
    }
  };

  return (
    <Grid container>
      <Grid item sm={6} xs={12}>
        <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
          <img src={Image} width="100%" alt="" />
        </JustifyBox>
      </Grid>
      <Grid item sm={6} xs={12}>
        <ContentBox>
          <div className="d-flex m-5 flex-column h-100">
            <FormControl>
              <InputLabel>Select Customer</InputLabel>
              <Select
                size="small"
                required
                fullWidth
                value={customer || ""}
                onChange={(e) => setCustomer(e.target.value)}
              >
                {customers?.map((customer) => (
                  <MenuItem key={customer.id} value={customer}>
                    {customer.firstName} {customer.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LoadingButton
              type="submit"
              color="primary"
              loading={loading}
              variant="contained"
              sx={{ my: 2 }}
              onClick={() => signIn()}
              disabled={!customer}
            >
              Login
            </LoadingButton>

{/* had this reserved for allowing one add more users but couldnt implement due to time constraints
and it wasnt part of the requirements */}


            <Paragraph>
              Register ?
              <NavLink
                to="/signup"
                style={{
                  color: theme.palette.primary.main,
                  marginLeft: 5,
                }}
              >
                Add Customer
              </NavLink>
            </Paragraph>
          </div>
        </ContentBox>
      </Grid>
    </Grid>
  );
};

export default Login;
