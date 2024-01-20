import React, { MutableRefObject, RefObject } from 'react';
import { Ref, useRef } from 'react';

/**
 * @function useClickOutside
 * @param {any} elementRef
 * @param {any} callback
 * @returns {any}
 * @description When you want to call a function when clicked outside the element Ex: Modal PopUp
 * Use this function rather than above when you are sure you wont be changing the callback.
 * You then don't need to pass the callback with useCallback for performance.
 */
export function useClickOutside<T extends HTMLElement, U extends Function>(elementRef: React.Ref<T>, callback: U) {
    const callbackRef = useRef(callback);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            event.preventDefault();
            if (
                elementRef &&
                'current' in elementRef &&
                elementRef.current &&
                !elementRef.current.contains(event.target as Node)
            ) {
                // Call Callback only if event happens outside element or descendent elements
                callbackRef.current();
            }
            return;
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [elementRef, callback]);
}
