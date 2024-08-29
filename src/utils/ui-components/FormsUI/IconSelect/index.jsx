import React from "react";
import {useField, useFormikContext} from "formik";
import {Grid, MenuItem, TextField, Typography} from "@mui/material";
import Icon from "@mui/material/Icon";
import {gridSpacing} from "../../../../store/constants";

const IconSelectWrapper = ({name, options, customHandleChange, ...otherProps}) => {
        const {setFieldValue} = useFormikContext();
        const [field, meta] = useField(name);

        const handleChange = (evt) => {
            const {value} = evt.target;
            setFieldValue(name, value);
            customHandleChange(evt);
        };

        const configSelect = {
            ...field,
            ...otherProps,
            variant: "outlined",
            fullWidth: true,
            select: true,
            margin: "dense",
            onChange: handleChange,
        };

        if (meta && meta.touched && meta.error) {
            configSelect.error = true;
            configSelect.helperText = meta.error;
        }

        return (
            <TextField
                {...configSelect}
            >
                {options.map((item, pos) => {
                    return (
                        <MenuItem key={pos} value={item.value}>
                            <Grid container columnSpacing={gridSpacing} alignItems='center'>
                                <Grid item>
                                    <Icon>{item.icon}</Icon>
                                </Grid>
                                <Grid item>
                                    <Typography variant="overline">{item.label}</Typography>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    );
                })}
            </TextField>
        );
    }
;

export default IconSelectWrapper;
