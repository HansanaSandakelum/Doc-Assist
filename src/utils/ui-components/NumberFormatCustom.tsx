import * as React from "react";
import {forwardRef} from "react";
import NumberFormat, {InputAttributes} from "react-number-format";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export const NumberFormatCustom = forwardRef<
    NumberFormat<InputAttributes>,
    CustomProps
>(function NumberFormatCustom(props, ref) {
    const {onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values: any) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            // isNumericString
        />
    );
});