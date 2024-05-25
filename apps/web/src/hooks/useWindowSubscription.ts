import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useWindowSubscription = <T>(observable: Observable<T>) => {
    const [value, setValue] = useState<T | null>(null);

    useEffect(() => {
        const subscription = observable.subscribe(setValue);

        return () => {
            subscription.unsubscribe();
        };
    }, [observable]);

    return value;
};
