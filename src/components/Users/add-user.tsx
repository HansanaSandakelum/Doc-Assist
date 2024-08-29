import PropTypes from "prop-types";
import * as Yup from "yup";
import {openSuccessDialog} from "../../utils/ui-components/pop-ups/SuccessDialog";
import {Form, Formik} from "formik";
import {Button, CircularProgress, Grid, IconButton, InputAdornment} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from '@mui/icons-material/Person';
import {gridSpacing, IMAGE_SIZE, IMAGE_SUPPORTED_FORMATS} from "../../store/constants";
import TextField from "../../utils/ui-components/FormsUI/TextField";
import React, {useState} from "react";
import ItemImageUpload from "../../utils/ui-components/FormsUI/ItemImageUpload/item-image-upload.component";
import Select from "../../utils/ui-components/FormsUI/Select";
import {UserAddValues} from "./user-list";

AddUser.propTypes = {
    initialItem: PropTypes.object.isRequired,
    setOpen: PropTypes.func.isRequired,
    fetchData: PropTypes.func,
    initialData: PropTypes.array
};

const ACCOUNT_TYPES = [
    {
        value: 1,
        label: 'Admin',
    },
    {
        value: 2,
        label: 'Moderator',
    },
]

const INDUSTRY_TYPES = [
    {
        value: 1,
        label: 'Construction',
    },
    {
        value: 2,
        label: 'Retail',
    },
    {
        value: 3,
        label: 'Transportation',
    },
    {
        value: 4,
        label: 'Financial Service',
    },
    {
        value: 5,
        label: 'Agriculture',
    },
    {
        value: 6,
        label: 'Education',
    },
    {
        value: 7,
        label: 'Technology',
    },
    {
        value: 8,
        label: 'Health Care',
    },
];

function AddUser({initialItem, setOpen, fetchData}: any) {

    const [isLoading, setIsLoading] = useState(false)
    const [passwordShow, setPasswordShow] = useState({
        password: "",
        showPassword: false,
        confirmPassword: "",
        showConfirmPassword: false,
    });

    const FORM_VALIDATION = Yup.object().shape({
        profileImage: Yup.mixed()
            .nullable()
            .notRequired()
            .test(
                "FILE_SIZE",
                "Uploaded file is too big.",
                ({file: value}: any) => !value || (value && value?.size <= IMAGE_SIZE)
            )
            .test(
                "FILE_FORMAT",
                "Uploaded file has unsupported format.",
                ({file: value}: any) =>
                    !value ||
                    (value && IMAGE_SUPPORTED_FORMATS.includes(`${value?.type},`))
            ),
        representativeName: Yup.string().required('Representative name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        nid: Yup.string().required('NID is required'),
        vat: Yup.number()
            .typeError("Allowed numbers only")
            .test(
                "maxDigitsAfterDecimal",
                "number field must have 2 digits after decimal or less",
                (number: any) => !number || /^\d+(\.\d{1,2})?$/.test(number)
            ),
        companyName: Yup.string().required('Representative name is required'),
        businessName: Yup.string().required('Business name is required'),
        companyContact: Yup.string().matches(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            'Invalid mobile number pattern'
        ).required("Please enter company contact number"),
        companyLocation: Yup.string().max(255, 'maximum character count exceeded').required('Company location is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().max(255).required('Password is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Your passwords do not match.").notRequired(),
        industryType: Yup.number().required("You must make a selection"),
        accountType: Yup.number().required("You must make a selection"),
    });

    const createUser = (itemData: UserAddValues, setSubmitting: (isSubmitting: boolean) => void) => {
        setIsLoading(true)
        let formData = {
            userName: itemData.username,
            password: itemData.password,
            confirmPassword: itemData.confirmPassword,
        }
        // ApiService.addNewApiUser(formData).then(
        //     response => {
        //         if (response.isSuccess) {
        //             openSuccessDialog("Success", response.data.comment);
        //             setOpen(false);
        //             fetchData();
        //             setIsLoading(false)
        //         } else {
        //             setSubmitting(false);
        //             setIsLoading(false)
        //         }
        //     }
        // );
    };

    const updateUser = (itemData: UserAddValues, setSubmitting: (isSubmitting: boolean) => void) => {
        setIsLoading(true)
        let formData = {
            userName: itemData.username,
            password: itemData.password,
        }
        // ApiService.updateApiUser(formData).then(
        //     response => {
        //         setSubmitting(false);
        //         if (response.isSuccess) {
        //             openSuccessDialog("Success", response.data.comment);
        //             setOpen(false);
        //             fetchData();
        //             setIsLoading(false)
        //         } else {
        //             setSubmitting(false);
        //             setIsLoading(false)
        //         }
        //     }
        // );
    };

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

    return (
        <Formik
            initialValues={{
                ...initialItem
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values: UserAddValues, {setSubmitting}) => {
                if (initialItem.userId) {
                    updateUser(values, setSubmitting);
                } else {
                    createUser(values, setSubmitting);
                }
            }}
        >
            {({values, dirty, isSubmitting, isValid, setFieldValue}) => (
                <Form>
                    <Grid container columnSpacing={gridSpacing}>
                        <Grid item xs={12} lg={4} md={6} marginBottom={2}>
                            <ItemImageUpload
                                accept=".jpg,.png,.jpeg"
                                label="Upload your profile/company photo"
                                maxFileSizeInBytes={IMAGE_SIZE}
                                name="profileImage"
                            />
                        </Grid>
                        <Grid item xs={12} lg={8} md={6} marginBottom={2}>
                            <Grid container columnSpacing={gridSpacing}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        label="Company Name"
                                        name="companyName"
                                        type="text"/>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        label="Business Name"
                                        name="businessName"
                                        type="text"/>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <TextField
                                        required
                                        label="Company Contact"
                                        name="companyContact"
                                        type="tel"
                                        InputProps={{
                                            startAdornment: <InputAdornment
                                                position="start">+880</InputAdornment>,
                                        }}/>
                                </Grid>
                                <Grid item xs={12} md={7}>
                                    <TextField
                                        required
                                        label="Company Location"
                                        name="companyLocation"
                                        type="text"
                                        multiline
                                        rows={3}/>
                                </Grid>
                                <Grid item xs={12} lg={4} md={6}>
                                    <Select
                                        label="Industry Type *"
                                        name="industryType"
                                        options={INDUSTRY_TYPES}
                                        customHandleChange={() => {
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={4} md={6}>
                                    <Select
                                        label="Account Type *"
                                        name="accountType"
                                        options={ACCOUNT_TYPES}
                                        customHandleChange={() => {
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={4} md={6}>
                                    <TextField
                                        required
                                        label="VAT"
                                        name="vat"
                                        type="text"/>
                                </Grid>
                                <Grid item xs={12} lg={6} md={6}>
                                    <TextField
                                        required
                                        label="NID"
                                        name="nid"
                                        type="text"/>
                                </Grid>
                                <Grid item xs={12} lg={6} md={6}>
                                    <TextField
                                        required
                                        label="Representative Name"
                                        name="representativeName"
                                        type="text"/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                type={passwordShow.showPassword ? "text" : "password"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                name="username"
                                label="Username"
                                placeholder="Username"
                                required
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
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
                                required
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
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
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                required
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid item xs={12} sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                py: 2,
                            }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={!dirty || isSubmitting || !isValid}
                                >
                                    {isLoading && <CircularProgress size={'20px'} sx={{
                                        mr: 1,
                                        color: 'gray'
                                    }}/>}Create User
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default AddUser;