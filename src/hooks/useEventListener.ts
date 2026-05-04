import { useEffect, useRef } from 'react'

/**
 * useEventListener — イベント安全管理 (SSR対応版)
 * 
 * @args
 * - event: イベント名 (mousedown, click, keydown等)
 * - handler: 実行する関数
 * - element: 対象 (Window, Document, HTMLElement). 省略時は window.
 * 
 * @createdBy KatoShogo
 * @createdAt 2026/01/18
 */
export const useEventListener = <K extends keyof WindowEventMap>(
    event: K,
    handler: (event: WindowEventMap[K]) => void,
    element?: Window | Document | HTMLElement | null
) => {
    // 最新のハンドラを保持するための ref
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        // SSR環境では実行しない
        if (typeof window === "undefined") return;

        // element が指定されていない場合は window をデフォルトにする
        const targetElement: Window | Document | HTMLElement = element ?? window;

        if (!targetElement || !targetElement.addEventListener) return;

        const eventListener = (event: Event) => savedHandler.current(event as any);

        targetElement.addEventListener(event, eventListener);
        return () => targetElement.removeEventListener(event, eventListener);
    }, [event, element]);
}