import React from 'react'
import { Router, Route, Link } from 'react-router'

export default React.createClass({
  render: function () {
    return (
      <div>
        <div>
          Page1
        </div>
        <button className="btn btn-primary"><span className="glyphicon glyphicon-refresh"/> Refresh!</button>
      </div>
    );
  }
});
