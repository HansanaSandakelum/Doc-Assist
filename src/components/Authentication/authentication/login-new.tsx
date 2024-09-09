// import React from "react";
// import { useFormik, FormikProps } from "formik";
// import * as Yup from "yup";
import { Grid } from "@mui/material";
import Login from "./login";
import BasicCard from "../../login/GlassCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {  setRedirectPath } from "../../../redux/actions/actions";
// import { url } from "inspector";

// interface FormValues {
//   mobileNumber: string;
//   password: string;
//   rememberMe: boolean;
// }

const LoginForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getLogout());
    dispatch(setRedirectPath(null));
  }, []);
  //   const formik: FormikProps<FormValues> = useFormik<FormValues>({
  //     initialValues: {
  //       mobileNumber: "",
  //       password: "",
  //       rememberMe: false,
  //     },
  //     validationSchema: Yup.object({
  //       mobileNumber: Yup.string()
  //         .required("Mobile number is required")
  //         .matches(/^\+?[0-9]{10,12}$/, "Invalid phone number"),
  //       password: Yup.string().required("Password is required"),
  //     }),
  //     onSubmit: (values) => {
  //       console.log(JSON.stringify(values, null, 2));
  //     },
  //   });

  return (
    <Grid container minHeight="100vh" alignItems="center">
      <Grid
        item
        sm={2}
        md={6}
        xl={7}
        sx={{
          backgroundImage:
            "linear-gradient(-45deg, #5650D2 0%, #32B78D 99%, #32B78D 100%)",
          display: { xs: "none", sm: "none", md: "none", lg: "flex" },
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 6,
          padding: 3,
          height: 900,
          mx: 3,
        }}
      >
        {/* <Typography
          variant="h1"
          align="center"
          color="white"
          sx={{ fontWeight: "bold" }}
        >
          ➤ Your Journey to Better Health Starts Here
        </Typography> */}
        <BasicCard />
      </Grid>

      <Grid item sx={{ mx: "auto" }}>
        <img src="../../../assets/images/doc logo.png" alt="" />
        <Login />
      </Grid>

      {/* <Grid item xs={12} md={5}>
        <Box p={5}>
          <img
            src="/logo.png"
            alt="Doc Assist Logo"
            style={{ marginBottom: "1rem" }}
          />
          <Typography variant="h3" gutterBottom>
            Hey,
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Enter the information you entered while registering
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile number"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.mobileNumber &&
                Boolean(formik.errors.mobileNumber)
              }
              helperText={
                formik.touched.mobileNumber && formik.errors.mobileNumber
              }
              margin="normal"
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              my={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                  />
                }
                label="Remember me"
              />

              <Link href="#" underline="hover">
                Forgot password?
              </Link>
            </Box>

            <Button color="primary" variant="contained" fullWidth type="submit">
              Login
            </Button>
          </form>
        </Box>
      </Grid> */}
    </Grid>
  );
};

export default LoginForm;
