import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import SkeletonStatusChart from "../../utils/ui-components/cards/skeleton/status-chart";
import MainCard from "../../utils/ui-components/MainCard";
import {Box, Chip, Grid, Tab, Tabs, Typography} from "@mui/material";
import {gridSpacing} from "../../store/constants";
import Chart from "react-apexcharts";
import {a11yProps, TabPanel} from "../../utils/cssStyles";
import React, {useState} from "react";
import {channelsPieChartDataUser} from "./user-chart-data/status-pie-chart-user";

StatusChartUser.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

function StatusChartUser({isLoading}: any) {

    const theme = useTheme();
    const customization = useSelector((state: any) => state.customization);

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonStatusChart/>
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Typography variant="h3">Operators</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2">The total number of Operator usage. Here we
                                                have 5 operators sms sent list and their ratio.</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display='flex' justifyContent='center'>
                                <Chart {...channelsPieChartDataUser(theme.palette.mode)} />
                            </Box>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
}

export default StatusChartUser;