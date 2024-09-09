import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
// import * as api from "../../../assets/api/index";
import { Formik } from "formik";
import { useEffect, useState } from "react";
// import {useSelector} from 'react-redux';
// import { strengthColor, strengthIndicator } from "../../../utils/utils";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import AnimateButton from "../../../utils/ui-components/AnimateButton";
// import { openSuccessDialog } from "../../../utils/ui-components/pop-ups/SuccessDialog";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { strengthColor, strengthIndicator } from "../../../utils/utils";
// import { MuiOtpInput } from "mui-one-time-password-input";
// import { register } from "module";

function DocAuthRegister({ registerRequest, ...others }: any) {
  const theme: any = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState({ label: "", color: "" });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const changePassword = (value: any) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  //!...................otp button.........................................
  // const [display, setDisplay] = useState(false);

  // const [otp, setOtp] = React.useState("");

  // const handleOtp = (newValue: any) => {
  //   setOtp(newValue);
  // };

  // const handleDisplayOtp = () => {
  //   if (display) {
  //     setDisplay(false);
  //   } else {
  //     setDisplay(true);
  //   }
  // };

  useEffect(() => {
    // changePassword("123456");
  }, []);
  return (
    <Formik
      initialValues={{
        name: "",
        mobile: "",
        register: "",
        password: "",
        station: "",
        checked: false,
        hotline: false,
        sessions: false,
        inventory: false,
        // submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Your Name is required"),

        // email: Yup.string()
        //   .email("Must be a valid email")
        //   .max(255)
        //   .required("Email is required"),
        mobile: Yup.string()
          .required("Please enter mobile number")
          .matches(
            /(?:(0|94|)(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|(0|94|)7(0|1|2|4|5|6|7|8)\d)\d{6}/g,
            "Invalid mobile number pattern"
          ),
        register: Yup.string()
          .max(255)
          .required("Registration number is required"),
        station: Yup.string()
          .max(255)
          .required("Registration number is required"),
        password: Yup.string().max(255).required("Password is required"),
        checked: Yup.boolean()
          .required("You must agree with terms & conditions")
          .oneOf([true], "You must agree with terms & conditions"),
      })}
      onSubmit={async (values) => {
        if (values) {
          // const { data } = await api.signUp(values);
          registerRequest(values);

          // openSuccessDialog(data.status, data.comment);
        }
      }}
    >
      {({
        errors,
        isValid,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid container spacing={matchDownSM ? 0 : 1}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                label="How the name to be displayed ?"
                name="name"
                type="text"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.name && errors.name)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.name && errors.name && errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* <TextField
                                  required
                                  fullWidth
                                  label="Last Name"
                                  name="lname"
                                  type="text"
                                  value={values.lname}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={Boolean(touched.lname && errors.lname)} sx={{...theme.typography.customInput}}
                                  helperText={(touched.lname && errors.lname) && errors.lname}
                              /> */}
            </Grid>
          </Grid>
          {/* <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-register">
                Email Address *
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl> */}
          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={matchDownSM ? 0 : 2}
          >
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={Boolean(touched.mobile && errors.mobile)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-mobile-register">
                  Mobile *
                </InputLabel>
                <OutlinedInput
                  id="mobile"
                  type="tel"
                  value={values.mobile}
                  name="mobile"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">+ 94</InputAdornment>
                  }
                />
                {touched.mobile && errors.mobile && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.mobile}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* OTP Button ................................ */}
            {/* <Grid item xs={3} sm={3} sx={{}}>
              <Box sx={{ mt: 2, ml: { xs: 1, md: 0 } }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="button"
                    onClick={handleDisplayOtp}
                    variant="contained"
                    color="primary"
                    sx={{
                      color: "white",
                      fontWeight: "light",
                      fontSize: "12px",
                      minWidth: "90px",
                    }}
                  >
                    {display ? "Resend " : "Send OTP"}
                  </Button>
                </AnimateButton>
              </Box>
            </Grid> */}
          </Grid>

          {/* <Grid item>
            {display && (
              <Grid container sx={{ width: 300 }} spacing={4}>
                <Grid item xs={10}>
                  <MuiOtpInput value={otp} onChange={handleOtp} />
                </Grid>
                <Grid item xs={2} sx={{ mt: -1 }}>
                  <Box sx={{ mt: 2, ml: { xs: 1, md: 0 } }}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="button"
                        onClick={() => {}}
                        variant="contained"
                        color="secondary"
                        sx={{
                          color: "white",
                          fontWeight: "light",
                          fontSize: "12px",
                          minWidth: "60px",
                        }}
                      >
                        Verify
                      </Button>
                    </AnimateButton>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid> */}

          <Grid item>
            <FormControl
              fullWidth
              error={Boolean(touched.register && errors.register)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel>Registration Number</InputLabel>
              <OutlinedInput
                id="register"
                type="text"
                value={values.register}
                name="register"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              fullWidth
              error={Boolean(touched.station && errors.station)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-username-register">
                Current working station
              </InputLabel>
              <OutlinedInput
                id="station"
                type="text"
                value={values.station}
                name="station"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
            </FormControl>
          </Grid>

          {/* <Grid item sx={{ mt: 2 }}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  I want to manage my channeling collection through the app
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value={values.register}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid> */}
          <Grid item sx={{ mb: 2 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Select module
            </FormLabel>
            <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="sessions"
                    checked={values.sessions}
                    onChange={handleChange}
                  />
                }
                label="Sessions"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="inventory"
                    checked={values.inventory}
                    onChange={handleChange}
                  />
                }
                label="Inventory"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="hotline"
                    checked={values.hotline}
                    onChange={handleChange}
                  />
                }
                label="hotline"
              />
            </FormGroup>
          </Grid>

          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-password-register">
              Password *
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              label="Password *"
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                changePassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                    sx={{ mt: -1 }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-register"
              >
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          {strength !== 0 && (
            <FormControl fullWidth>
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box
                      style={{ backgroundColor: level?.color }}
                      sx={{ width: 85, height: 8, borderRadius: "7px" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </FormControl>
          )}

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.checked}
                    onChange={handleChange}
                    name="checked"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body1">
                    Agree with &nbsp;
                    <Typography variant="body1" component={Link} to="#">
                      Terms & Condition.
                    </Typography>
                  </Typography>
                }
              />
              {touched.checked && errors.checked && (
                <FormHelperText error>{errors.checked}</FormHelperText>
              )}
            </Grid>
          </Grid>
          {/* {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )} */}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting || !isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Submit
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default DocAuthRegister;
