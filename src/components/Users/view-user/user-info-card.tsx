import React from 'react';
import PropTypes from "prop-types";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    styled,
    Typography,
    useTheme
} from '@mui/material';
import SkeletonUserInfoCard from "./skeleton/skeleton-user-info-card";
import MainCard from "../../../utils/ui-components/MainCard";

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

UserInfoCard.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

function UserInfoCard({isLoading, title, detail, color}: any) {
    const theme: any = useTheme();
    return (
        <>
            {isLoading ? (
                <SkeletonUserInfoCard/>
            ) : (
                <CardWrapper color={color} border={false} content={false}>
                    <Box sx={{p: 2}}>
                        <List sx={{py: 0}}>
                            <ListItem alignItems="center" disableGutters sx={{py: 0}}>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45,
                                        inlineSize: '100%',
                                        overflowWrap: 'break-word'
                                    }}
                                    primary={
                                        <Typography variant="h4" sx={{color: theme.palette.primary.light}}>
                                            {detail}
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

export default UserInfoCard;