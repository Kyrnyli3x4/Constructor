import { useState, useEffect } from 'react';

function useStorage(storage) {
    const [data, setData] = useState(storage.getData());

    useEffect(() => {
        const unsubscribe = storage.subscribe((newData) => {
            setData(newData);
        });
        return unsubscribe;
    }, [storage]);

    const updateData = (newData) => {
        storage.setData(newData);
    };

    return [data, updateData];
}

export default useStorage;
