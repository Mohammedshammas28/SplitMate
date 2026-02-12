/**
 * Custom hook to handle localStorage persistence for a piece of state.
 */
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            if (saved !== null) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error(`Error loading ${key} from localStorage`, e);
        }
        return initialValue;
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error saving ${key} to localStorage`, e);
        }
    }, [key, value]);

    return [value, setValue];
}
