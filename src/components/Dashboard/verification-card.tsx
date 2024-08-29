import React from 'react';
import PropTypes from 'prop-types';
import SkeletonVerificationCard from "../../utils/ui-components/cards/skeleton/verification-card";
import MainCard from '../../utils/ui-components/MainCard';
import {styled} from '@mui/material/styles';
import {Avatar, Box, Grid, Typography, useTheme} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {currencyFormat} from "../../utils/utils";

const CardWrapper = styled(MainCard)(({theme, color}: any) => ({
    backgroundColor: theme.palette[color].dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette[color][800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette[color][800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

VerificationCard.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    profit: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired
};

function VerificationCard({isLoading, title, count, profit, color}: any) {
    const theme: any = useTheme();
    return (
        <>
            {isLoading ? (
                <SkeletonVerificationCard/>
            ) : (
                <CardWrapper color={color} border={false} content={false}>
                    <Box sx={{p: 2.25}}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: theme.palette[color][800],
                                                mt: 1
                                            }}
                                        >
                                            <NotificationsActiveIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography
                                            sx={{fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75}}>
                                            {currencyFormat(count, "", 0)}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        {profit ? < Avatar
                                            sx={{
                                                cursor: 'pointer',
                                                opacity: 0.7,
                                                ...theme.typography.smallAvatar,
                                                backgroundColor: 'limegreen',
                                                color: theme.palette[color].dark
                                            }}
                                        >
                                            <ArrowUpwardIcon fontSize="inherit"
                                                             sx={{transform: 'rotate3d(1, 1, 1, 45deg)'}}/>
                                        </Avatar> : < Avatar
                                            sx={{
                                                cursor: 'pointer',
                                                opacity: 0.7,
                                                ...theme.typography.smallAvatar,
                                                backgroundColor: 'red',
                                                color: theme.palette[color].dark
                                            }}
                                        >
                                            <ArrowDownwardIcon fontSize="inherit"
                                                               sx={{transform: 'rotate3d(1, 1, 1, 45deg)'}}/>
                                        </Avatar>}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{mb: 1.25}}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 550,
                                        opacity: 0.5
                                    }}
                                >
                                    {title}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
}

export default VerificationCard;