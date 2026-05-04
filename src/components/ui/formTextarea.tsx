import React, { forwardRef } from "react";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    rightLabel?: React.ReactNode;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ label, error, rightLabel, className, ...props }, ref) => {
        return (
            <div className="w-full">
                <div className="flex justify-between items-center mb-2 px-1">
                    <label className="block text-[12px] font-black text-secondary uppercase tracking-[0.15em]">
                        {label}
                    </label>
                    {rightLabel}
                </div>
                <textarea
                    ref={ref}
                    {...props}
                    className={
                        `w-full input-minimal placeholder:text-secondary focus:!shadow-none ${error ? "!border-error focus:border-error" : ""} ${className}`
                    }
                />
                {error && (
                    <p className="mt-1 ml-1 text-[11px] font-bold text-error">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

FormTextarea.displayName = "FormTextarea";