import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import {Session} from 'meteor/session';

import Signup from './../ui/Signup'
import Dashboard from './../ui/Dashboard'
import NotFound from './../ui/NotFound'
import Login from './../ui/Login'


const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        browserHistory.replace("/dashboard")
    }
};

const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.replace('/')
    }
};

const onEnterNotePage = (nextState) => {
    if (!Meteor.userId()) {
        browserHistory.replace('/')
    } else {
        Session.set('selectedNoteId', nextState.params.id);
    }
};

export const onAuthChange = (isAuthenticated) => {
    const pathName = browserHistory.getCurrentLocation().pathname;

    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authenticatedPages.includes(pathName);

    if (isUnauthenticatedPage && isAuthenticated) {
        browserHistory.push('/dashboard')
    } else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.push('/')
    }
};

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
        <Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterNotePage}/>
        <Route path="*" component={NotFound} onEnter={onEnterPrivatePage}/>
    </Router>
);
