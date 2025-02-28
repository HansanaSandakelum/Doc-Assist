import React from 'react';
import {Card, CardContent, Grid, Skeleton} from "@mui/material";
import {gridSpacing} from "../../../../store/constants";

const SkeletonCustomerEngagementChart = () => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Skeleton variant="text"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Skeleton variant="rectangular" height={20}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Skeleton variant="rectangular" height={50} width={80}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton variant="rectangular" height={330}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SkeletonCustomerEngagementChart;