// import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

// import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
// import {useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import SkeletonCustomerEngagementChart from '../../utils/ui-components/cards/skeleton/customer-engagement-chart';
import MainCard from "../../utils/ui-components/MainCard";
import { Grid, Typography} from "@mui/material";
import {gridSpacing} from "../../store/constants";

// chart data
import chartData from './chart-data/customer-engagement-line-chart';
// import {currencyFormat} from "../../utils/utils";
// import dayjs from 'dayjs';

CustomerEngagementChart.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.array,
};

function CustomerEngagementChart({isLoading}: any) {

    const theme = useTheme();
    // const customization = useSelector((state: any) => state.customization);

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
                            <Chart {...chartData(theme.palette.mode)} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
}

export default CustomerEngagementChart;