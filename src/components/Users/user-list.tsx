import {useTheme} from "@mui/material/styles";
import React, {useEffect, useMemo, useState} from "react";
import ViewEditDialog from "../../utils/ui-components/ViewEditDialog";
import {
    Avatar,
    Box,
    Button, Chip,
    Fab,
    Grid, IconButton,
    InputAdornment,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    TextField, Tooltip, Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MainCard from "../../utils/ui-components/MainCard";
import {gridSpacing} from "../../store/constants";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmptyResult from "../../utils/ui-components/EmptyResult";
import Spinner from "../../utils/ui-components/Spinner";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import AddUser from "./add-user";
import {currencyFormat, formatMobile, stringAvatar} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

export interface UserAddValues {
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
    username: string;
    password: string;
    confirmPassword: string;
};

function UserList() {

    const INITIAL_FORM_STATE: UserAddValues = {
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
        username: '',
        password: '',
        confirmPassword: ''
    };

    const theme: any = useTheme();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);
    const [masks, setMasks] = useState([])

    const [open, setOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [initialItem, setInitialItem] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        window.scrollTo(0, 0);
        // getAllMask();
        if (search === "") {
            // fetchApiUserList();
        } else {
            searchApiUserList()
        }
    }, [page, rowsPerPage]);

    useEffect(() => {
        // getAllMask();
    }, []);

    const fetchApiUserList = () => {
        setIsLoading(true);
        // ApiService.getApiList(page, rowsPerPage).then(
        //     response => {
        //         if (response.isSuccess) {
        //             setUsers(response.data.data.rows)
        //             setCount(response.data.data.count)
        //         }
        //         setIsLoading(false);
        //     }
        // );
    }

    const getAllMask = () => {
        // CampaignService.getConfigarationData().then(
        //     response => {
        //         if (response.isSuccess) {
        //             setMasks((response.data.data.maskList).map((item: any) => {
        //                 return {
        //                     label: item.mask_name,
        //                     value: item.id,
        //                     mask_type: item.mask_type
        //                 }
        //             }))
        //         }
        //     }
        // )
    }

    const searchApiUserList = () => {
        if (search !== "") {
            let formData = {
                userName: search
            }
            setIsLoading(true);
            // ApiService.searchApiUser(formData).then(
            //     response => {
            //         if (response.isSuccess) {
            //             setUsers(response.data.data.rows)
            //             setCount(response.data.data.count)
            //         }
            //         setIsLoading(false);
            //     }
            // );
        } else {
            fetchApiUserList();
        }
    }

    const handleClickOpen = (dialogTitle: string, formState: UserAddValues) => {
        setOpen(true);
        setDialogTitle(dialogTitle);
        setInitialItem(formState);
    };

    const dialog = useMemo(() => ViewEditDialog(AddUser)({
        open: open,
        setOpen: setOpen,
        dialogTitle: dialogTitle,
        initialItem: initialItem,
        fetchData: fetchApiUserList,
        theme: theme,
        maxWidth: "lg"
    }), [open]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Fab
                    color="primary"
                    sx={{position: "fixed", zIndex: 3, bottom: 16, right: 16}}
                    aria-label="add"
                    onClick={() => handleClickOpen(`Add User`, INITIAL_FORM_STATE)}
                >
                    <AddIcon/>
                </Fab>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item lg={10} md={10} sm={12} xs={12}>
                    <MainCard title="User List">
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={5} md={5} sm={12} xs={12}>
                                <TextField
                                    label="Search"
                                    placeholder="Search Api Users.."
                                    value={search}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSearch(event.target.value);
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{...theme.typography.customInput}}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    sx={{...theme.typography.customInput}}
                                    type="button"
                                    onClick={() => {
                                        setPage(0)
                                        searchApiUserList()
                                    }}
                                >
                                    View
                                </Button>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Contact</TableCell>
                                        <TableCell>Credit (BDT)</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users?.length > 0 && !isLoading && users.map((item: any) => (
                                        <TableRow hover key={item?.apiUserId}>
                                            <TableCell>
                                                <Avatar {...stringAvatar('Bent Dodds')} />
                                            </TableCell>
                                            <TableCell>{item?.id}</TableCell>
                                            <TableCell>{item?.userName}</TableCell>
                                            <TableCell>{item?.email}</TableCell>
                                            <TableCell>{item?.type}</TableCell>
                                            <TableCell>{formatMobile(item?.contact)}</TableCell>
                                            <TableCell>{currencyFormat(item?.contact, "", 2)}</TableCell>
                                            <TableCell align="center">{item?.activeStatus ?
                                                <Typography variant="overline"
                                                            color='success.main'>Active</Typography> :
                                                <Typography variant="overline"
                                                            color='error.main'>Inactive</Typography>}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Box>
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            aria-label="view"
                                                            color='primary'
                                                            onClick={() => {
                                                                navigate(`/user/view/1`);
                                                                // let INITIAL_FORM_STATE = {
                                                                //     userId: item?.apiUserId,
                                                                //     username: item?.userName,
                                                                //     password: item?.password,
                                                                //     maskList: item?.maskList.map((item: any) => ({
                                                                //         value: item.id,
                                                                //         label: item.mask_name,
                                                                //         mask_type: item.mask_type
                                                                //     })),
                                                                //     status: item?.activeStatus ? true : false,
                                                                //     confirmPassword: item?.password
                                                                // };
                                                                // // getAllMask();
                                                                // handleClickOpen(
                                                                //     `Edit API User ID: ${item.apiUserId}`,
                                                                //     INITIAL_FORM_STATE,
                                                                // );
                                                            }}
                                                        >
                                                            <VisibilityIcon
                                                                fontSize="inherit"
                                                                color="primary"
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {!users?.length && !isLoading ? <EmptyResult/> : isLoading ? <Box
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    minHeight: "40vh",
                                }}
                            >
                                <Spinner/>
                            </Box> : null}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableContainer>
                    </MainCard>
                </Grid>
            </Grid>
            {dialog}
        </Grid>
    );
}

export default UserList;