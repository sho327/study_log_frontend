"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormTextarea } from "@/components/ui/formTextarea";

type Props = React.ComponentProps<typeof FormTextarea> & {
    name: string;
};

/**
 * react-hook-form 用の FormTextarea ラッパー
 */
export const FormTextareaContext = ({ name, ...props }: Props) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <FormTextarea
            error={errors[name]?.message as string}
            {...register(name)}
            {...props}
        />
    );
};