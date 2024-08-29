import React, {useEffect, useState} from 'react';
import {Box, Button,  Grid, Typography} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import MainCard from "../../utils/ui-components/MainCard";
import EmptyResultDataGrid from "../../utils/ui-components/EmptyResultDataGrid";
import {findCampaignStatus} from "../../utils/utils";
import * as XLSX from "xlsx";
import GetAppIcon from '@mui/icons-material/GetApp';
// import {useLocation, useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {gridSpacing} from "../../store/constants";
import DatePicker from "../../utils/ui-components/FormsUI/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {Form, Formik} from "formik";
import {useTheme} from "@mui/material/styles";
import * as Yup from "yup";
import TextField from "../../utils/ui-components/FormsUI/TextField";
import Select from "../../utils/ui-components/FormsUI/Select";

const INITIAL_FORM_STATE = {
    campaignName: "",
    masking: "",
    fromDate: dayjs().subtract(30, 'day'),
    toDate: dayjs(),
    campaignType: "",
    deliveryStatus: "",
    campaignCategory: ""
};

const FORM_VALIDATION = Yup.object().shape({
    campaignName: Yup.string().notRequired(),
    masking: Yup.string().notRequired(),
    fromDate: Yup.date().nullable().required("Please Select a Date").typeError("please enter a valid date"),
    toDate: Yup.date().nullable().required("Please Select a Date").typeError("please enter a valid date"),
    campaignType: Yup.number().notRequired(),
    deliveryStatus: Yup.number().notRequired(),
    campaignCategory: Yup.number().notRequired(),
});

const CAMPAIGN_TYPES = [
    {
        value: 1,
        label: 'Campaign Type 1',
    },
    {
        value: 2,
        label: 'Campaign Type 2',
    },
]

const DELIVERY_STATUS = [
    {
        value: 1,
        label: 'Delivery Status 1',
    },
    {
        value: 2,
        label: 'Delivery Status 2',
    },
]

const CAMPAIGN_CATEGORIES = [
    {
        value: 1,
        label: 'Campaign Category 1',
    },
    {
        value: 2,
        label: 'Campaign Category 2',
    },
]

