import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from 'components/auth/LoginForm';
import useActions from 'lib/hooks/useActions';
import { onLogin, onCheckLogin } from 'modules/auth';
import { message } from 'antd';

function LoginFormContainer({ history }) {
  const [handleLogin, handleCheckLogin] = useActions(
    [onLogin, onCheckLogin],
    [],
  );
  const { login } = useSelector(({ auth, loading }) => ({
    login: auth.login,
  }));
  const onLoginSubmit = useCallback(
    async (user) => {
      try {
        await handleLogin(user);
        await handleCheckLogin();
        message.success('로그인 성공.');
        history.push('/');
      } catch (e) {
        console.error({ e });
        message.error(login.responseMessage || '로그인이 실패 하였습니다.');
      }
    },
    [login, handleLogin, handleCheckLogin],
  );

  return <LoginForm onSubmit={onLoginSubmit} />;
}

export default withRouter(LoginFormContainer);
