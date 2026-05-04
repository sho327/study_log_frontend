"use client";

import React from "react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    maxWidthClassName?: string;
    className?: string;
};

/**
 * 共通モーダルコンポーネント
 * DaisyUI の modal スタイルをベースにしており、ヘッダー・ボディ・フッターを任意に構成できます。
 */
export function Modal({
    open,
    onClose,
    title,
    children,
    footer,
    maxWidthClassName = "max-w-md",
    className,
}: ModalProps) {
    if (!open) return null;

    return (
        <div className="modal modal-open">
            <div className={`modal-box rounded-xl bg-white ${maxWidthClassName} ${className ?? ""}`}>
                {title && <h3 className="font-black text-neutral text-lg mb-4 border-b border-gray-200 pb-4">{title}</h3>}
                {children}
                {footer && <div className="modal-action">{footer}</div>}
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
}
