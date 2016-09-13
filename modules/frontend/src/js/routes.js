import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import Application from './components/Application';
import Map from './components/Map';
import MapsList from './components/MapsList';

import MapQueries from './queries/MapQueries';
import MapListQueries from './queries/MapListQueries';


export default (
    <Route
        path="/"
        component={Application}
    >
        <IndexRoute
            component={MapsList}
            queries={MapListQueries}
        />
        <Route
            path="map/:tilesetId"
            component={Map}
            queries={MapQueries}
        />
    </Route>
);