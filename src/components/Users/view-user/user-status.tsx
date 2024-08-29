import {
    Box, Chip,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import SkeletonIncomeCard from "../../../utils/ui-components/cards/skeleton/income-card";

UserStatus.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

function UserStatus({isLoading, title}: any) {
    const theme: any = useTheme();
    const [statusColor, setStatusColor] = useState()

    useEffect(() => {
        color(title);
    }, [title])

    const color = (title: string) => {
        switch (title) {
            case "Approval Pending":
                setStatusColor(theme.palette["primary"].main);
                break;
            case "Admin Approved":
                setStatusColor(theme.palette["success"].main);
                break;
            case "Rejected":
                setStatusColor(theme.palette["orange"].main);
                break;
            case "Removed":
                setStatusColor(theme.palette["error"].main);
                break;
            default:
                setStatusColor(theme.palette["grey600"]);
                break;
        }
    }

    return (
        <>
            {isLoading ? (
                <SkeletonIncomeCard/>
            ) : (
                <Box sx={{p: 0}}>
                    <Stack alignItems="flex-end" sx={{py: 0}}>
                        <Chip label={title}
                              sx={{background: statusColor, color: theme.palette["secondary"], fontWeight: 'bold'}}/>
                    </Stack>
                </Box>
            )}
        </>
    );
}

export default UserStatus;