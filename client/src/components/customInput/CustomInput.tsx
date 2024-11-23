import React from "react";
import { Field, FieldHookConfig, useField } from "formik";
import { Input } from "client/src/@/components/ui/input";
import { Label } from "client/src/@/components/ui/label";

const CustomInput = ({ label, name, placeholder, required, ...props }: any) => {
  const [field, meta] = useField({ ...props, name } as any);

  return (
    <>
      <Label aria-required={required} htmlFor={name}>
        {label}
      </Label>
      <Input {...field} {...props} placeholder={placeholder} />
    </>
  );
};

export default CustomInput;
