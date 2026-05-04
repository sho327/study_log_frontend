"use client";

import { RefObject } from "react";
import { useEventListener } from "./useEventListener";

/**
 * useClickOutside — 指定した要素の外側でのクリックを検知
 * 
 * モーダルやドロップダウンメニューを、外側をクリックした時に閉じる
 * といった処理に使用されます。
 * 
 * @args
 * - ref: 対象となる要素のRef
 * - callback: 外側がクリックされた時に実行する関数
 * - enabled: 検知を有効にするかどうか（デフォルト：true）
 * 
 * @createdBy Shogo Kato
 * @createdAt 2026/01/18
 */
export function useClickOutside(
    ref: RefObject<HTMLElement | null>,
    callback: () => void,
    enabled: boolean = true
) {
    const handleClick = (e: Event) => {
        if (enabled && ref.current && !ref.current.contains(e.target as Node)) {
            callback();
        }
    };

    // SSR環境下でのエラーを防ぐため、document の存在を確認してから渡す
    const target = typeof document !== 'undefined' ? document : null;

    // useEventListener を活用して、document に対して mousedown イベントをリッスン
    useEventListener("mousedown", handleClick, target);
}
