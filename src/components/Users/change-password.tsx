import PropTypes from "prop-types";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Grid, InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import {gridSpacing} from "../../store/constants";
import TextField from "../../utils/ui-components/FormsUI/TextField";
import React, {useState} from "react";
import PersonIcon from "@mui/icons-material/Person";

export interface UpdatePasswordValues {
    username: string;
    password: string;
    confirmPassword: string;
};

ChangePassword.propTypes = {
    initialItem: PropTypes.object.isRequired,
    fetchData: PropTypes.func,
    theme: PropTypes.object.isRequired,
};

function ChangePassword({initialItem, fetchData, theme}: any) {

    const [passwordShow, setPasswordShow] = React.useState({
        password: "",
        showPassword: false,
        confirmPassword: "",
        showConfirmPassword: false,
    });

    const [isLoading, setIsLoading] = useState(false)

    const FORM_VALIDATION = Yup.object().shape({
        username: Yup.string().required("Please enter username"),
        password: Yup.string().max(255).required('Password is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref("password")], "Your passwords do not match.").required("Please retype your password."),
    });

    const handleClickShowPassword = () => {
        setPasswordShow({
            ...passwordShow,
            showPassword: !passwordShow.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setPasswordShow({
            ...passwordShow,
            showConfirmPassword: !passwordShow.showConfirmPassword,
        });
    };

    const updatePassword = (itemData: UpdatePasswordValues, setSubmitting: (isSubmitting: boolean) => void) => {

        // let formData = {
        //     userId: itemData.userId,
        //     password: itemData.password,
        // }
        //
        // setIsLoading(true)
        // EmployeeService.updatePassword(formData).then(
        //     response => {
        //         if (response.isSuccess) {
        //             openSuccessDialog("Success", response.data.comment)
        //             setIsLoading(false)
        //             fetchData()
        //             handleClose()
        //         } else {
        //             setSubmitting(false)
        //             setIsLoading(false)
        //         }
        //     }
        // );
    };

    return (
        <Grid container style={{height: '100%'}}>
            <Grid item xs={12}>
                <Formik
                    initialValues={{
                        ...initialItem,
                    }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={(values: UpdatePasswordValues, {setSubmitting}) => {
                    }}
                >
                    {({values, dirty, isSubmitting, isValid, setFieldValue}) => (
                        <Form>
                            <Grid container spacing={gridSpacing} style={{padding: 20}}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField
                                        required
                                        type={"text"}
                                        name="username"
                                        label="Username"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}></Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField
                                        required={!initialItem?.userId}
                                        type={passwordShow.showPassword ? "text" : "password"}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon/>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {passwordShow.showPassword ? (
                                                            <VisibilityOff/>
                                                        ) : (
                                                            <Visibility/>
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        name="password"
                                        label="Password"
                                        placeholder="Password"
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField
                                        required={!initialItem?.userId}
                                        type={passwordShow.showConfirmPassword ? "text" : "password"}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon/>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        edge="end"
                                                    >
                                                        {passwordShow.showConfirmPassword ? (
                                                            <VisibilityOff/>
                                                        ) : (
                                                            <Visibility/>
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        name="passwordConfirmation"
                                        label="Confirm Password"
                                        placeholder="Confirm Password"
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
}

export default ChangePassword;