import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToDo } from './pages/ToDo';
import { Box } from '@material-ui/core';
import './styles/styles.scss';

function App() {
    return (
        <Box className="app">
            <BrowserRouter>
                <Switch>
                    <Route path={'/'} exact component={ToDo} />
                </Switch>
            </BrowserRouter>
        </Box>
    );
}

export default App;