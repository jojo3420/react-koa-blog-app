import React from 'react';
import { Layout } from 'antd';
import MyHeader from 'components/layout/MyHeader';
import SideMenu from 'components/layout/SideMenu';
import MyBreadcrumb from 'components/layout/MyBreadcrumb';
import MyContent from 'components/layout/MyContent';

function TestLayout() {
  return (
    <Layout>
      <MyHeader />
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

export default TestLayout;
