import React, {useEffect, useState} from 'react';
import './App.css';
import Counter from './components/Counter/Counter';
import Settings from './components/Settings/Settings';
import {setValueToLS} from './utils/LocaStorageUtils/setValueToLS';
import {getValueFromLS} from './utils/LocaStorageUtils/getValueFromLS';

function App() {
    const [maxValue, setMaxValue] = useState(0)
    const [minValue, setMinValue] = useState(0)
    const [number, setNumber] = useState(0)

    const setupOnLoad = () => {
        applyMaxValueFromSettings()
        applyMinValueFromSettings()
    };

    useEffect(() => setupOnLoad(), [])

    const lsMaxValueKey = 'maxValue'
    const lsMinValueKey = 'minValue'

    const applyMaxValueFromSettings = () => {
        setMaxValue(getValueFromLS(lsMaxValueKey))
    };

    const applyMinValueFromSettings = () => {
        setMinValue(getValueFromLS(lsMinValueKey))
        setNumber(getValueFromLS(lsMinValueKey))
    };

    const saveSettings = () => {
        setValueToLS(lsMaxValueKey, maxValue)
        setValueToLS(lsMinValueKey, minValue)
        applyMaxValueFromSettings()
        applyMinValueFromSettings()
    };

    return (
        <div className={'App'}>
            <Settings
                maxValue={maxValue}
                minValue={minValue}
                setMaxValue={setMaxValue}
                setMinValue={setMinValue}
                saveSettings={saveSettings}
            />
            <Counter
                maxValue={getValueFromLS(lsMaxValueKey)}
                minValue={minValue}
                number={number}
                setNumber={setNumber}
            />
        </div>
    );
}

export default App;
