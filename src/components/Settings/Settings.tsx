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

}

const Settings: React.FC<SettingsType> = ({
                                              inputMaxValue,
                                              inputMinValue,
                                              setInputMaxValue,
                                              setInputMinValue,
                                              saveSettings,
                                              error
                                          }) => {

    const maxValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputMaxValue(JSON.parse(event.currentTarget.value))
    };
    const minValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputMinValue(JSON.parse(event.currentTarget.value))
    };


    return (
        <div>
            <h3>Settings</h3>
            <h5>max value
                <input type="number" value={inputMaxValue} onChange={maxValueHandler}
                       className={error.isMaxError ? styles.error : ''}/>
            </h5>
            <h5>start value
                <input type="number" value={inputMinValue} onChange={minValueHandler}
                       className={error.isMinError ? styles.error : ''}/>
            </h5>
            <Button
                name={'SET'}
                onClickCallback={saveSettings}
            />
        </div>
    );
};

export default Settings;