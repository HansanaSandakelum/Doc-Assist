import {useState, useRef, useEffect} from 'react';

// material-ui
import {useTheme} from '@mui/material/styles';
import {
    Avatar, Badge,
    Box,
    Button,
    ButtonBase,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid, Link,
    Popper,
    Stack,
    TextField, Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';

// project imports
import MainCard from '../../../../utils/ui-components/MainCard';
import Transitions from '../../../../utils/ui-components/extended/Transitions';
import NotificationList from './NotificationList';

// notification status options
const status = [
    {
        value: 'all',
        label: 'All Notification'
    },
    {
        value: 'new',
        label: 'New'
    },
    {
        value: 'unread',
        label: 'Unread'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme: any = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef: any = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleChange = (event: any) => {
        if (event?.target.value) setValue(event?.target.value);
    };

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <Tooltip title="Notifications">
                    <Badge badgeContent={4} color="primary">
                        <ButtonBase sx={{borderRadius: '12px'}}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    transition: 'all .2s ease-in-out',
                                    background: theme.palette.secondary.light,
                                    color: theme.palette.secondary.dark,
                                    '&[aria-controls="menu-list-grow"],&:hover': {
                                        background: theme.palette.secondary.dark,
                                        color: theme.palette.secondary.light
                                    }
                                }}
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                                color="inherit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell"
                                     width="24"
                                     height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
                                    <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
                                </svg>
                            </Avatar>
                        </ButtonBase>
                    </Badge>
                </Tooltip>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({TransitionProps}: any) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MainCard border={false} elevation={16} content={false} boxShadow
                                      shadow={theme.shadows[16]}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between"
                                              sx={{pt: 2, px: 2}}>
                                            <Grid item>
                                                <Stack direction="row" spacing={2}>
                                                    <Typography variant="subtitle1">All Notification</Typography>
                                                    <Chip
                                                        size="small"
                                                        label="01"
                                                        sx={{
                                                            color: theme.palette.background.default,
                                                            bgcolor: theme.palette.warning.dark
                                                        }}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid item>
                                                <Typography component={Link} href="#" variant="subtitle2"
                                                            color="primary" underline="always">
                                                    Mark as all read
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box style={{
                                            height: '100%',
                                            maxHeight: 'calc(100vh - 205px)',
                                            overflowX: 'hidden'
                                        }}>
                                            <Grid container direction="column" spacing={2}>
                                                <Grid item xs={12}>
                                                    <Box sx={{px: 2, pt: 0.25}}>
                                                        <TextField
                                                            id="outlined-select-currency-native"
                                                            select
                                                            fullWidth
                                                            value={value}
                                                            onChange={handleChange}
                                                            SelectProps={{
                                                                native: true
                                                            }}
                                                        >
                                                            {status.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </TextField>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} p={0}>
                                                    <Divider sx={{my: 0}}/>
                                                </Grid>
                                            </Grid>
                                            <NotificationList/>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Divider/>
                                <CardActions sx={{p: 1.25, justifyContent: 'center'}}>
                                    <Button size="small" disableElevation>
                                        View All
                                    </Button>
                                </CardActions>
                            </MainCard>
                        </ClickAwayListener>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;
