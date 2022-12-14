import React, {ChangeEvent} from 'react';
import Button from '../Button/Button';
import styles from './Settings.module.css'
import {ErrorType} from '../../App';

type SettingsType = {
    inputMaxValue: number
    inputMinValue: number
    setInputMaxValue: (maxValue: number) => void
    setInputMinValue: (minValue: number) => void
    saveSettings: () => void
    error: ErrorType
    setError: (error: ErrorType) => void
    setSettingsSaved: (isSaved: boolean) => void
}

const Settings: React.FC<SettingsType> = ({
                                              inputMaxValue,
                                              inputMinValue,
                                              setInputMaxValue,
                                              setInputMinValue,
                                              saveSettings,
                                              error,
                                              setError,
                                              setSettingsSaved
                                          }) => {

    const maxValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputMaxValue(JSON.parse(event.currentTarget.value))
        if (!error.isMaxError && !error.isMinError) {
            setError({...error, errorMessage: 'Please save changes'})
        }
        setSettingsSaved(false)
    };

    const minValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputMinValue(JSON.parse(event.currentTarget.value))
        if (!error.isMaxError && !error.isMinError) {
            setError({...error, errorMessage: 'Please save changes'})
        }
        setSettingsSaved(false)
    };

    const isDisabled = error.isMinError || error.isMaxError

    return (
        <div className={styles.settings}>
            <h3>Settings</h3>
            <h5>Max value
                <input type="number" value={inputMaxValue} onChange={maxValueHandler}
                       className={error.isMaxError ? styles.error : ''}/>
            </h5>
            <h5>Min value
                <input type="number" value={inputMinValue} onChange={minValueHandler}
                       className={error.isMinError ? styles.error : ''}/>
            </h5>
            <Button
                name={'SAVE'}
                onClickCallback={saveSettings}
                disabled={isDisabled}
            />
        </div>
    );
};

export default Settings;