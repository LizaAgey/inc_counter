import React, {ChangeEvent} from 'react';
import Button from '../Button/Button';

type SettingsType = {
    maxValue: number
    minValue: number
    setMaxValue: (maxValue: number) => void
    setMinValue: (minValue: number) => void
    saveSettings: () => void
}

const Settings: React.FC<SettingsType> = ({
                                              maxValue,
                                              minValue,
                                              setMaxValue,
                                              setMinValue,
                                              saveSettings
                                          }) => {

    const maxValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(JSON.parse(event.currentTarget.value))
    };

    const minValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setMinValue(JSON.parse(event.currentTarget.value))
    };

    return (
        <div>
            <h3>Settings</h3>
            <h5>max value
                <input type="number" value={maxValue} onChange={maxValueHandler}/>
            </h5>
            <h5>start value
                <input type="number" value={minValue} onChange={minValueHandler}/>
            </h5>
            <Button
                name={'SET'}
                onClickCallback={saveSettings}
            />
        </div>
    );
};

export default Settings;