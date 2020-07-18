import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import SideMenu from 'components/layout/SideMenu';
import MyHeader from 'components/layout/MyHeader';
import MyFooter from 'components/layout/MyFooter';
import MyContent from 'components/layout/MyContent';

function MyLayout({ children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MyHeader />
      <Layout>
        <SideMenu />
        <MyContent children={children} />
        <MyFooter title={'test'} />
      </Layout>
    </Layout>
  );
}

export default MyLayout;
