import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'

import SideMenu from './SideMenu.jsx'
import NaviBar from './NaviBar.jsx'

export default React.createClass({
  componentDidMount: function () {
    this.buildSidebar();
  },
  buildSidebar: function() {
    // http://bootsnipp.com/snippets/featured/fancy-sidebar-navigation
    var trigger = $('.hamburger');
    var sideMenu = this.refs.sideMenu;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {
      if (sideMenu.isClosed()) {
        sideMenu.close();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
      } else {
        sideMenu.open();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
      }
    }

    $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
    });
  },

  render: function () {
    return (
      <div id="wrapper">
        <SideMenu ref="sideMenu" />

        <div id="page-content-wrapper">
          <button type="button" className="hamburger is-closed" data-toggle="offcanvas">
            <span className="hamb-top"></span>
            <span className="hamb-middle"></span>
            <span className="hamb-bottom"></span>
          </button>

          <div className="container">
            <NaviBar />

            <div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
