import React from 'react';
import { Route, IndexRoute} from 'react-router';

import App from './containers/App.jsx';

import IndexPage from './containers/IndexPage.jsx'
import DefaultPage from './containers/DefaultPage.jsx'

import SignUp from "./components/auth/SignUp.jsx";
import SignInPage from "./containers/auth/SignInPage.jsx";
import SignOut from "./components/auth/SignOut.jsx";

import Page1 from './components/Page1.jsx'
import Page2 from './components/Page2.jsx'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage}/>

    <Route path="sign_in" component={SignInPage}/>

    <Route path="page1" component={Page1}/>
    <Route path="page2" component={Page2}/>
    <Route path="*" component={DefaultPage}/>

  </Route>
)

/*
 import React from 'react'
 import ReactDOM from 'react-dom'
 import { Router, Route, Link, IndexRoute } from 'react-router'
 import createBrowserHistory from 'history/lib/createBrowserHistory';

 import App from './components/SampleApp.jsx'
 import Page1 from './components/Page1.jsx'
 import Page2 from './components/Page2.jsx'
 import DefaultPage from './components/DefaultPage.jsx'

 import SignUp from "./components/auth/SignUp.jsx";
 import SignIn from "./components/auth/SignIn.jsx";
 import SignOut from "./components/auth/SignOut.jsx";

 ReactDOM.render((
 <Router history={createBrowserHistory()}>
 <Route path="/" component={App}>
 <IndexRoute component={IndexPage}/>

 <Route path="sign_up" component={SignUp}/>
 <Route path="sign_in" component={SignIn}/>
 <Route path="sign_out" component={SignOut}/>

 <Route path="page1" component={Page1}/>
 <Route path="page2" component={Page2}/>
 <Route path="*" component={DefaultPage}/>
 </Route>
 </Router>
 ), document.getElementById("app"));
 */