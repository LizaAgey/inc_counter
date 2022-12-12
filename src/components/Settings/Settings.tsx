import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '../Button/Button';

type SettingsType = {
    maxValue: number
    minValue: number
    setMaxValue: (maxValue: number) => void
    setMinValue: (minValue: number) => void
}

const Settings: React.FC<SettingsType> = ({
                                              maxValue,
                                              minValue,
                                              setMaxValue,
                                              setMinValue
                                          }) => {

    const maxValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(JSON.parse(event.currentTarget.value))
    };

    const minValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setMinValue(JSON.parse(event.currentTarget.value))
    };


    return (
        <div>
            <h3>Counter Settings</h3>
            <h5>max value <input type="number" value={maxValue} onChange={maxValueHandler}/></h5>
            <h5>start value <input type="number" value={minValue} onChange={minValueHandler}/></h5>
            <Button
                name={'set'}
                onClickCallback={()=>{}}
            />
        </div>
    );
};

export default Settings;