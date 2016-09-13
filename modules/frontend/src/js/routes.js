import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import Application from './components/containers/Application';
import MapPage from './components/containers/MapPage';
import MapsListPage from './components/containers/MapsListPage';

import MapQueries from './queries/MapQueries';
import MapListQueries from './queries/MapListQueries';


export default (
    <Route
        path="/"
        component={Application}
    >
        <IndexRoute
            component={MapsListPage}
            queries={MapListQueries}
        />
        <Route
            path="map/:tilesetId"
            component={MapPage}
            queries={MapQueries}
        />
    </Route>
);