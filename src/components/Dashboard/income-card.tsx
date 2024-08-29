import React from 'react';
import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    Icon,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    styled,
    Typography,
    useTheme
} from '@mui/material';
import SkeletonIncomeCard from "../../utils/ui-components/cards/skeleton/income-card";
import MainCard from '../../utils/ui-components/MainCard';
import {currencyFormat} from "../../utils/utils";

const CardWrapper = styled(MainCard)(({theme, color}: any) => ({
    backgroundColor: theme.palette[color].dark,
    color: theme.palette[color].light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette[color][200]} -50.94%, ${theme.palette[color][800]} 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette[color][200]} -14.02%, ${theme.palette[color][800]} 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

IncomeCard.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    OptionIcon: PropTypes.node.isRequired
};

function IncomeCard({isLoading, title, count, color, OptionIcon}: any) {
    const theme: any = useTheme();
    return (
        <>
            {isLoading ? (
                <SkeletonIncomeCard/>
            ) : (
                <CardWrapper color={color} border={false} content={false}>
                    <Box sx={{p: 2}}>
                        <List sx={{py: 0}}>
                            <ListItem alignItems="center" disableGutters sx={{py: 0}}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette[color][800],
                                            color: theme.palette.primary.light
                                        }}
                                    >
                                        <Icon fontSize="inherit">{OptionIcon}</Icon>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography variant="h4" sx={{color: theme.palette.primary.light}}>
                                            {currencyFormat(count, "", 0)}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="subtitle2"
                                                    sx={{color: theme.palette.primary.light, mt: 0.25}}>
                                            {title}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
}

export default IncomeCard;