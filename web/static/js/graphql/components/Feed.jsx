import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

class Feed extends Component {
  static propTypes = {
    feed: PropTypes.object.isRequired,
    //onRefresh: PropTypes.func.isRequired
  };

  handleRefresh(e) {
    e.preventDefault();
    this.props.onRefresh(this.props.feed.id);
  }

  render() {
    return (
      <div className="feed">
        <h2>
          {this.props.feed.title}
        </h2>

        <div>
          {this.props.feed.subtitle}
        </div>
        <div>
          {this.props.feed.summary}
        </div>
        <div>
          <button onClick={this.handleRefresh.bind(this)} className="btn btn-default">
            <span className="glyphicon glyphicon-refresh" /> Refresh</button>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Feed, {
  fragments: {
    feed: () => Relay.QL`
      fragment on RssFeed {
        title,
        summary
      }
    `,
  },
});
