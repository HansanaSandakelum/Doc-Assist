import React from 'react';
import {useField, useFormikContext} from 'formik';
import {MenuItem, TextField} from '@mui/material';

const SelectWrapper = ({
                           name,
                           options,
                           customHandleChange,
                           ...otherProps
                       }) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = evt => {
        const {value} = evt.target;
        customHandleChange(evt);
        setFieldValue(name, value);
    };

    const configSelect = {
        ...field,
        ...otherProps,
        variant: 'outlined',
        fullWidth: true,
        select: true,
        margin: "dense",
        onChange: handleChange
    };

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField {...configSelect}>
            {options.map((item, pos) => {
                return (
                    <MenuItem key={pos} disabled={item.disabled} value={item.value}>
                        {item.label}
                    </MenuItem>
                )
            })}
        </TextField>
    );
};

export default SelectWrapper;