import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ToDo from './pages/ToDo';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact component={ToDo} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
