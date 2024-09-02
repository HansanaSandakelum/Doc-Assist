
import React from "react";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  
} from "@mui/material";

interface FormValues {
  displayName: string;
  registrationNumber: string;
  currentWorkstation: string;
  showWorkLocation: string;
  manageCollection: string;
  modules: {
    inventory: boolean;
    sessions: boolean;
    hotline: boolean;
  };
  mobileNumber: string;
  password: string;
  acceptTerms: boolean;
}

const DoctorRegistrationForm: React.FC = () => {
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      displayName: "",
      registrationNumber: "",
      currentWorkstation: "",
      showWorkLocation: "",
      manageCollection: "",
      modules: {
        inventory: false,
        sessions: false,
        hotline: false,
      },
      mobileNumber: "",
      password: "",
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      displayName: Yup.string().required("Required"),
      registrationNumber: Yup.string().required("Required"),
      currentWorkstation: Yup.string().required("Required"),
      showWorkLocation: Yup.string().required("Required"),
      manageCollection: Yup.string().required("Required"),
      mobileNumber: Yup.string()
        .required("Required")
        .matches(/^\+?[0-9]{10,12}$/, "Invalid phone number"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters"),
      acceptTerms: Yup.bool().oneOf([true], "You must accept the terms"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 500, margin: "auto", mt: 5, p: 3, bgcolor: "#f0f4f8", borderRadius: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Doctor Registration
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Let’s Protect yourself and those around you by vaccinating
      </Typography>

      <TextField
        fullWidth
        id="displayName"
        name="displayName"
        label="How the name to be displayed?"
        value={formik.values.displayName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.displayName && Boolean(formik.errors.displayName)}
        helperText={formik.touched.displayName && formik.errors.displayName}
        margin="normal"
      />

      <TextField
        fullWidth
        id="registrationNumber"
        name="registrationNumber"
        label="Registration Number"
        value={formik.values.registrationNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
        helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
        margin="normal"
      />

      <TextField
        fullWidth
        id="currentWorkstation"
        name="currentWorkstation"
        label="Current working station"
        value={formik.values.currentWorkstation}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.currentWorkstation && Boolean(formik.errors.currentWorkstation)}
        helperText={formik.touched.currentWorkstation && formik.errors.currentWorkstation}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="showWorkLocation-label">
          Do you want to show current working location?
        </InputLabel>
        <Select
          labelId="showWorkLocation-label"
          id="showWorkLocation"
          name="showWorkLocation"
          value={formik.values.showWorkLocation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.showWorkLocation && Boolean(formik.errors.showWorkLocation)}
        >
          <MenuItem value={"Yes"}>Yes</MenuItem>
          <MenuItem value={"No"}>No</MenuItem>
        </Select>
        {formik.touched.showWorkLocation && formik.errors.showWorkLocation && (
          <Typography variant="body2" color="error">
            {formik.errors.showWorkLocation}
          </Typography>
        )}
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        {/* <FormLabel component="legend">
          I want to manage my channeling collection through the app
        </FormLabel>
        <RadioGroup
          row
          aria-label="manageCollection"
          name="manageCollection"
          value={formik.values.manageCollection}
          onChange={formik.handleChange}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup> */}
      </FormControl>

      <FormGroup>
        <FormLabel component="legend">Select module</FormLabel>
        {["inventory", "sessions", "hotline"].map((module) => (
          <FormControlLabel
            key={module}
            control={
              <Checkbox
                name={`modules.${module}`}
                checked={formik.values.modules[module as keyof FormValues["modules"]]}
                onChange={formik.handleChange}
              />
            }
            label={module.charAt(0).toUpperCase() + module.slice(1)}
          />
        ))}
      </FormGroup>

      <TextField
        fullWidth
        id="mobileNumber"
        name="mobileNumber"
        label="Mobile Number"
        placeholder="+94"
        value={formik.values.mobileNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
        helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
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

      <FormControlLabel
        control={
          <Checkbox
            name="acceptTerms"
            checked={formik.values.acceptTerms}
            onChange={formik.handleChange}
          />
        }
        label="Accept terms and conditions"
      />

      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>

      <Box mt={2}>
        <Typography variant="body2">
          Already registered? <a href="/login">Login</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default DoctorRegistrationForm;
