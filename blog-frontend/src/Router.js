import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import PostDetailPage from 'pages/PostDetailPage';
import PostListPage from 'pages/PostListPage';
import PostWritePage from 'pages/PostWritePage';
import SignUpPage from 'pages/SignUpPage';

function Router () {
  return (
    <>
      <Route path={['/', '/@:username']} exact component={PostListPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/posts/:id" component={PostDetailPage} />
      <Route path="/write" component={PostWritePage} />
      <Route path="/signup" component={SignUpPage} />
    </>
  )
}

export default Router;

