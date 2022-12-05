import React, {useMemo} from 'react';
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {CssVarsProvider} from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import {Provider as ReduxProvider} from 'react-redux';
import ReduxStore from "./redux";
import theme from "./theme";
import {History} from '@remix-run/router';
import ApplicationViews from "./views";


const Application = () => {
    const history = useMemo(() => createBrowserHistory() as unknown as History, [])

    return (
        <CssVarsProvider
            theme={theme}
            defaultMode={'dark'}
        >
            <CssBaseline/>
            <HistoryRouter history={history}>
                <ReduxProvider store={ReduxStore}>
                    <ApplicationViews/>
                </ReduxProvider>
            </HistoryRouter>
        </CssVarsProvider>
    );
}

export default Application;
