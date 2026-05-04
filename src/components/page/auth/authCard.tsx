import React from "react";

interface AuthCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function AuthCard({ children, className = "" }: AuthCardProps) {
    return (
        <div className={`auth-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 ${className}`}>
            {children}
        </div>
    );
}
