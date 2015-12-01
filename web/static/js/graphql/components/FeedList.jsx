import React from 'react';
import Relay from 'react-relay';

import NaviBar from './NaviBar.jsx'
import Feed from './Feed.jsx'

class FeedList extends React.Component {
  _onRefresh() {

  }

  renderFeeds() {
    return this.props.feedList.feeds.map(feed =>
      <Feed
        key={feed.id}
        feed={feed}
        onRefresh={this._onRefresh()}
      />
    );
  }

  render() {
    return (
      <div className="container">
        <NaviBar />
        {this.renderFeeds()}
      </div>
    );
  }
}

export default Relay.createContainer(FeedList, {
  fragments: {
    feedList: () => Relay.QL`
      fragment on RssFeedList {
        feeds {
          id,
          ${Feed.getFragment('feed')},
        }
      }
    `,
  },
});
