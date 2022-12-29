import React from 'react';
import './../../App.css';
import {ErrorType} from '../../App';
import {Button, Paper, Typography} from '@mui/material';

type CounterType = {
    lsMaxValue: number
    inputMinValue: number
    number: number
    setNumber: (number: number) => void
    error: ErrorType
    isSettingsSaved: boolean
}

const Counter: React.FC<CounterType> = ({
                                            lsMaxValue,
                                            inputMinValue,
                                            number,
                                            setNumber,
                                            error,
                                            isSettingsSaved
                                        }) => {
    const incNumber = () => {
        let newNumber = number + 1
        newNumber < lsMaxValue + 1 ? setNumber(newNumber) : setNumber(lsMaxValue)
    };
    const resetNumber = () => {
        setNumber(inputMinValue)
    };
    const isInputError = error.isMaxError || error.isMinError
    const isDisabled = number === lsMaxValue || error.isMaxError || error.isMinError || !isSettingsSaved
    const displaySection = () => {
        if (isInputError) {
            return error.errorMessage
        } else if (isSettingsSaved) {
            return number
        } else if (!isSettingsSaved) {
            return 'Please save settings'
        }
    }

    return (
        <Paper elevation={5} className={"section"}>
            <Typography variant={"h4"} sx={{m:"10px"}}>Counter</Typography>
            <Paper sx={{m:"25px"}}>
                <Typography variant={"h6"} sx={{m:"25px", width:"250px"}} align={"center"}>
                    {displaySection()}
                </Typography>
            </Paper>
            <div >
                <Button variant={"contained"} sx={{mr:"15px"}} onClick={incNumber} disabled={isDisabled}>Increment</Button>
                <Button variant={"contained"} onClick={resetNumber}>Reset</Button>
            </div>
        </Paper>
    );
};

export default Counter;