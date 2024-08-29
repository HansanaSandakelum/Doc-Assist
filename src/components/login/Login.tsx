// src/components/Login.tsx

import React from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Container,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.number().required("Mobile number is required"),
      password: Yup.string().min(8).required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  return (
    <Container maxWidth="lg">
      <Grid container component="main" sx={{ height: "760px" }}>
        <Grid item xs={"auto"} sm={6} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "760px",
              background: "linear-gradient(135deg, #42E695 0%, #9591EB 100%)",
              borderRadius: "30px 30px 30px 30px",
              color: "#fff",
              textAlign: "center",
              p: 3,
              mt: 1,
              mb: 1,
            }}
          >
            <h4 className="text-white font-bold text-4xl w-85">
              Your Journey to Better Health Starts Here
            </h4>
            {/* <Typography variant="h3" component="div" fontWeight="bold">
              Your Journey to Better Health Starts Here
            </Typography> */}
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "75%", maxWidth: "400px" }}>
            <Typography
              variant="h5"
              component="div"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              Doc Assist
            </Typography>

            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              Hey,
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Enter the information you entered while registering
            </Typography>

            <form onSubmit={formik.handleSubmit} noValidate>
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
                variant="outlined"
                sx={{ mb: 2 }}
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
                className="rounded-full"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      checked={formik.values.rememberMe}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Remember me"
                />
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Box>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  mt: 1,
                  color: "black",
                  borderRadius: 25,
                  border: 1,
                  borderColor: "black",
                  background: "linear-gradient(-39deg, #ffff 0%, #2ABB8D 100%)",
                  ":hover": {
                    background: "transparent",
                  },
                }}
              >
                Login
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
