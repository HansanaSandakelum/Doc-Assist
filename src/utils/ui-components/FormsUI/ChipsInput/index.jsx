import React from "react";
import {useField, useFormikContext} from "formik";
import {Autocomplete, Chip, TextField} from "@mui/material";

const ChipsInputWrapper = ({name, options, freeSolo, filterSelectedOptions, ...otherProps}) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);

    const configChipsInput = {
        ...otherProps,
        variant: "outlined",
        fullWidth: true,
    };

    if (meta && meta.error) {
        configChipsInput.error = true;
        configChipsInput.helperText = meta.error;
    }

    function handleChange(event, newValue) {
        setFieldValue(name, newValue);
    }

    return (
        <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option?.label}
            isOptionEqualToValue={(option, value) => {
                if (typeof option === "string")
                    return option === value;
                else
                    return option?.value === value?.value;
            }}
            value={[...field.value]}
            filterSelectedOptions={filterSelectedOptions}
            freeSolo={freeSolo}
            onChange={handleChange}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        key={options.length ? option.value : option}
                        tabIndex={-1}
                        label={options.length ? option.label : option}
                        color="primary"
                        {...getTagProps({index})}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField {...params} {...configChipsInput} margin="dense"/>
            )}
        />
    );
};

export default ChipsInputWrapper;