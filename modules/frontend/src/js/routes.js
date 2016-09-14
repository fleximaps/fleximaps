import React from 'react';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import Application from './components/containers/Application';
import MapPage from './components/containers/MapPage';
import MapsListPage from './components/containers/MapsListPage';
import CreateMapContainer from './components/containers/CreateMapContainer';

import MapQueries from './queries/MapQueries';
import MapListQueries from './queries/MapListQueries';


export default (
    <Route
        path="/"
        component={Application}
    >
        <IndexRedirect to="/maps" />
        <Route
            path="maps"
            component={MapsListPage}
            queries={MapListQueries}
        >
            <Route
                path="create"
                component={CreateMapContainer}
            />
        </Route>
        <Route
            path="map/:tilesetId"
            component={MapPage}
            queries={MapQueries}
        />
    </Route>
);