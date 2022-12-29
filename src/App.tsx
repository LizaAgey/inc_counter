import React, {useEffect, useState} from 'react';
import './App.css';
import Counter from './components/Counter/Counter';
import Settings from './components/Settings/Settings';
import {setValueToLS} from './utils/LocaStorageUtils/setValueToLS';
import {getValueFromLS} from './utils/LocaStorageUtils/getValueFromLS';
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom';

export type ErrorType = {
    isMaxError: boolean
    isMinError: boolean
    errorMessage: string
}

function App() {

    const [inputMaxValue, setInputMaxValue] = useState(0)
    const [inputMinValue, setInputMinValue] = useState(0)
    const [number, setNumber] = useState(0)
    const [error, setError] = useState<ErrorType>({
        isMaxError: false,
        isMinError: false,
        errorMessage: ''
    })
    const [isSettingsSaved, setSettingsSaved] = useState(false)

    const setupOnLoad = () => {
        applyMaxValueFromSettings()
        applyMinValueFromSettings()
    };
    useEffect(() => setupOnLoad(), [])
    useEffect(() => checkIfError(), [inputMaxValue])
    useEffect(() => checkIfError(), [inputMinValue])

    const lsMaxValueKey = 'maxValue'
    const lsMinValueKey = 'minValue'

    const applyMaxValueFromSettings = () => {
        getValueFromLS(lsMaxValueKey) ? setInputMaxValue(getValueFromLS(lsMaxValueKey)) : setInputMaxValue(0)
    };
    const applyMinValueFromSettings = () => {
        getValueFromLS(lsMinValueKey) ? setInputMinValue(getValueFromLS(lsMinValueKey)) : setInputMinValue(0)
        getValueFromLS(lsMinValueKey) ? setNumber(getValueFromLS(lsMinValueKey)) : setNumber(0)
    };
    const saveSettings = () => {
        setValueToLS(lsMaxValueKey, inputMaxValue)
        setValueToLS(lsMinValueKey, inputMinValue)
        applyMaxValueFromSettings()
        applyMinValueFromSettings()
        setSettingsSaved(true)

    };
    const checkIfError = () => {
        if (inputMinValue === inputMaxValue || inputMinValue > inputMaxValue) {
            setError({errorMessage: 'Please enter correct value', isMaxError: true, isMinError: true})
        } else if (inputMinValue < 0) {
            setError({
                errorMessage: 'Please enter correct value',
                isMaxError: inputMaxValue === inputMinValue || inputMaxValue < 0,
                isMinError: true
            })
        } else if (inputMaxValue < 0) {
            setError({
                errorMessage: 'Please enter correct value',
                isMinError: inputMaxValue === inputMinValue || inputMaxValue < 0,
                isMaxError: true
            })
        } else {
            setError({errorMessage: '', isMaxError: false, isMinError: false})
        }
    };

    return (
        <BrowserRouter>

            <div className={'App'}>

                <Routes >
                    <Route  path="/counter" element={<Counter
                        lsMaxValue={getValueFromLS(lsMaxValueKey)}
                        inputMinValue={inputMinValue}
                        number={number}
                        setNumber={setNumber}
                        error={error}
                        isSettingsSaved={isSettingsSaved}

                    />}/>
                    <Route path={"/"} element={<Settings
                        inputMaxValue={inputMaxValue}
                        inputMinValue={inputMinValue}
                        setInputMaxValue={setInputMaxValue}
                        setInputMinValue={setInputMinValue}
                        saveSettings={saveSettings}
                        error={error}
                        setError={setError}
                        setSettingsSaved={setSettingsSaved}
                    />}/>
                </Routes>



            </div>
        </BrowserRouter>
    );
}

export default App;
