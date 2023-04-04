import { useCallback, useEffect, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    // хранит все булевые значения показывающие можно вызывать колбек или нельзя
    const throttleRef = useRef(false);
    //
    const timeoutRef = useRef<any>(null);

    const throttleCallback = useCallback((...args: any[]) => {
        if (!throttleRef.current) {
            callback(...args);
            throttleRef.current = true;

            timeoutRef.current = setTimeout(() => {
                throttleRef.current = false;
            }, delay);
        }
    }, [callback, delay]);

    useEffect(() => () => {
        clearTimeout(timeoutRef.current);
    }, []);

    return throttleCallback;
}
