import { createContext } from 'react';

export const StorageContext = createContext(null);

export class Storage {
    constructor(initialData = null) {
        this.data = initialData;
        this.listeners = [];
    }

    getData() {
        return this.data;
    }

    setData(newData) {
        this.data = newData;
        this.notify();
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.data));
    }
}

