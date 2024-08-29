import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import {useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import SkeletonCustomerEngagementChart from '../../utils/ui-components/cards/skeleton/customer-engagement-chart';
import MainCard from "../../utils/ui-components/MainCard";
import {Grid, Typography} from "@mui/material";
import {gridSpacing} from "../../store/constants";

// chart data
import dayjs from 'dayjs';
import chartDataUser from "./user-chart-data/cusromer-engagemenet-line-chart-user";

CustomerEngagementChartUser.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.array,
};

function CustomerEngagementChartUser({isLoading, data}: any) {

    const theme = useTheme();
    const customization = useSelector((state: any) => state.customization);
    const [chartInfo, setChartInfo] = useState(data[0])
    const [operator, setOperator] = useState(0)

    const {navType} = customization;
    const {primary} = theme.palette.text;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    useEffect(() => {
        if (data[operator]?.data.length > 0) {
            setChartInfo(data[operator])
        } else {
            setChartInfo({
                ...data[operator],
                data: [{
                    date: (dayjs()).format('YYYY-MM-DD'),
                    cost: 0,
                    deliveryFailed: 0,
                    deliverySuccess: 0,
                    submitFailed: 0,
                    targetBase: 0,
                }]
            })
        }
    }, [operator, setOperator, data])

    useEffect(() => {
        let chartdata: any[]
        // do not load chart when loading
        if (!isLoading && chartInfo.data.length > 0) {
            chartdata = Object.keys(chartInfo.data[0]).map((key: any) => {
                if (key !== "date") {
                    return {
                        name: key,
                        data: chartInfo.data.map((item: any) => ({
                            x: item.date,
                            y: item[key]
                        }))
                    }
                }
            }).filter(Boolean);

            const newChartData = {
                ...chartDataUser,
                // ...chartData?.options,
                yaxis: {
                    labels: {
                        style: {
                            colors: [primary]
                        }
                    }
                },
                grid: {
                    borderColor: grey200
                },
                legend: {
                    labels: {
                        colors: grey500
                    }
                },
                series: chartdata
            };

            // // do not load chart when loading
            // if (!isLoading) {
            ApexCharts.exec(`line-chart`, 'updateOptions', newChartData);
        }
    }, [navType, primary, grey200, isLoading, grey500, chartInfo]);

    return (
        <>
            {isLoading ? (
                <SkeletonCustomerEngagementChart/>
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h3">Campaigns</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2">The total number of impressions within the
                                                date range. Here we have the overview of 30 days impression
                                                data.</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartDataUser(theme.palette.mode)} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
}

export default CustomerEngagementChartUser;