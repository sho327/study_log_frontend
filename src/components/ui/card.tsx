import React from "react";

// Card
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            // className={`card bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group ${className}`}
            className={`card bg-white border border-gray-100 shadow-sm transition-all group ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

// CardHeader
export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`card-header p-6 border-b border-gray-100 ${className}`} {...props}>{children}</div>;
}

// CardBody
export function CardBody({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`card-body p-6 ${className}`} {...props}>{children}</div>;
}

// CardFooter
export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`card-footer p-6 border-t border-gray-100 ${className}`} {...props}>{children}</div>;
}