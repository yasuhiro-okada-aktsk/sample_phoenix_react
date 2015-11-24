import 'babel/polyfill';

import FeedList from './components/FeedList.jsx';
import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/api/v1/graphql')
);

ReactDOM.render(
  <Relay.RootContainer
    Component={FeedList}
    route={new AppHomeRoute()}
  />,
  document.getElementById('app')
);
