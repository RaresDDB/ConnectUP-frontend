export const getStorageItem = <T>(
    key: string,
    type: 'string' | 'object' | 'number' | 'boolean' = 'string'
): T | null => {
    try {
        const item = localStorage.getItem(key);

        if (!item) return null;

        switch (type) {
            case 'object':
                return JSON.parse(item);
            case 'number':
                return Number(item) as T;
            case 'boolean':
                return (item === 'true') as T;
            default:
                return item as T;
        }
    } catch (error) {
        console.error(`Error getting item ${key} from localStorage:`, error);
        return null;
    }
};