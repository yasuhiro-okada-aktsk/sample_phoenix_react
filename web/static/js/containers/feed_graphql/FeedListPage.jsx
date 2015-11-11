import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../../actions';
import Feed from '../../components/feed_graphql/Feed.jsx'

class FeedListGraphqlPage extends Component {
  componentDidMount() {
    this.props.feedGet();
  }

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


FeedListGraphqlPage.propTypes = {
  feeds: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    feeds: state.feeds
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedListGraphqlPage);
