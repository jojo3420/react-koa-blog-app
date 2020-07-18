import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import SideMenu from 'components/layout/SideMenu';
import MyHeader from 'components/layout/MyHeader';
// import MyFooter from 'components/layout/MyFooter';
import MyContent from 'components/layout/MyContent';
import MyBreadcrumb from 'components/layout/MyBreadcrumb';

function MyLayout({ children }) {
  return (
    <Layout>
      <MyHeader
        menuList={[
          { id: 1, title: 'test1' },
          { id: 2, title: 'test2' },
        ]}
      />
      <Layout>
        <SideMenu />
        <Layout style={{ padding: '0 24px 24px' }}>
          <MyBreadcrumb
            list={[
              { id: 1, title: 'Home' },
              { id: 2, title: 'List' },
            ]}
          />
          <MyContent />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MyLayout;
