import React, { useCallback, useEffect } from 'react';
import SignUpForm from 'components/auth/SignUpForm';
import { withRouter } from 'react-router-dom';
import { onSignUp, onCheckLogin } from 'modules/auth';
import useActions from 'lib/hooks/useActions';
import { useSelector } from 'react-redux';
import { message } from 'antd';

function SignUpFormContainer({ history }) {
  const { signUp } = useSelector(({ loading, auth }) => {
    return {
      signUp: auth.signUp,
      loading: loading['auth/SIGN_UP'],
    };
  });

  const [handleSignUp, handleCheckLogin] = useActions(
    [onSignUp, onCheckLogin],
    [],
  );

  const onSignUpSubmit = useCallback(
    async (user) => {
      console.log({ user });
      const { username, password, confirmPassword } = user;
      if (password !== confirmPassword) {
        return message.info('패스워드가 불일치 합니다.');
      }
      await handleSignUp({ username, password });
      await handleCheckLogin();
      message.success('회원가입 성공!');
      history.push(`/@${username}`);
    },
    [handleSignUp, handleCheckLogin, history],
  );
  useEffect(() => {
    if (signUp && signUp.status >= 400) {
      message.error(signUp.responseMessage || '회원 가입이 실패했습니다.');
    }
  }, [signUp]);

  return <SignUpForm onSubmit={onSignUpSubmit} />;
}

export default withRouter(SignUpFormContainer);
