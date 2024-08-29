import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import {Avatar, Box, Button, Grid, Stack, Typography} from "@mui/material";
import React, {useMemo, useState} from "react";
import UserStatus from "./user-status";
import MainCard from "../../../utils/ui-components/MainCard";
import SkeletonUserDetailsCard from "./skeleton/skeleton-user-details-card";
import ViewEditDialog from "../../../utils/ui-components/ViewEditDialog";
import EditUser from "../edit-user";
import {UserEditValues} from "./index";
import ChangePassword, {UpdatePasswordValues} from "../change-password";

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

UserDetailCard.propTypes = {
    fetchUser: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    lastLogin: PropTypes.string.isRequired,
    joinedAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    userProfilePic: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
};

function UserDetailCard({
                            fetchUser,
                            isLoading,
                            lastLogin,
                            joinedAt,
                            status,
                            userId,
                            name,
                            email,
                            username,
                            userProfilePic,
                            color,
                            theme
                        }: any) {

    const INITIAL_FORM_STATE: UpdatePasswordValues = {
        username: '',
        password: '',
        confirmPassword: ''
    };

    const [open, setOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [initialItem, setInitialItem] = useState(INITIAL_FORM_STATE);

    const handleClickOpen = (dialogTitle: string, formState: UpdatePasswordValues) => {
        setOpen(true);
        setDialogTitle(dialogTitle);
        setInitialItem(formState);
    };

    const dialog = useMemo(() => ViewEditDialog(ChangePassword)({
        open: open,
        setOpen: setOpen,
        dialogTitle: dialogTitle,
        initialItem: initialItem,
        fetchData: fetchUser,
        theme: theme,
        maxWidth: "md"
    }), [open]);

    return (
        <>
            {isLoading ? (
                <SkeletonUserDetailsCard/>
            ) : (
                <CardWrapper color={color} border={false} content={false}>
                    <Box sx={{p: 2.25}}>
                        <Grid container direction="row">
                            <Grid item lg={9} md={9} sm={8} xs={7} style={{
                                inlineSize: '100%',
                                overflowWrap: 'break-word'
                            }}>
                                <Typography
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 300,
                                        mr: 1,
                                        mt: 1.75,
                                    }}>
                                    ID: {userId}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '2.125rem',
                                        fontWeight: 500,
                                        mr: 1,
                                    }}>
                                    {name}
                                </Typography>
                                <Typography
                                    sx={{
                                        mb: 2,
                                    }}>
                                    {email}
                                </Typography>
                                <Button variant="outlined" onClick={() => {
                                    let formState = {
                                        username: username,
                                        password: '',
                                        confirmPassword: ''
                                    }

                                    handleClickOpen(`Change Password`, formState)
                                }}>Change Password</Button>
                                <Box height={'50%'} display='flex' alignItems='center' mb={7}>
                                    <Grid container>
                                        <Grid item lg={5} md={6} sm={6} xs={12}>
                                            Last Login <Typography
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 550,
                                                opacity: 0.5
                                            }}
                                        >
                                            {lastLogin}
                                        </Typography>
                                        </Grid>

                                        <Grid item lg={5} md={6} sm={6} xs={12}>
                                            Joining Date <Typography
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 550,
                                                opacity: 0.5
                                            }}
                                        >
                                            {joinedAt}
                                        </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item lg={3} md={3} sm={4} xs={5} style={{zIndex: 1,}}>
                                <UserStatus
                                    isLoading={isLoading}
                                    title={status}/>
                                <Box sx={{pt: 5}}>
                                    <Stack alignItems="flex-end" sx={{py: 0}}>
                                        <Avatar src={userProfilePic}
                                                sx={{width: 150, height: 150}}/>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                        {dialog}
                    </Box>
                </CardWrapper>
            )}
        </>
    );
}

export default UserDetailCard;