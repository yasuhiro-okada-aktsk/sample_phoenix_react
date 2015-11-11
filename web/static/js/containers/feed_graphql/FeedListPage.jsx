import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSmartComponent } from '../../adrenaline';

import * as Actions from '../../actions';
import Feed from '../../components/feed_graphql/Feed.jsx'

class FeedListGraphqlPage extends Component {
  static propTypes = {
    feeds: PropTypes.array.isRequired
  };

  handleRefresh(id) {
  }

  renderFeed(feed) {
    return (
      <Feed feed={feed} key={feed.id} onRefresh={::this.handleRefresh} />
    );
  }

  render() {
    return (
      <div>
        { this.props.feeds.map(::this.renderFeed) }
      </div>
    );
  }
}

export default createSmartComponent(FeedListGraphqlPage, {
  initialVariables: {
    count: 10,
  },
  query: `
    query Feeds($count) {
      feedList {
        feeds(count: $count) {
          id,
          title
        }
      }
    }
  `,
  /*
  mutations: {
    ...feedMutations,
  },
  */
});
