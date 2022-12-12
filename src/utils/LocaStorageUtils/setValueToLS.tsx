export const setValueToLS = (key: string, value: number) => {
    localStorage.setItem(key, JSON.stringify(value))
};