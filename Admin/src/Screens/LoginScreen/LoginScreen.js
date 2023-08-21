import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Validation from "../../Common/Validation";
import { TextField } from "@mui/material";
import apihelper from "../../Common/ApiHelper";
import Path from "../../Common/Path";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

export default function LoginScreen(props) {
  const { setAuth, Auth } = props;

  const [showPassword, setShowPassword] = React.useState(false);
  const Navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [open, setOpen] = React.useState(true);
  const [isSubmited, setIsSubmited] = useState(false);
  const [loginError, SetLoginError] = useState([]);
  const [token, setToken] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  useEffect(() => {
    if (Auth) Navigate(Path.dashBoard);
    // eslint-disable-next-line
  }, []);

  const LoginHandler = async () => {
    try {
      setIsSubmited(true);
      const ValidatioResult = Validation(user, "login");

      if (ValidatioResult.length > 0) {
        SetLoginError(ValidatioResult);
        return;
      }

      const result = await apihelper.UserLogin(user);
      console.log(result);
      localStorage.setItem("TOKEN" ,result.data.user.token )
      setAuth(true)
      navigate("/")
      
    } catch (error) {
      setAuth(false);
      if (error.response && error.response.data) {
        if (
          error.response.status === 400 &&
          error.response.data.message === "Validation Error"
        ) {
          SetLoginError(error.response.data.ValidationResult);
          return;
        }
      }
    }
  };

  return (
    <div>
      <div>
        <Dialog open={open}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent className="d-flex flex-column">
            <FormControl sx={{ mt: 2, width: "40ch" }} variant="outlined">
              <TextField
                id="outlined-adornment-password"
                type={"email"}
                label="Email"
                error={loginError?.find((x) => x.key === "email")}
                helperText={loginError?.find((x) => x.key === "email")?.message}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                  if (isSubmited) {
                    const ValidatioResult = Validation(
                      { ...user, email: e.target.value },
                      "login"
                    );
                    SetLoginError(ValidatioResult);
                  }
                }}
              />
            </FormControl>
            <FormControl sx={{ mt: 2, width: "40ch" }} variant="outlined">
              <TextField
                error={loginError?.find((x) => x.key === "password")}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Password"
                helperText={
                  loginError?.find((x) => x.key === "password")?.message
                }
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                  if (isSubmited) {
                    const ValidatioResult = Validation(
                      { ...user, password: e.target.value },
                      "login"
                    );
                    SetLoginError(ValidatioResult);
                  }
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button onClick={LoginHandler}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
