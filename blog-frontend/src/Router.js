import React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { Spin } from 'antd';

// import LoginPage from 'pages/LoginPage';
// import PostDetailPage from 'pages/PostDetailPage';
// import PostListPage from 'pages/PostListPage';
// import PostWritePage from 'pages/PostWritePage';
// import SignUpPage from 'pages/SignUpPage';


const LoginPage = loadable(() => import('pages/LoginPage'), {
  fallback: <Spin tip="loading.." />,
});

const PostDetailPage = loadable(() => import('pages/PostDetailPage'), {
  fallback: <Spin tip="loading.." />,
});

const PostListPage = loadable(() => import('pages/PostListPage'), {
  fallback: <Spin tip="loading.." />,
});

const PostWritePage = loadable(() => import('pages/PostWritePage'), {
  fallback: <Spin tip="loading.." />,
});

const SignUpPage = loadable(() => import('pages/SignUpPage'), {
  fallback: <Spin tip="loading.." />,
});


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

