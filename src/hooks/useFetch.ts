import { useState, useEffect } from "react";

export const useFetch = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const result = await response.json() as T;
                setData(result);
            } catch (err) {
                if (!(err instanceof Error && err.name === 'AbortError')) {
                    setError(err instanceof Error ? err : new Error('Unknown error'))
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();

        return () => {
            controller.abort()
        }
    }, [url])

    return [data, isLoading, error]
};