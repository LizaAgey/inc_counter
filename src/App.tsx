import React from 'react';
import './App.css';
import Counter from './components/Counter/Counter';


export type MessageType = {
    id: number,
    text: string
}

function App() {
    return (
        <div className={'App'}>
            <Counter/>
        </div>
    );
}

export default App;
