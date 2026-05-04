import { useFormContext } from "react-hook-form";
import { FormInput } from "@/components/ui/formInput";

export const FormInputContext = ({ name, ...props }: { name: string; label: string }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <FormInput
            error={errors[name]?.message as string}
            {...register(name)}
            {...props}
        />
    );
};