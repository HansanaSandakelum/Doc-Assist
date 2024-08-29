import React from "react";
import { useField, useFormikContext } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";

const DatePickerWrapper = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    setFieldValue(name, evt);
  };

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    value: field.value && dayjs(moment.utc(new Date(field.value)).format("YYYY-MM-DD"), 'YYYY-MM-DD'),
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
        label="date picker template"
        {...configDateTimePicker}
        slotProps={{ textField: {...configTextField }}}
        // renderInput={(params) => <TextField {...params} {...configTextField} margin="dense" />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerWrapper;
