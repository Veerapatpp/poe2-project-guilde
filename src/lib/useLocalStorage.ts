import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

type Validator<T> = (value: unknown) => value is T;

function read<T>(key: string, fallback: T, validate?: Validator<T>): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (validate && !validate(parsed)) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be blocked (private mode) or full. Keep running with in-memory state.
  }
}

/**
 * useState that persists to localStorage and follows changes from other tabs.
 * Pass `validate` to reject corrupted data and fall back to `initialValue`.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validate?: Validator<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => read(key, initialValue, validate));
  const initialRef = useRef(initialValue);
  const validateRef = useRef(validate);

  useEffect(() => {
    write(key, value);
  }, [key, value]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) setValue(read(key, initialRef.current, validateRef.current));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  return [value, setValue];
}
