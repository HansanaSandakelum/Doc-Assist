import React from 'react';
import {Card, CardContent, Grid, Skeleton} from "@mui/material";
import {gridSpacing} from "../../../../store/constants";

function SkeletonUserDetailsCard() {
    return (
        <Card>
            <CardContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Skeleton variant="rectangular" width={50} height={44}/>
                            </Grid>
                            <Grid item>
                                <Skeleton variant="rectangular" width={100} height={34}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Skeleton variant="rectangular" width={500} height={44}/>
                            </Grid>
                            <Grid item>
                                <Skeleton variant="circular" width={120} height={120}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction='row' spacing={2}>
                            <Grid item xs={3}>
                                <Skeleton variant="rectangular" width={'100%'} height={34}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Skeleton variant="rectangular"  width={'100%'} height={34}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default SkeletonUserDetailsCard;