import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "neutral" | "outline" | "ghost";
}

export const Button = ({ children, isLoading, variant = "primary", className, ...props }: ButtonProps) => {
    const variantClass = {
        primary: "btn-primary text-primary-content border-none shadow-md shadow-primary/10",
        secondary: "btn-secondary text-secondary-content border-none shadow-md shadow-secondary/10",
        accent: "btn-accent text-accent-content border-none shadow-md shadow-accent/10",
        info: "btn-info text-info-content border-none shadow-md shadow-info/10",
        success: "btn-success text-success-content border-none shadow-md shadow-success/10",
        warning: "btn-warning text-warning-content border-none shadow-md shadow-warning/10",
        error: "btn-error text-error-content border-none shadow-md shadow-error/10",
        neutral: "btn-neutral text-neutral-content border-none shadow-md shadow-neutral/10",
        outline: "btn-outline border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 hover:text-neutral",
        ghost: "btn-ghost hover:text-neutral hover:bg-gray-200",
    };

    return (
        <button
            {...props}
            className={`btn normal-case font-bold transition-all ${variantClass[variant]} ${className || ""}`}
            disabled={isLoading || props.disabled}
        >
            {isLoading ? (
                <>
                    <span className="loading loading-spinner loading-xs"></span>
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    );
};
