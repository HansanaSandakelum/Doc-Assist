import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import {Avatar, Box, Grid, Icon, Stack, Typography, useTheme} from '@mui/material';
import SkeletonUserItemsCard from "./skeleton/skeleton-user-items-card";
import MainCard from "../../../utils/ui-components/MainCard";

const CardWrapper = styled(MainCard)(({theme, color}: any) => ({
    backgroundColor: theme.palette[color].dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 110,
        height: 110,
        background: theme.palette[color][800],
        borderRadius: '50%',
        top: -45,
        right: -35,
        opacity: 0.8,
        [theme.breakpoints.down('sm')]: {
            top: -85,
            right: -100
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 110,
        height: 110,
        background: theme.palette[color][800],
        borderRadius: '50%',
        top: -85,
        right: -5,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -135,
            right: -50
        }
    }
}));

UserItemsListCard.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
    })).isRequired,
    color: PropTypes.string.isRequired,
};

function UserItemsListCard({isLoading, title, items, count, color}: any) {
    const theme: any = useTheme();
    return (
        <>
            {isLoading ? (
                <SkeletonUserItemsCard/>
            ) : (
                <CardWrapper color={color} border={false} content={false}>
                    <Box sx={{p: 2.25}}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="space-between">
                                    <Grid item sm={2}>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: theme.palette[color][800],
                                                mt: 1
                                            }}
                                        >
                                            <Typography variant='h2'
                                                        color={theme.palette.primary.light}>{count || 0}</Typography>
                                        </Avatar>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <Typography
                                            sx={{fontSize: '1.5rem', fontWeight: 600, mr: 1, mt: 1.75, mb: 0.75}}>
                                            {title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={1} columnSpacing={5}>
                                    {items?.map((item: any, index: number) => {
                                        return (<Grid item xs={items.length > 4 ? 5.5 : 11} key={index}>
                                            <Grid container justifyContent="center">
                                                <Grid item xs={6}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '1rem',
                                                            fontWeight: 550,
                                                            opacity: 0.5
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Stack alignItems={'flex-end'}>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '1rem',
                                                                fontWeight: 550,
                                                                opacity: 0.5
                                                            }}
                                                        >
                                                            {item.value || 0}
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>)
                                    })
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )
            }
        </>
    )
        ;
}

export default UserItemsListCard;