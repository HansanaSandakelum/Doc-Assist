import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
import * as api from "../../../assets/api/index";
import { Formik } from "formik";
import React, { useEffect } from "react";
// import {useSelector} from 'react-redux';
// import { strengthColor, strengthIndicator } from "../../../utils/utils";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import AnimateButton from "../../../utils/ui-components/AnimateButton";
import { openSuccessDialog } from "../../../utils/ui-components/pop-ups/SuccessDialog";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import MultipleSelect from "./muliple-select";

function AuthRegister({ ...others }) {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  //   const [showPassword, setShowPassword] = useState(false);

  //   const [strength, setStrength] = useState(0);
  //   const [level, setLevel] = useState({ label: "", color: "" });

  //   const handleClickShowPassword = () => {
  //     setShowPassword(!showPassword);
  //   };

  //   const handleMouseDownPassword = (event: any) => {
  //     event.preventDefault();
  //   };

  //   const changePassword = (value: any) => {
  //     const temp = strengthIndicator(value);
  //     setStrength(temp);
  //     setLevel(strengthColor(temp));

  //   };

  useEffect(() => {
    // changePassword("123456");
  }, []);
  return (
    <Formik
      initialValues={{
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        username: "",
        password: "",
        checked: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        fname: Yup.string().required("First Name is required"),
        lname: Yup.string().required("Last Name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        mobile: Yup.string()
          .required("Please enter mobile number")
          .matches(
            /(?:(0|94|)(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|(0|94|)7(0|1|2|4|5|6|7|8)\d)\d{6}/g,
            "Invalid mobile number pattern"
          ),
        username: Yup.string().max(255).required("Username is required"),
        password: Yup.string().max(255).required("Password is required"),
        checked: Yup.boolean()
          .required("You must agree with terms & conditions")
          .oneOf([true], "You must agree with terms & conditions"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (values) {
            setStatus({ success: true });
            setSubmitting(false);

            const { data } = await api.signUp(values);

            openSuccessDialog(data.status, data.comment);
            navigate("/login");
          }
        } catch (err: any) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                label="Name"
                name="fname"
                type="text"
                value={values.fname}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.fname && errors.fname)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched.fname && errors.fname && errors.fname}
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
            <Grid item xs={12} sm={11}>
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-mobile-register">
                  Mobile *
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-mobile-register"
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
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-mobile-register">
                  Secondry Mobile *
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-mobile-register"
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
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="left"
            spacing={matchDownSM ? 0 : 2}
          >
            <Grid item>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container sx={{ my: 1 }}>
            {/* <FormLabel id="demo-row-radio-buttons-group-label">
              Date of Birth
            </FormLabel> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                {/* <DatePicker label={'"year"'} openTo="year" /> */}
                <DatePicker
                  label={'"Date of Birth"'}
                  openTo="year"
                  views={["year", "month", "day"]}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          
          <MultipleSelect select ={["Food Allergy", "Drug Allergy", "Plaser Allergy"]} label={'Allergies'}/>
          <MultipleSelect select ={["A", "B", "AB","O"]} label={'Blood Group'}/>

          <FormControl
            fullWidth
            error={Boolean(touched.email && errors.email)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-username-register">
              Past Medical History
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-username-register"
              type="text"
              value={values.username}
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {/* {touched.username && errors.username && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {errors.username}
              </FormHelperText>
            )} */}
          </FormControl>

          {/* <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-password-register">
              Password *
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-register"
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
          </FormControl> */}

          {/* {strength !== 0 && (
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
          )} */}

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

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting}
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

export default AuthRegister;
