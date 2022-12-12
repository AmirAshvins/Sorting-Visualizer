import {useCallback, useEffect, useRef} from 'react'

/**
 * Hook for the mounted status of a component.
 * @return a function that its return value determines if the component is mounted or not.
 */
const useIsMounted = () => {
    const effectIsMounted = useRef(false)

    /**
     * As soon as the component mounts, sets the isMounted to true
     * As soon as the component un-mounts, sets the isMounted to false
     */
    useEffect(() => {
        effectIsMounted.current = true
        return () => {
            effectIsMounted.current = false
        }
    }, [])

    /**
     * Returns the isMounted flag of the current component
     */
    return useCallback(() => effectIsMounted.current, []);
}

export default useIsMounted;
