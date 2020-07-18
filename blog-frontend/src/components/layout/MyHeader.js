import React from 'react';
import { Layout, Menu } from 'antd';
import AppLogo from 'components/layout/AppLogo';
import { useSelector } from 'react-redux';

const { Header } = Layout;

function MyHeader({ menuList }) {
  const { isLogin } = useSelector(({ auth }) => {
    return {
      isLogin: auth.check.logged,
    };
  });

  return (
    <Header className="header">
      <AppLogo />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]}>
        {Array.isArray(menuList) &&
          menuList.map((menu, index) => (
            <Menu.Item key={menu.id || index}>{menu.title}</Menu.Item>
          ))}
        {isLogin ? (
          <Menu.Item key="logout">로그아웃</Menu.Item>
        ) : (
          <Menu.Item key="login">로그인</Menu.Item>
        )}
      </Menu>
    </Header>
  );
}

export default MyHeader;
