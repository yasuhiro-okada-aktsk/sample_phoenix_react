import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSmartComponent } from '../../adrenaline';

import * as Actions from '../../actions';
import Feed from '../../components/feed_graphql/Feed.jsx'

class FeedListGraphqlPage extends Component {
  static propTypes = {
    feeds: PropTypes.array.isRequired,
  };

  static defaultProps = {
    feeds: [],
  };

  handleRefresh(id) {
  }

  renderFeed(feed) {
    //console.log("renderFeed");
    return (
      <Feed feed={feed} key={feed.id} onRefresh={this.handleRefresh.bind(this)} />
    );
  }

  render() {
    //console.log("render");
    const { feeds } = this.props;

    return (
      <div>
        { feeds.map(this.renderFeed.bind(this)) }
      </div>
    );
  }
}

export default createSmartComponent(FeedListGraphqlPage, {
  initialVariables: {
    count: 10,
  },
  query: `
    query Q($count: Int) {
      feeds(count: $count) {
        ${Feed.getFragment('feed')}
      }
    }
  `,
  /*
  mutations: {
    ...feedMutations,
  },
  */
});
