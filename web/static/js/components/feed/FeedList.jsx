import React, { Component, PropTypes } from 'react';

export default class FeedList extends Component {
}

export default React.createClass({
  getInitialState: function () {
    return {feeds: []};
  },
  componentDidMount() {
    Api.getFeeds(this._cb);
  },
  render() {
    var feedNodes = this.state.feeds.map(function (feed) {
      return (
        <Feed feed={feed}/>
      );
    });
    return (
      <div className="feedList">
        {feedNodes}
      </div>
    );
  },
  _cb: function (feeds) {
    this.setState({feeds: feeds});
  }
});

var Feed = React.createClass({
  render: function () {
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
          <button onClick={this._onBtnRefresh} className="btn btn-default">
            <span className="glyphicon glyphicon-refresh"/> Refresh
          </button>
        </div>
        <EntryList entries={this.props.feed.entries}/>
      </div>
    );
  },
  _onBtnRefresh: function (e) {
    console.log("refresh");
    Api.putFeeds(this.props.feed.id, function (result) {
      console.log(result)
    })
  }
});

var EntryList = React.createClass({
  render: function () {
    var entryList = this.props.entries.map(function (entry) {
      return (
        <Entry entry={entry}/>
      );
    });
    return (
      <div>
        {entryList}
      </div>
    );
  }
});

var Entry = React.createClass({
  render: function () {
    return (
      <div>
        <h3>
          {this.props.entry.title}
        </h3>

        <div>
          {this.props.entry.subtitle}
        </div>
        <div>
          {this.props.entry.summary}
        </div>
        <div>
          <a href={this.props.entry.link}>{this.props.entry.link}</a>
        </div>
      </div>
    );
  }
});
