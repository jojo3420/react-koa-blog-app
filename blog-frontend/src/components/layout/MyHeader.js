import React from 'react';
import { Layout, Menu } from 'antd';
import AppLogo from 'components/layout/AppLogo';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const { Header } = Layout;

function MyHeader({ menuList, history }) {
  const { isLogin } = useSelector(({ auth }) => {
    return {
      isLogin: auth.check.logged,
    };
  });

  return (
    <Header className="header">
      <AppLogo />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[]}
        onClick={({ key }) => history.push(key)}
      >
        {Array.isArray(menuList) &&
          menuList.map((menu, index) => (
            <Menu.Item key={menu.id || index} style={{ float: 'right' }}>
              {menu.title}
            </Menu.Item>
          ))}
        {isLogin ? (
          <Menu.Item key="logout" style={{ float: 'right' }}>
            로그아웃
          </Menu.Item>
        ) : (
          <Menu.Item key="login" style={{ float: 'right' }}>
            로그인
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}

export default withRouter(MyHeader);
