import React, {useEffect, useMemo, useState} from 'react';
import {Button, Fab, Grid, useTheme} from "@mui/material";
import {useParams} from "react-router-dom";
import moment from "moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {gridSpacing} from "../../../store/constants";
import UserDetailCard from "./user-details-card";
import UserInfoCard from "./user-info-card";
import EditIcon from '@mui/icons-material/Edit';
import ViewEditDialog from "../../../utils/ui-components/ViewEditDialog";
import EditUser from "../edit-user";
import {_setImage} from "../../../utils/utils";
import ChangePassword from "../change-password";
import VerificationCard from "../../Dashboard/verification-card";
import UserItemsListCard from "./user-items-list-card";

export interface UserEditValues {
    profileImage: object;
    representativeName: string;
    email: string;
    nid: string;
    vat: string;
    companyName: string;
    businessName: string;
    companyContact: string;
    companyLocation: string;
    industryType: string;
    accountType: string;
};

function ViewUser() {

    const INITIAL_FORM_STATE: UserEditValues = {
        profileImage: {},
        representativeName: '',
        email: '',
        nid: '',
        vat: '',
        companyName: '',
        businessName: '',
        companyContact: '',
        companyLocation: '',
        industryType: '',
        accountType: '',
    };

    let {id} = useParams();
    const theme: any = useTheme();
    const [isLoading, setLoading] = useState(true);
    const [buttonDisable, setButtonDisable] = useState({stop: false, pause: false, resume: false})

    const [totalBudget, setTotalBudget] = useState({
        external: [{
            id: 0,
            category: 0,
            value: 0
        }],
        internal: [{
            id: 0,
            category: 0,
            value: 0
        }],
        otherAllocation: [{
            id: 0,
            category: 0,
            value: 0
        }],
        assetAllocation: [{
            id: 0,
            category: 0,
            value: 0
        }],
    });

    const [estimate, setEstimate] = useState(0);
    const [revContributionOverheads, setRevContributionOverheads] = useState(150000);

    const [open, setOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [initialItem, setInitialItem] = useState(INITIAL_FORM_STATE);

    const userDetails = {
        profileImage: 'data:image/jpeg;base64,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',
        representativeName: 'M.D.K Perera',
        email: 'perrera@gamil.com',
        nid: '76924690809 B',
        vat: '4587WED',
        companyName: 'Company 1',
        businessName: 'Business 1',
        companyContact: '008801812598624',
        companyLocation: '32 Kallyanpur Road No 3, Dhaka 1207, Bangladesh',
        industryType: 'Financial Service',
        accountType: 'Admin',
        username: 'Kalum87',
    };

    useEffect(() => {
        checkStatus("Admin Approved");
        setLoading(false)
    }, []);

    const fetchUser = () => {
    }

    const handleClickOpen = (dialogTitle: string, formState: UserEditValues) => {
        setOpen(true);
        setDialogTitle(dialogTitle);
        setInitialItem(formState);
    };

    const dialog = useMemo(() => ViewEditDialog(EditUser)({
        open: open,
        setOpen: setOpen,
        dialogTitle: dialogTitle,
        initialItem: initialItem,
        fetchData: fetchUser,
        theme: theme,
        maxWidth: "lg"
    }), [open]);

    const dialogChangePassword = useMemo(() => ViewEditDialog(ChangePassword)({
        open: open,
        setOpen: setOpen,
        dialogTitle: dialogTitle,
        initialItem: initialItem,
        fetchData: fetchUser,
        theme: theme,
        maxWidth: "md"
    }), [open]);

    const calculateTotalBudget = (obj: any) => {
        let externalTotal = obj.external.reduce((accumulator: any, object: any) => {
            return accumulator + object.value;
        }, 0);

        let internalTotal = obj.internal.reduce((accumulator: any, object: any) => {
            return accumulator + object.value;
        }, 0);

        let otherAllocationTotal = obj.otherAllocation.reduce((accumulator: any, object: any) => {
            return accumulator + object.value;
        }, 0);

        let assetAllocationTotal = obj.assetAllocation.reduce((accumulator: any, object: any) => {
            return accumulator + object.value;
        }, 0);

        return externalTotal + internalTotal + otherAllocationTotal + assetAllocationTotal;
    }

    const checkStatus = (status: string) => {
        switch (status) {
            case "Approval Pending":
                setButtonDisable({stop: false, pause: false, resume: true});
                break;
            case "Admin Approved":
                setButtonDisable({stop: true, pause: true, resume: true});
                break;
            case "Rejected":
                setButtonDisable({stop: false, pause: true, resume: false});
                break;
            case "Removed":
                setButtonDisable({stop: true, pause: true, resume: true});
                break;
            default:
                setButtonDisable({stop: true, pause: true, resume: true});
                break;
        }
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Fab
                    color="primary"
                    sx={{position: "fixed", zIndex: 3, bottom: 16, right: 16}}
                    aria-label="edit"
                    onClick={() => {
                        _setImage(
                            userDetails.profileImage,
                            "user_profile_pic"
                        ).then((value => {
                            let formState = {
                                profileImage: value,
                                representativeName: userDetails.representativeName,
                                email: userDetails.email,
                                nid: userDetails.nid,
                                vat: userDetails.vat,
                                companyName: userDetails.companyName,
                                businessName: userDetails.businessName,
                                companyContact: userDetails.companyContact,
                                companyLocation: userDetails.companyLocation,
                                industryType: '1',
                                accountType: '2',
                            }

                            handleClickOpen(`Edit User`, formState)
                        }));
                    }}
                >
                    <EditIcon/>
                </Fab>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing} display='flex' justifyContent='center'
                              alignItems='center'>
                            <Grid item lg={8} md={8} sm={6} xs={12}>
                                <Button
                                    color="inherit"
                                    onClick={() => {
                                    }}
                                    startIcon={<ArrowBackIcon/>}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item lg={8} md={8} sm={12} xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
                                        <UserDetailCard fetchUser={fetchUser} isLoading={isLoading}
                                                        joinedAt={moment.utc(new Date('2023-01-22T06:00:30.384Z')).format("YYYY-MM-DD HH:mm:ss a")}
                                                        lastLogin={moment.utc(new Date('2024-03-18T13:00:30.384Z')).format("YYYY-MM-DD HH:mm:ss a")}
                                                        userId={Number(id)}
                                                        name={userDetails.representativeName}
                                                        email={userDetails.email}
                                                        username={userDetails.username}
                                                        status={'Admin Approved'}
                                                        userProfilePic={userDetails.profileImage}
                                                        color='secondary' theme={theme}/>
                                    </Grid>
                                    <Grid item lg={8} md={12} sm={12} xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={6} md={12} sm={12} xs={12}>
                                                <UserInfoCard
                                                    isLoading={isLoading}
                                                    title={'Company Name'}
                                                    detail={userDetails.companyName}
                                                    color={'primary'}/>
                                            </Grid>
                                            <Grid item lg={6} md={12} sm={12} xs={12}>
                                                <UserInfoCard
                                                    isLoading={isLoading}
                                                    title={'Business Name'}
                                                    detail={userDetails.businessName}
                                                    color={'primary'}/>
                                            </Grid>
                                            <Grid item lg={6} md={12} sm={12} xs={12}>
                                                <UserInfoCard
                                                    isLoading={isLoading}
                                                    title={'Company Contact'}
                                                    detail={userDetails.companyContact}
                                                    color={'primary'}/>
                                            </Grid>
                                            <Grid item lg={6} md={12} sm={12} xs={12}>
                                                <UserInfoCard
                                                    isLoading={isLoading}
                                                    title={'Company Location'}
                                                    detail={userDetails.companyLocation}
                                                    color={'primary'}/>
                                            </Grid>
                                            <Grid item lg={6} md={12} sm={12} xs={12}>
                                                <UserInfoCard
                                                    isLoading={isLoading}
                                                    title={'Industry Type'}
                                                    detail={userDetails.industryType}
                                                    color={'primary'}/>
                                            </Grid>
                                            <Grid item lg={6} md={12} sm={12} xs={12}>
                                            </Grid>
                                            <Grid item lg={6} md={12} sm={12} xs={12}>
                                                <UserInfoCard
                                                    isLoading={isLoading}
                                                    title={'NID'}
                                                    detail={userDetails.nid}
                                                    color={'orange'}/>
                                            </Grid>
                                            <Grid item lg={6} md={12} sm={12} xs={12}>
                                                <UserInfoCard
                                                    isLoading={isLoading}
                                                    title={'VAT'}
                                                    detail={userDetails.vat}
                                                    color={'orange'}/>
                                            </Grid>
                                            <Grid item lg={4} md={12} sm={12} xs={12}>
                                                <UserInfoCard
                                                    isLoading={isLoading}
                                                    title={'Account Type'}
                                                    detail={userDetails.accountType}
                                                    color={'red'}/>
                                            </Grid>
                                            <Grid item lg={4} md={12} sm={12} xs={12}>
                                                <UserInfoCard
                                                    isLoading={isLoading}
                                                    title={'Username'}
                                                    detail={userDetails.username}
                                                    color={'red'}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12} xs={12}>
                                        <UserItemsListCard
                                            isLoading={isLoading}
                                            title={'Balance'}
                                            count={250}
                                            items={[{
                                                label: 'Banblalink',
                                                value: 9
                                            }, {
                                                label: 'Robi/Airtel',
                                                value: 2
                                            }, {
                                                label: 'Teletalk',
                                                value: 4
                                            }, {
                                                label: 'Grameenphone',
                                                value: 13
                                            }]}
                                            color={'green'}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {dialog}
        </Grid>
    );
}

export default ViewUser;