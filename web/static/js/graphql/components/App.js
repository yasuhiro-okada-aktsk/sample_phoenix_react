import React from 'react';
import Relay from 'react-relay';

//import CheckHidingSpotForTreasureMutation from '../mutations/CheckHidingSpotForTreasureMutation';

class App extends React.Component {

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    feeds: () => Relay.QL`
      fragment on RssFeed {
        id,
        title,
        subtitle,
        summary
      }
    `,
  },
});
