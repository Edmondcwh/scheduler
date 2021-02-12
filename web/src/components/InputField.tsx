import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";
import {useField} from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
}

export const InputField: React.FC<InputFieldProps> = ({label, size:_, ...props}) => {
    const [field, {error,}] = useField(props);
    return(
        <FormControl isInvalid={!!error}>
            <FormLabel color={"#4F4A41"} htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name} borderColor={"#364b4b"} color={"#364b4b"}  />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}