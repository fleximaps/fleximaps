import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import Application from './components/Application';
import Map from './components/Map';

import MapQueries from './queries/MapQueries';

export default (
    <Route
        path="/"
        component={Application}
    >
        <IndexRoute
            component={Map}
            queries={MapQueries}
        />
    </Route>
);