function CampaignList() {
    // const navigate = useNavigate();
    // const location = useLocation();

    const theme: any = useTheme();
    const [ setDateRange] = useState(INITIAL_FORM_STATE)
    const [isBtnLoading] = useState(false)

    const [reportData,]: any = useState(data || []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, ] = useState(data.length);

    const [isLoading, ] = useState(false);
    const [isExportingExcel, setExportingExcel] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {

    }

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (newPageSize: number) => {
        setRowsPerPage(newPageSize);
        setPage(0);
    };

    const exportTOExcel = () => {
        setExportingExcel(true)

        const Heading = [["ID", "Name", "Scheduled Timestamp", "Created Timestamp", "Category", "Creator", "Status", "Campaign Type", "Masking", "Total Expressions", "Total Impressions"]];

        /* add the header */
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, Heading);

        //Starting in the second row to avoid overriding and skipping headers
        XLSX.utils.sheet_add_json(ws, reportData, {
            origin: "A2",
            skipHeader: true,
        });

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        /* save to file */
        XLSX.writeFile(wb, "deposit-register-report-" + new Date().getTime() + ".xlsx");
        setExportingExcel(false)
    }

    const columns = [
        {
            field: "campaign_id",
            filterable: true,
            headerName: "ID",
            sortable: true,
            disableExport: false,
            minWidth: 50,
            flex: 1,
        },
        {
            field: "campaign_name",
            filterable: true,
            headerName: "Name",
            sortable: true,
            disableExport: false,
            minWidth: 150,
            flex: 3,
        },
        {
            field: "scheduled_timestamp",
            filterable: true,
            headerName: "Scheduled Timestamp",
            sortable: true,
            disableExport: false,
            minWidth: 150,
            flex: 3,
        },
        {
            field: "created_timestamp",
            filterable: true,
            headerName: "Created Timestamp",
            sortable: true,
            disableExport: false,
            minWidth: 150,
            flex: 3,
        },
        {
            field: "campaign_category",
            filterable: true,
            headerName: "Category",
            sortable: true,
            disableExport: false,
            minWidth: 150,
            flex: 3,
        },
        {
            field: "creator",
            filterable: true,
            headerName: "Creator",
            sortable: false,
            disableExport: false,
            minWidth: 100,
            flex: 2,
        },
        {
            field: "campaign_status",
            filterable: true,
            headerName: "Status",
            sortable: false,
            disableExport: false,
            minWidth: 100,
            flex: 2,
            renderCell: (params: any) => {
                return <Typography variant="overline"
                                   color={findCampaignStatus(params.row.status).color}>{findCampaignStatus(params.row.status).status}</Typography>
            }
        },
        {
            field: "campaign_type",
            filterable: true,
            headerName: "Campaign Type",
            sortable: false,
            disableExport: false,
            minWidth: 150,
            flex: 3,
            renderCell: (parmas: any) => {
                if (parmas.row.campaign_type === 0) {
                    return "Bulk"
                } else if (parmas.row.campaign_type === 1) {
                    return "Personalized"
                } else return "-"
            }
        },
        {
            field: "mask",
            filterable: true,
            headerName: "Masking",
            sortable: false,
            disableExport: false,
            minWidth: 150,
            flex: 3,
        },
        {
            field: "total_exp",
            filterable: true,
            headerName: "Total Expressions",
            sortable: false,
            disableExport: false,
            minWidth: 100,
            flex: 2,
        },
        {
            field: "total_imp",
            filterable: true,
            headerName: "Total Impressions",
            sortable: false,
            disableExport: false,
            minWidth: 100,
            flex: 2,
        },
    ];


    return (
        <MainCard title="Campaign List">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            ...INITIAL_FORM_STATE,
                        }}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={(values) => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const setDateRange = (range: {
                                campaignName: string;
                                masking: string;
                                fromDate: Dayjs;
                                toDate: Dayjs;
                                campaignType: string;
                                deliveryStatus: string;
                                campaignCategory: string;
                            }) => {
                                // Your implementation here
                            };
                        
                            setDateRange({
                                campaignName: values.campaignName,
                                masking: values.masking,
                                fromDate: values.fromDate,
                                toDate: values.toDate,
                                campaignType: values.campaignType,
                                deliveryStatus: values.deliveryStatus,
                                campaignCategory: values.campaignCategory
                            });
                        }}
                    >
                        {({values}) => (
                            <Form>
                                <Grid container columnSpacing={gridSpacing}>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                        <DatePicker
                                            name="fromDate"
                                            label="From Date"
                                            placeholder="From Date"
                                            maxDate={values.toDate || dayjs()}
                                            sx={{...theme.typography.customInput}}
                                        />
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                        <DatePicker
                                            name="toDate"
                                            label="To Date"
                                            placeholder="To Date"
                                            maxDate={dayjs()}
                                            minDate={values.fromDate}
                                            sx={{...theme.typography.customInput}}
                                        />
                                    </Grid>
                                    <Grid item lg={2.5} md={2.5} sm={12} xs={12}>
                                        <TextField
                                            label="Campaign Name"
                                            name="campaignName"
                                            type="text"
                                            placeholder="Enter your campaign name"
                                            sx={{...theme.typography.customInput}}/>
                                    </Grid>
                                    <Grid item lg={2.5} md={2.5} sm={12} xs={12}>
                                        <TextField
                                            label="Masking"
                                            name="masking"
                                            type="text"
                                            placeholder="Enter your masking"
                                            sx={{...theme.typography.customInput}}/>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                        <Select
                                            label="Campaign Type"
                                            name="campaignType"
                                            placeholder="Select campaign type"
                                            sx={{...theme.typography.customInput}}
                                            options={CAMPAIGN_TYPES}
                                            customHandleChange={() => {
                                            }}/>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                        <Select
                                            label="Delivery Status"
                                            name="deliveryStatus"
                                            placeholder="Select delivery status"
                                            sx={{...theme.typography.customInput}}
                                            options={DELIVERY_STATUS}
                                            customHandleChange={() => {
                                            }}/>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                        <Select
                                            label="Campaign Category"
                                            name="campaignCategory"
                                            placeholder="Select campaign category"
                                            sx={{...theme.typography.customInput}}
                                            options={CAMPAIGN_CATEGORIES}
                                            customHandleChange={() => {
                                            }}/>
                                    </Grid>
                                    <Grid item lg={1} md={1} sm={12} xs={12}>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            sx={{...theme.typography.customInput}}
                                            disabled={isBtnLoading}
                                        >
                                            {isBtnLoading ? <CircularProgress size={25}/> : "View"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
            <Box sx={{minHeight: 400, width: '100%'}}>
                {/* <DataGrid
                    autoHeight
                    columns={columns}
                    loading={isLoading}
                    rows={reportData}
                    pagination
                    getRowId={(row) => row.id}
                    paginationMode="server"
                    rowCount={count}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    page={page}
                    pageSize={rowsPerPage}
                    onPageChange={handleChangePage}
                    onPageSizeChange={handleChangeRowsPerPage}
                /> */}
                <Button variant="contained" disabled={isExportingExcel}
                        endIcon={isExportingExcel ? <CircularProgress color="inherit" size={20}/> : <GetAppIcon/>}
                        onClick={exportTOExcel} style={{marginTop: 5}}>
                    Export Excel
                </Button>
            </Box>
        </MainCard>
    );
}

export default CampaignList;

const data = [
    {
        id: 1,
        user_id: 7196,
        scheduled_timestamp: "2023-10-30 08:00",
        created_timestamp: "2023-11-10 08:00",
        mask: 'ada test1',
        campaign_id: 4010348,
        campaign_name: 'test 2',
        creator: 'ADA Sri Lanka',
        account_type: "Postpaid",
        campaign_category: 'category 1',
        campaign_status: 3,
        campaign_type: 0,
        total_exp: 15,
        total_imp: 8
    },
    {
        id: 2,
        user_id: 7196,
        scheduled_timestamp: "2023-11-12 08:00",
        created_timestamp: "2023-12-10 08:00",
        mask: 'ada test',
        campaign_id: 4010348,
        campaign_name: 'test 2',
        creator: 'ADA Sri Lanka',
        campaign_category: 'category 2',
        campaign_status: 4,
        campaign_type: 1,
        total_exp: 9,
        total_imp: 14
    },
    {
        id: 3,
        user_id: 7196,
        scheduled_timestamp: "2023-10-30 08:00",
        created_timestamp: "2023-11-10 08:00",
        mask: 'adeona test',
        campaign_id: 4010348,
        campaign_name: 'Test Camp 4',
        creator: 'ADA Sri Lanka',
        account_type: "Postpaid",
        campaign_category: 'category 3',
        campaign_status: 2,
        campaign_type: 0,
        total_exp: 5,
        total_imp: 4
    },
];