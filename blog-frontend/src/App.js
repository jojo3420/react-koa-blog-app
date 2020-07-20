import React from 'react';
import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { Spin } from 'antd';

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

const PageNotFound = loadable(() => import('pages/PageNotFound'), {
  fallback: <Spin tip="loading" />,
});

function App() {
  return (
    <Switch>
      <Route path={['/', '/@:username']} exact component={PostListPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/posts/:id" component={PostDetailPage} />
      <Route path="/write" component={PostWritePage} />
      <Route path="/signup" component={SignUpPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
