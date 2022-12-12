import {useCallback, useLayoutEffect, useRef} from 'react'

/**
 * Hook for the mounted status of a component layout.
 * @return a function that its return value determines if the component is mounted or not.
 */
const useIsLayoutMounted = () => {
    const layoutEffectIsMounted = useRef(false)

    /**
     * As soon as the component mounts, sets the isMounted to true
     * As soon as the component un-mounts, sets the isMounted to false
     */
    useLayoutEffect(() => {
        layoutEffectIsMounted.current = true
        return () => {
            layoutEffectIsMounted.current = false
        }
    }, [])


    /**
     * Returns the isMounted flag of the current component layout
     */
    return useCallback(() => layoutEffectIsMounted.current, []);
}

export default useIsLayoutMounted;
