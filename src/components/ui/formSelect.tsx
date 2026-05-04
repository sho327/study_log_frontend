import React, { forwardRef } from "react";

type SizeVariant = "sm" | "md";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    rightLabel?: React.ReactNode;
    helper?: React.ReactNode;
    error?: string;
    sizeVariant?: SizeVariant;
}

/**
 * 共通セレクトコンポーネント
 * FormInput と揃えたラベル／ヘルパー／エラー表示と、サイズバリエーションを提供。
 */
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
    (
        {
            label,
            rightLabel,
            helper,
            error,
            sizeVariant = "md",
            className = "",
            children,
            ...props
        },
        ref
    ) => {
        const sizeClass = sizeVariant === "sm" ? "select-sm text-xs" : "select-md text-sm";
        const errorClass = error ? "!border-error focus:border-error" : "";

        return (
            <div className="w-full">
                {(label || rightLabel) && (
                    <div className="flex justify-between items-center mb-2 px-1">
                        {label && (
                            <label className="block text-[12px] font-black text-secondary uppercase tracking-[0.15em]">
                                {label}
                            </label>
                        )}
                        {rightLabel}
                    </div>
                )}

                <select
                    ref={ref}
                    {...props}
                    className={`select select-bordered font-bold text-neutral w-full bg-white focus:!shadow-none ${sizeClass} ${errorClass} ${className}`}
                >
                    {children}
                </select>

                {helper && (
                    <p className="mt-1 ml-1 text-[11px] font-bold text-secondary">
                        {helper}
                    </p>
                )}

                {error && (
                    <p className="mt-1 ml-1 text-[11px] font-bold text-error">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

FormSelect.displayName = "FormSelect";
