import React, {useEffect, useState} from 'react';
import './App.css';
import Counter from './components/Counter/Counter';
import Settings from './components/Settings/Settings';

function App() {
    const [maxValue, setMaxValue] = useState(0)
    const [minValue, setMinValue] = useState(0)
    const [number, setNumber] = useState(0)

    useEffect(() => getMaxValueFromLS(), [])
    useEffect(() => setMaxValueToLS(), [maxValue])

    useEffect(() => getMinValueFromLS(), [])
    useEffect(() => setMinValueToLS(), [minValue])

    const lsMaxValueKey = 'maxValue'
    const lsMinValueKey = 'minValue'

    const setMaxValueToLS = () => {
        localStorage.setItem(lsMaxValueKey, JSON.stringify(maxValue))
    };
    const getMaxValueFromLS = () => {
        let valueAsStr = localStorage.getItem(lsMaxValueKey)
        if (valueAsStr) {
            let newValue = JSON.parse(valueAsStr)
            setMaxValue(newValue)
        }
    };
    const setMinValueToLS = () => {
        localStorage.setItem(lsMinValueKey, JSON.stringify(minValue))
    };
    const getMinValueFromLS = () => {
        let valueAsStr = localStorage.getItem(lsMinValueKey)
        if (valueAsStr) {
            let newValue = JSON.parse(valueAsStr)
            setMinValue(newValue)
            setNumber(newValue)
        }
    };

    return (
        <div className={'App'}>
            <Settings
                maxValue={maxValue}
                minValue={minValue}
                setMaxValue={setMaxValue}
                setMinValue={setMinValue}
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
