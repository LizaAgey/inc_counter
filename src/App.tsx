import React, {useEffect, useState} from 'react';
import './App.css';
import Counter from './components/Counter/Counter';
import Settings from './components/Settings/Settings';

function App() {
    const [maxValue, setMaxValue] = useState(0)
    const [minValue, setMinValue] = useState(0)
    const [number, setNumber] = useState(0)

    useEffect(() => getMaxValueFromLS(), [])
    useEffect(() => getMinValueFromLS(), [])
    useEffect(() => setMinValueToLS(), [minValue])
    // useEffect(() => valuesSetter(lsMinValueKey, minValue), [minValue])

    const lsMaxValueKey = 'maxValue'
    const lsMinValueKey = 'minValue'

    const setMaxValueToLS = () => {
        localStorage.setItem(lsMaxValueKey, JSON.stringify(maxValue))
    };
    const setMinValueToLS = () => {
        localStorage.setItem(lsMinValueKey, JSON.stringify(minValue))
    };
    // const valuesSetter = (key: string, value: number) => {
    //     localStorage.setItem(key, JSON.stringify(value))
    // };

    const getMaxValueFromLS = () => {
        let valueAsStr = localStorage.getItem(lsMaxValueKey)
        if (valueAsStr) {
            let newValue = JSON.parse(valueAsStr)
            setMaxValue(newValue)
        }
    };
    const getMinValueFromLS = () => {
        let valueAsStr = localStorage.getItem(lsMinValueKey)
        if (valueAsStr) {
            let newValue = JSON.parse(valueAsStr)
            setMinValue(newValue)
            setNumber(newValue)
        }
    };

    const combinedValueGetter = () => {
        // valuesSetter(lsMaxValueKey, maxValue)
        setMaxValueToLS()
        getMaxValueFromLS()
        getMinValueFromLS()
    };

    return (
        <div className={'App'}>
            <Settings
                maxValue={maxValue}
                minValue={minValue}
                setMaxValue={setMaxValue}
                setMinValue={setMinValue}
                combinedValueGetter={combinedValueGetter}
            />
            <Counter
                maxValue={maxValue}
                minValue={minValue}
                number={number}
                setNumber={setNumber}
            />
        </div>
    );
}

export default App;
