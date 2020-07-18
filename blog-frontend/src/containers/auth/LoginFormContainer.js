import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from 'components/auth/LoginForm';
import useActions from 'lib/hooks/useActions';
import { onLogin, onLogout, onSignUp, onCheckLogin } from 'modules/auth';
import { message } from 'antd';

function LoginFormContainer({ history }) {
  const [handleLogin] = useActions([onLogin], []);
  const { login, signUp } = useSelector(({ auth, loading }) => ({
    login: auth.login,
    signUp: auth.signUp,
  }));
  const onLoginSubmit = async (user) => {
    try {
      await handleLogin(user);
      message.success('로그인 성공.');
      history.push('/');
    } catch (e) {
      console.error({ e });
      message.error(login.responseMessage || '로그인이 실패 하였습니다.');
    }
  };

  return <LoginForm onSubmit={onLoginSubmit} />;
}

export default withRouter(LoginFormContainer);
