import { useCallback, useRef } from "react";

type fnToThrottling<T extends any[]> = (...args: T) => void;

export const useThrottling = <T extends any[]>(fn: fnToThrottling<T>, delay: number) => {
    const lastExecuted = useRef<number>(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    return useCallback((...args: T) => {
        const now = Date.now();
        const timeScinceLastExecution = now - lastExecuted.current;

        if (timeScinceLastExecution >= delay) {
            fn(...args)
            lastExecuted.current = now;
        } else {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)

            timeoutRef.current = setTimeout(() => {
                fn(...args);
                lastExecuted.current = Date.now()
            }, delay - timeScinceLastExecution)
        }

    }, [fn, delay])
}