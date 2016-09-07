import React from 'react';
import Route from 'react-router/lib/Route';

import Map from './components/Map';
import MapQueries from './queries/MapQueries';

export default (
    <Route
        path="/"
        component={Map}
        queries={MapQueries}
    />
);