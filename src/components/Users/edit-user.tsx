import PropTypes from "prop-types";
import * as Yup from "yup";
import {openSuccessDialog} from "../../utils/ui-components/pop-ups/SuccessDialog";
import {Form, Formik} from "formik";
import {Button, CircularProgress, Grid, InputAdornment} from "@mui/material";
import {gridSpacing, IMAGE_SIZE, IMAGE_SUPPORTED_FORMATS} from "../../store/constants";
import TextField from "../../utils/ui-components/FormsUI/TextField";
import React, {useState} from "react";
import ItemImageUpload from "../../utils/ui-components/FormsUI/ItemImageUpload/item-image-upload.component";
import Select from "../../utils/ui-components/FormsUI/Select";
import {UserEditValues} from "./view-user";

EditUser.propTypes = {
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

function EditUser({initialItem, setOpen, fetchData}: any) {

    const [isLoading, setIsLoading] = useState(false)

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
        industryType: Yup.number().required("You must make a selection"),
        accountType: Yup.number().required("You must make a selection"),
    });

    const createUser = (itemData: UserEditValues, setSubmitting: (isSubmitting: boolean) => void) => {
        setIsLoading(true)
        let formData = {}
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

    const updateUser = (itemData: UserEditValues, setSubmitting: (isSubmitting: boolean) => void) => {
        setIsLoading(true)
        let formData = {}
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

    return (
        <Formik
            initialValues={{
                ...initialItem
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values: UserEditValues, {setSubmitting}) => {
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
                                    }}/>} Save User
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default EditUser;