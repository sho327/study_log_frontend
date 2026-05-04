import { useFormContext } from "react-hook-form";
import { FormSelect } from "@/components/ui/formSelect";

type Props = {
    name: string;
    label?: string;
    rightLabel?: React.ReactNode;
    helper?: React.ReactNode;
    sizeVariant?: "sm" | "md";
    children: React.ReactNode;
    className?: string;
};

/**
 * react-hook-form 用の FormSelect ラッパー
 */
export const FormSelectContext = ({ name, children, ...props }: Props) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <FormSelect
            error={errors[name]?.message as string}
            {...register(name)}
            {...props}
        >
            {children}
        </FormSelect>
    );
};
