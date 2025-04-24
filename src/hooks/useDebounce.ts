import { useCallback, useRef, useEffect } from "react";

type FnToDebounce<T extends any[]> = (...args: T) => void;

export const useDebounce = <T extends any[]>(fn: FnToDebounce<T>, delay: number) => {
    let timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        return () => {
            if (timeoutRef) clearTimeout(timeoutRef.current)
        }
    }, [])

    return useCallback((...args: T) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(() => {
            fn(...args);
        }, delay);
    }, [fn, delay])
}