import 'babel-polyfill';

import styles from './app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import Router from 'react-router/lib/Router';
import createHashHistory from 'history/lib/createHashHistory';

import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import useRelay from 'react-router-relay';

import routes from './routes';

const history = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
    <Router
        history={history}
        routes={routes}
        render={applyRouterMiddleware(useRelay)}
        environment={Relay.Store}
    />,
    document.getElementById('root')
);
