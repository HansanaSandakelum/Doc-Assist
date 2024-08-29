import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// material-ui
import {useTheme} from '@mui/material/styles';
import {
    Box,
    Button, ButtonGroup,
    Drawer,
    Fab, FormControl,
    Grid,
    IconButton, ToggleButton, ToggleButtonGroup,
    Tooltip, Typography,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// project imports
import {SET_MODE, SET_SYSTEM_MODE} from "../../redux/actions/actions";
import SettingsIcon from '@mui/icons-material/Settings';
import {gridSpacing} from "../../store/constants";
import SubCard from "../../utils/ui-components/cards/sub-card";
import AnimateButton from "../../utils/ui-components/AnimateButton";

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state: any) => state.customization);

    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);

    };

    // state - mode
    const [mode, setMode]: any = useState(customization.systemMode ? 2 : customization.mode == 'light' ? 1 : customization.mode == 'dark' ? 3 : undefined);
    const handleMode = (event: any, newValue: any) => {
        setMode(newValue);
        updateModeDispatch(newValue);
    };

    useEffect(() => {
        updateModeDispatch(mode);
    }, []);

    useEffect(() => {
        setMode(customization.systemMode ? 2 : customization.mode == 'light' ? 1 : customization.mode == 'dark' ? 3 : undefined);
    }, [customization]);

    const updateModeDispatch = (val: number) => {
        if (val == 2) {
            dispatch({type: SET_SYSTEM_MODE, systemMode: true});
            const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
            if (darkThemeMq.matches) {
                dispatch({type: SET_MODE, mode: 'dark'});
            } else {
                dispatch({type: SET_MODE, mode: 'light'});
            }
        } else if (val == 1) {
            dispatch({type: SET_SYSTEM_MODE, systemMode: false});
            dispatch({type: SET_MODE, mode: 'light'});
        } else if (val == 3) {
            dispatch({type: SET_SYSTEM_MODE, systemMode: false});
            dispatch({type: SET_MODE, mode: 'dark'});
        }
    }

    return (
        <>
            {/* toggle button */}
            <Tooltip title="Live Customize">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        top: '25%',
                        position: 'fixed',
                        right: 10,
                        zIndex: theme.zIndex.speedDial
                    }}
                >
                    <AnimateButton type="rotate">
                        <IconButton color="inherit" size="large" disableRipple>
                            <SettingsIcon/>
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}
            >
                <Grid container spacing={gridSpacing} sx={{p: 3}}>
                    <Grid item xs={12}>
                        {/* theme */}
                        <SubCard title="Theme">
                            <FormControl>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={mode}
                                    exclusive
                                    onChange={handleMode}
                                >
                                    <ToggleButton value={1}>
                                        <Box><LightModeIcon fontSize='small'/><Typography
                                            variant='body1'>Light</Typography></Box>
                                    </ToggleButton>
                                    <ToggleButton value={2}>
                                        <Box><SettingsBrightnessIcon fontSize='small'/><Typography
                                            variant='body1'>System</Typography></Box>
                                    </ToggleButton>
                                    <ToggleButton value={3}>
                                        <Box><DarkModeIcon fontSize='small'/><Typography
                                            variant='body1'>Dark</Typography></Box>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </FormControl>
                        </SubCard>
                    </Grid>
                </Grid>
            </Drawer>
        </>
    );
};

export default Customization;
