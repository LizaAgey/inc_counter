export const getValueFromLS = (key: string): number => {
    let valueAsStr = localStorage.getItem(key)
    let newValue
    if (valueAsStr) {
        newValue = JSON.parse(valueAsStr)
    }
    return newValue
};