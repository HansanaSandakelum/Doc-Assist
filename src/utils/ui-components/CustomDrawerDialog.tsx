import {Box, ClickAwayListener, Divider, Drawer, Typography} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import '../../App.css';

export type Anchor = 'top' | 'left' | 'bottom' | 'right';

const CustomDrawerDialog = (Component: any) => ({
                                                    width,
                                                    anchor,
                                                    open,
                                                    setOpen,
                                                    dialogTitle,
                                                    initialItem,
                                                    id,
                                                    fetchData,
                                                    initialData,
                                                    theme,
                                                    variant
                                                }: any) => {

    const handleClose = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event?.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setOpen({...open, left: false});
    };

    return <ClickAwayListener mouseEvent="onMouseDown"
                              touchEvent="onTouchStart"
                              onClickAway={() => {
                              }}>
        <Drawer
            variant={variant}
            anchor={anchor}
            open={open.left}
        >
            <Box
                sx={{width: width || 650}}
                role="presentation"
            >
                <Box>
                    <Box
                        style={{zIndex: 2, backgroundColor: theme.palette.secondary.light, position: 'sticky', top: 0}}>
                        <Typography variant="h2" style={{
                            padding: 20,
                            display: 'flex',
                            alignItems: 'center',
                            color: theme.palette.secondary.dark
                        }}>
                            {dialogTitle}
                        </Typography>
                        <span style={{
                            background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary[800]})`,
                            width: 650,
                            height: 3,
                            position: 'absolute',
                            inset: 0,
                            top: 0
                        }}
                        ></span>
                    </Box>
                    <Divider/>
                    <div style={{zIndex: 1, paddingBottom: 50, display: 'flex', overflowY: 'auto'}}>
                        <Component fetchData={fetchData}
                                   initialItem={initialItem} initialData={initialData} theme={theme} id={id}
                                   handleClose={handleClose}/>
                    </div>
                </Box>
            </Box>
        </Drawer>
    </ClickAwayListener>;
};

export default CustomDrawerDialog;

CustomDrawerDialog.propTypes = {
    width: PropTypes.number,
    anchor: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.any.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    initialItem: PropTypes.object,
    fetchData: PropTypes.func,
    initialData: PropTypes.any,
    theme: PropTypes.object.isRequired,
    variant: PropTypes.string
}