import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Signup from './../ui/Signup'
import Link from './../ui/LinkPage'
import NotFound from './../ui/NotFound'
import Login from './../ui/Login'


const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        browserHistory.replace("/links")
    }
};

const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.replace('/')
    }
};

export const onAuthChange = (isAuthenticated) => {
    const pathName = browserHistory.getCurrentLocation().pathname;

    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authenticatedPages.includes(pathName);

    if (isUnauthenticatedPage && isAuthenticated) {
        browserHistory.push('/links')
    } else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.push('/')
    }
};

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
        <Route path="*" component={NotFound} onEnter={onEnterPrivatePage}/>
    </Router>
);
