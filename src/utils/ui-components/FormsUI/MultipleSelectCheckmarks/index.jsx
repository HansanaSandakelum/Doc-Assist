import React from "react";
import {useField, useFormikContext} from "formik";
import {ListItemText, MenuItem, TextField} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const MultipleSelectCheckmarksWrapper = ({name, options, ...otherProps}) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = evt => {
        const {value} = evt.target;
        setFieldValue(name, typeof value === 'number' ? value.split(',') : value);
    }

    const configFormControl = {
        ...otherProps,
        variant: 'outlined',
        fullWidth: true,
        select: true,
        margin: 'dense',
        SelectProps: {
            multiple: true,
            value: field.value,
            onChange: handleChange,
            renderValue: (selected) => selected.map((value) => (
                options?.find((item) => item.value === value)?.label
            )).join(', ')
        }

    };

    if (meta && meta.touched && meta.error) {
        configFormControl.error = true;
        configFormControl.helperText = meta.error;
    }

    return (
        <TextField {...configFormControl}>
            {options.map((name, index) => (
                <MenuItem key={index} value={name.value}>
                    <Checkbox checked={field.value.indexOf(name.value) > -1}/>
                    <ListItemText primary={name.label}/>
                </MenuItem>
            ))}
        </TextField>
    );
};

export default MultipleSelectCheckmarksWrapper;
