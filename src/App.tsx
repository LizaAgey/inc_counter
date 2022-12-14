import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import Counter from './components/Counter/Counter';
import Settings from './components/Settings/Settings';
import {setValueToLS} from './utils/LocaStorageUtils/setValueToLS';
import {getValueFromLS} from './utils/LocaStorageUtils/getValueFromLS';

export type ErrorType = {
    isMaxError: boolean
    isMinError: boolean
    errorMessage: string
}
//--------NEW HARD LOGIC
type Rule = {
    errorMessage: string,
    hasError: boolean,
    validate: (val: number, dependsValue: NumberField | null) => boolean;
}
type NumberField = {
    index: number;
    value: number;
    rules: Array<Rule>;
    dependencyField: NumberField | null;
}
//--------NEW HARD LOGIC --------end

function App() {

    //--------NEW HARD LOGIC
    const dummyField: NumberField = {
        index: 1,
        value: 5,
        dependencyField: null,
        rules: []
    };
    const customField: NumberField = {
        index: 2,
        value: 0,
        dependencyField: dummyField,
        rules: [
            {
                hasError: false,
                errorMessage: 'Number cannot be negative',
                validate: (currentValue: number, _: NumberField | null) => currentValue < 0
            },
            {
                hasError: false,
                errorMessage: 'Number cannot be more than 5',
                validate: (currentValue: number, _: NumberField | null) => currentValue > 5
            },
            {
                hasError: false,
                errorMessage: 'Max value cannot be equal to dummy value',
                validate: (currentValue: number, dependsField: NumberField | null) => currentValue === dependsField?.value
            }
        ]
    };
    const [fields, setFields] = useState<Array<NumberField>>([dummyField, customField]);
    //--------NEW HARD LOGIC --------end


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

    //--------NEW HARD LOGIC --------
    const setNumberFieldValue = (event: ChangeEvent<HTMLInputElement>, field: NumberField) => {
        field.value = JSON.parse(event.currentTarget.value);
        field.rules.forEach(rule => {
            rule.hasError = rule.validate(field.value, field.dependencyField);
        })
        if (field.dependencyField) {
            field.dependencyField.rules.forEach(rule => {
                rule.hasError = rule.validate(field.value, field.dependencyField);
            });
        }
        setFields([...fields]);
    }
    //--------NEW HARD LOGIC --------end

    return (
        <>
            <div className={'App'}>
                <Settings
                    inputMaxValue={inputMaxValue}
                    inputMinValue={inputMinValue}
                    setInputMaxValue={setInputMaxValue}
                    setInputMinValue={setInputMinValue}
                    saveSettings={saveSettings}
                    error={error}
                    setError={setError}
                    setSettingsSaved={setSettingsSaved}
                />
                <Counter
                    lsMaxValue={getValueFromLS(lsMaxValueKey)}
                    inputMinValue={inputMinValue}
                    number={number}
                    setNumber={setNumber}
                    error={error}
                    isSettingsSaved={isSettingsSaved}

                />
            </div>

            {/*//--------NEW HARD LOGIC --------*/}
            <div>
                CUSTOMIELD
                <input type="number"
                       value={customField.value}
                       onChange={(event) => setNumberFieldValue(event, customField)}/>
                {customField.rules.map(rule => {
                    if (rule.hasError) {
                        return <div>{rule.errorMessage}</div>
                    }
                })}
                DUMMY
                <input type="number"
                       value={dummyField.value}
                       onChange={(event) => setNumberFieldValue(event, dummyField)}/>
                {dummyField.rules.map(rule => {
                    if (rule.hasError) {
                        return <div>{rule.errorMessage}</div>
                    }
                })}
            </div>
            {/*//--------NEW HARD LOGIC --------end*/}

        </>

    );
}

export default App;
