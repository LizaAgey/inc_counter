import React, {ChangeEvent} from 'react';
import {ErrorType} from '../../App';
import {Button, Input, Paper, Typography} from '@mui/material';


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
        <Paper className={"section"} elevation={5}>
            <Typography variant={"h4"} sx={{m:"15px"}}>Settings</Typography>
            <Typography variant={"h6"} sx={{m:"15px"}}>Max value
                <Input
                    sx={{width:"45px", ml:"5px", pl:"15px"}}
                    type="number"
                    value={inputMaxValue}
                    onChange={maxValueHandler}
                    error={error.isMaxError}/>
            </Typography>
            <Typography variant={"h6"} sx={{m:"15px"}}>Min value
                <Input
                    sx={{width:"45px", ml:"5px", pl:"15px"}}
                    type="number"
                    value={inputMinValue}
                    onChange={minValueHandler}
                    error={error.isMinError}/>
            </Typography>
            <Button
                variant={"contained"}
                onClick={saveSettings}
                disabled={isDisabled}
            >Save</Button>
        </Paper>
    );
};

export default Settings;