import 'babel-polyfill';

import Map from './components/Map';
import MapRoute from './routes/MapRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

ReactDOM.render(
  <Relay.Renderer
    environment={Relay.Store}
    Container={Map}
    queryConfig={new MapRoute()}
  />,
  document.getElementById('root')
);
