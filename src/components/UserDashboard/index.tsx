import React, {useEffect, useState} from 'react';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {gridSpacing} from "../../store/constants";
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import DatePicker from '../../utils/ui-components/FormsUI/DatePicker';
import {useTheme} from "@mui/material/styles";
import dayjs from 'dayjs';
import {DashboardService} from '../../assets/_services/dashboard-service';
import SkeletonIncomeCard from '../../utils/ui-components/cards/skeleton/income-card';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PauseIcon from '@mui/icons-material/Pause';
import DoneAllIcon from '@mui/icons-material/DoneAll';
// import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import StopIcon from '@mui/icons-material/Stop';
import ApprovalIcon from '@mui/icons-material/Approval';
import {currencyFormat, getTimeWelcome} from "../../utils/utils";
import {getState} from "../../redux/actions/actions";
import {connect} from "react-redux";
import CustomerEngagementChartUser from "./customer-engagement-chart";
import StatusChartUser from "./status-chart";
import IncomeCardUser from "./income-card";

const INITIAL_FORM_STATE = {
    fromDate: dayjs().subtract(30, 'day'),
    toDate: dayjs(),
};

const FORM_VALIDATION = Yup.object().shape({
    fromDate: Yup.date().nullable().required("Please Select a Date").typeError("please enter a valid date"),
    toDate: Yup.date().nullable().required("Please Select a Date").typeError("please enter a valid date"),
});

function UserDashboard(props: any) {
    const {
        login
    } = props;

    const theme: any = useTheme();
    const [isLoading, setLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState({
        campaignTypeSummary: [],
        operatorSummary: [],
        connectionSummaryResponse: [{id: 0, lable: "", value: 0, data: []}]
    })
    const [dateRange, setDateRange] = useState(INITIAL_FORM_STATE)
    const [isBtnLoading, setIsBtnloading] = useState(false)


    useEffect(() => {
        // getDashboardData();
    }, [dateRange]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getDashboardData = () => {
        setLoading(true);
        setIsBtnloading(true)
        const formData = {
            fromDate: dateRange.fromDate.format('YYYY-MM-DD'),
            toDate: dateRange.toDate.format('YYYY-MM-DD')
        }
        DashboardService.getDashboardData(formData).then(
            response => {
                if (response.isSuccess) {
                    // setDashboardData(response.data.data)
                    setDashboardData({
                        campaignTypeSummary: response.data.data.campaignTypeSummary,
                        operatorSummary: response.data.data.operatorSummary,
                        connectionSummaryResponse: response.data.data.connectionSummaryResponse.map((item: any, index: number) => {
                            return {
                                id: item.id,
                                lable: item.operatorName,
                                value: index,
                                data: item.data.map((dataItem: any) => {
                                    return {
                                        date: dataItem.date,
                                        cost: parseInt(dataItem.cost),
                                        targetBase: parseInt(dataItem.targetBase),
                                        deliveryFailed: parseInt(dataItem.deliveryFailed),
                                        deliverySuccess: parseInt(dataItem.deliverySuccess),
                                        submitFailed: parseInt(dataItem.submitFailed),
                                    }
                                })
                            }
                        }),
                    })
                    setLoading(false);
                } else {
                    setLoading(false);
                }
                setIsBtnloading(false)
            }
        )
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Formik
                    initialValues={{
                        ...INITIAL_FORM_STATE,
                    }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={(values) => {
                        setDateRange({
                            fromDate: values.fromDate,
                            toDate: values.toDate
                        })
                    }}
                >
                    {({values}) => (  //, dirty, isSubmitting
                        <Form>
                            <Grid container spacing={gridSpacing}>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <DatePicker
                                        name="fromDate"
                                        label="From Date"
                                        placeholder="From Date"
                                        maxDate={values.toDate || dayjs()}
                                        sx={{...theme.typography.customInput}}
                                    />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <DatePicker
                                        name="toDate"
                                        label="To Date"
                                        placeholder="To Date"
                                        maxDate={dayjs()}
                                        minDate={values.fromDate}
                                        sx={{...theme.typography.customInput}}
                                    />
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12}>
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
                                <Grid item lg={4} md={4} sm={12} xs={12} textAlign='end'>
                                    <Typography color={theme.palette.info.main} variant="h4" gutterBottom>
                                        {getTimeWelcome()}
                                    </Typography>
                                    <Typography color="primary" variant="h2" gutterBottom>
                                        <b>Hi {getState(login?.authData)?.firstName}</b>
                                    </Typography>
                                    <Typography color="secondary" gutterBottom>
                                        All systems are running smoothly!
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        {!isLoading ?
                                            <><Grid item lg={2} md={2} sm={12} xs={12}>
                                                <IncomeCardUser
                                                    isLoading={isLoading}
                                                    title={'Live Campaigns'}
                                                    count={currencyFormat(4, "", 0)}
                                                    color={'orange'}
                                                    OptionIcon={<LiveTvIcon/>}/>
                                            </Grid>
                                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                                    <IncomeCardUser
                                                        isLoading={isLoading}
                                                        title={'Paused'}
                                                        count={currencyFormat(10, "", 0)}
                                                        color={'red'}
                                                        OptionIcon={<PauseIcon/>}/>
                                                </Grid>
                                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                                    <IncomeCardUser
                                                        isLoading={isLoading}
                                                        title={'Completed'}
                                                        count={currencyFormat(15, "", 0)}
                                                        color={'blue'}
                                                        OptionIcon={<DoneAllIcon/>}/>
                                                </Grid>
                                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                                    <IncomeCardUser
                                                        isLoading={isLoading}
                                                        title={'Stopped'}
                                                        count={currencyFormat(18, "", 0)}
                                                        color={'primary'}
                                                        OptionIcon={<StopIcon/>}/>
                                                </Grid>
                                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                                    <IncomeCardUser
                                                        isLoading={isLoading}
                                                        title={'Pending Approval'}
                                                        count={currencyFormat(2, "", 0)}
                                                        color={'secondary'}
                                                        OptionIcon={<ApprovalIcon/>}/>
                                                </Grid>
                                            </>
                                            :
                                            <>
                                                {
                                                    new Array(2).fill(null).map((_, index) => {
                                                        return (
                                                            <Grid item sm={6} xs={12} md={6} lg={12} key={index}>
                                                                <SkeletonIncomeCard/>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item lg={8} md={12} sm={12} xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12}>
                                            <CustomerEngagementChartUser isLoading={isLoading}
                                                                         data={dashboardData.connectionSummaryResponse}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item lg={4} md={12} sm={12} xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12}>
                                            <StatusChartUser isLoading={isLoading}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Grid>
            <Grid item xs={12}>
                {/* <CampaignSummary/> */}
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state: any) => ({
    login: state.auth,
})

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps)(UserDashboard);