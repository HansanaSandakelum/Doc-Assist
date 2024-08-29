import React from "react";
import {useField, useFormikContext} from "formik";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const MonthYearPicker = ({name, ...otherProps}) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (evt) => {
        setFieldValue(name, evt);
    };

    const configDateTimePicker = {
        ...field,
        ...otherProps,
        onChange: handleChange,
    };

    const configTextField = {
        variant: "outlined",
        fullWidth: true,
        margin: "dense"
    };

    if (meta && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                views={['month', 'year']}
                {...configDateTimePicker}
                slotProps={{textField: {...configTextField}}}
            />
        </LocalizationProvider>
    );
};

export default MonthYearPicker;
