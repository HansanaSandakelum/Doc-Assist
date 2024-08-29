import React, {useRef, useState} from 'react';
import * as Yup from "yup";
import MainCard from "../../utils/ui-components/MainCard";
import {Box, Button, Grid} from "@mui/material";
import {gridSpacing, IMAGE_SIZE, IMAGE_SUPPORTED_FORMATS} from "../../store/constants";
import {Form, Formik} from "formik";
import TextField from "../../utils/ui-components/FormsUI/TextField";
import {useTheme} from "@mui/material/styles";
import FileUpload from "../../utils/ui-components/FormsUI/fileUpload/file-upload.component";

function Configurations() {
    const theme: any = useTheme();

    const successSmsInputRef: any = useRef();
    const [successSmsSelection, setSuccessSmsSelection] = useState();
    const updateSuccessSmsSelection = () =>
        setSuccessSmsSelection(successSmsInputRef.current.selectionStart);

    const docResubmitSmsInputRef: any = useRef();
    const [docResubmitSmsSelection, setDocResubmitSelection] = useState();
    const updateDocResubmitSmsSelection = () =>
        setDocResubmitSelection(docResubmitSmsInputRef.current.selectionStart);

    const INITIAL_FORM_STATE = {
        cribReportSuccessSms: "",
        cribReportFailedSms: "",
        documentAcknowledgeSms: "",
        documentResubmitSms: "",
        documentRejectSms: "",
        promotionalImages: [],
    };

    const FORM_VALIDATION = Yup.object().shape({
        cribReportSuccessSms: Yup.string().required('Please Enter CRIB report success SMS'),
        cribReportFailedSms: Yup.string().required('Please Enter CRIB report failed SMS'),
        documentAcknowledgeSms: Yup.string().required('Please Enter document acknowledge SMS'),
        documentResubmitSms: Yup.string().required('Please Enter document resubmit SMS'),
        documentRejectSms: Yup.string().required('Please Enter document reject SMS'),
        promotionalImages: Yup.mixed()
            .nullable()
            .test(
                "FILE_SIZE",
                'The size of uploaded files exceeds the maximum limit of 2MB',
                (value: any) => {
                    if (value.length > 0)
                        return value?.reduce(
                            (accumulator: any, curValue: any) => {
                                return accumulator + curValue.size
                            }, 0) <= IMAGE_SIZE;
                    else
                        return false;
                }
            )
            .test(
                "FILE_FORMAT",
                'Only .png, .jpeg and .jpg files are allowed',
                (value: any) => {
                    if (value.length > 0)
                        return value?.filter((obj: any) => IMAGE_SUPPORTED_FORMATS.includes(`${obj?.type},`)).length;
                    else
                        return true;
                }
            ),
    });

    return (
        <MainCard title="Configurations">
            <Box>
                <Formik
                    initialValues={{
                        ...INITIAL_FORM_STATE,
                    }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={(values: any) => {
                        console.log(values);
                    }}
                >
                    {({values, dirty, isSubmitting, isValid, setFieldValue}) => (
                        <Form>
                            <Grid container direction="row" spacing={{lg: gridSpacing, md: gridSpacing}}>
                                <Grid item lg={10} md={10} sm={12} xs={12}>
                                    <TextField
                                        required
                                        onSelect={updateSuccessSmsSelection}
                                        inputRef={successSmsInputRef}
                                        type="text"
                                        name="cribReportSuccessSms"
                                        label="CRIB Report Success SMS"
                                        multiline={true}
                                    />
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12} display="flex" alignItems="center">
                                    {values.cribReportSuccessSms.search('🔗') != -1 ?
                                        <Button variant="outlined" color="error"
                                                onClick={() => setFieldValue("cribReportSuccessSms", values.cribReportSuccessSms.replace('🔗', ''))}>Remove
                                            URL</Button> : <Button variant="outlined" color="success"
                                                                   onClick={() => setFieldValue("cribReportSuccessSms", [values.cribReportSuccessSms.slice(0, successSmsSelection), '🔗', values.cribReportSuccessSms.slice(successSmsSelection)].join(''))}>Add
                                            URL</Button>
                                    }
                                </Grid>
                                <Grid item lg={10} md={10} sm={12} xs={12}>
                                    <TextField
                                        required
                                        type="text"
                                        name="cribReportFailedSms"
                                        label="CRIB Report Failed SMS"
                                        multiline={true}
                                    />
                                </Grid>
                                <Grid item lg={10} md={10} sm={12} xs={12}>
                                    <TextField
                                        required
                                        type="text"
                                        name="documentAcknowledgeSms"
                                        label="Document Acknowledge SMS"
                                        multiline={true}
                                    />
                                </Grid>
                                <Grid item lg={10} md={10} sm={12} xs={12}>
                                    <TextField
                                        required
                                        onSelect={updateDocResubmitSmsSelection}
                                        inputRef={docResubmitSmsInputRef}
                                        type="text"
                                        name="documentResubmitSms"
                                        label="Document Resubmit SMS"
                                        multiline={true}
                                    />
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12} display="flex" alignItems="center">
                                    {values.documentResubmitSms.search('🔗') != -1 ?
                                        <Button variant="outlined" color="error"
                                                onClick={() => setFieldValue("documentResubmitSms", values.documentResubmitSms.replace('🔗', ''))}>Remove
                                            URL</Button> : <Button variant="outlined" color="success"
                                                                   onClick={() => setFieldValue("documentResubmitSms", [values.documentResubmitSms.slice(0, docResubmitSmsSelection), '🔗', values.documentResubmitSms.slice(docResubmitSmsSelection)].join(''))}>Add
                                            URL</Button>
                                    }
                                </Grid>
                                <Grid item lg={10} md={10} sm={12} xs={12}>
                                    <TextField
                                        required
                                        type="text"
                                        name="documentRejectSms"
                                        label="Document Reject SMS"
                                        multiline={true}
                                    />
                                </Grid>
                                <Grid item lg={10} md={10} sm={12} xs={12}>
                                    <FileUpload
                                        accept=".jpg,.png,.jpeg"
                                        label="Promotional Images"
                                        maxFileSizeInBytes={IMAGE_SIZE}
                                        name="promotionalImages"
                                        limit={'2MB'}
                                        multiple
                                        customHandleChange={(files: any) => {
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </MainCard>
    );
}

export default Configurations;