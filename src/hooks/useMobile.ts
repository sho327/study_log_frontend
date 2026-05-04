import * as React from 'react'

const MOBILE_BREAKPOINT = 768

/**
 * useMobile — モバイルかどうかを返す
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/18
 */
export function useMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }
        mql.addEventListener('change', onChange)
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        return () => mql.removeEventListener('change', onChange)
    }, [])

    return !!isMobile
}

// ============================================================================
// 使用例
// ============================================================================
// import { useIsMobile } from '@/hooks/useIsMobile';
// const isMobile = useIsMobile();