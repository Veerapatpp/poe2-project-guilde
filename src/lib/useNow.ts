import { useEffect, useState } from "react";

/** Current time, refreshed every `intervalMs` while `active` is true. */
export const useNow = (active: boolean, intervalMs = 250) => {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        if (!active) return;
        setNow(Date.now());
        const id = setInterval(() => setNow(Date.now()), intervalMs);
        return () => clearInterval(id);
    }, [active, intervalMs]);

    return now;
};
