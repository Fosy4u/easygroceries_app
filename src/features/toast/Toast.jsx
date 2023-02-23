import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import { AlertTitle } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({ title, message, show, onClose, variant, ...props }) => {
  return (
    <Snackbar open={show} autoHideDuration={5000} onClose={onClose} {...props}>
      <Alert onClose={onClose} severity={variant} sx={{ width: "100%" }}>
        {title && (
          <AlertTitle>
            {" "}
            <strong>{title}</strong>
          </AlertTitle>
        )}
        {message !== "Request Successful" && (
          <span style={{ backgroundColor: "red", color: "white" }}>
            {message} <ReportGmailerrorredIcon />
          </span>
        )}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
