import { createAction, handleActions } from 'redux-actions';
import makeActionTypes from 'lib/makeActionTypes';
import createRequestThunk from 'lib/createRequestThunk';
import * as authApi from 'lib/api/auth';
import produce from 'immer';

// Action
const PREFIX = 'auth';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = makeActionTypes(
  `${PREFIX}/LOGIN`,
);
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = makeActionTypes(
  `${PREFIX}/LOGOUT`,
);
const [SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE] = makeActionTypes(
  `${PREFIX}/SIGN_UP`,
);

const [CHECK_LOGIN, CHECK_LOGIN_SUCCESS, CHECK_LOGIN_FAILURE] = makeActionTypes(
  `${PREFIX}/CHECK_LOGIN`,
);

// Action Creator
export const onLogin = createRequestThunk(LOGIN, authApi.login);
export const onLogout = createRequestThunk(LOGOUT, authApi.logout);
export const onSignUp = createRequestThunk(SIGN_UP, authApi.signUp);
export const onCheckLogin = createRequestThunk(CHECK_LOGIN, authApi.checkLogin);

// State
const initialState = {
  login: {
    auth: null,
    responseMessage: '',
    status: null,
    e: null,
  },
  signUp: {
    auth: null,
    responseMessage: '',
    status: null,
    e: null,
  },
  check: {
    logged: false,
    e: null,
  },
};

// Reducer
const auth = handleActions(
  {
    [SIGN_UP_SUCCESS]: (state, { payload: auth }) =>
      produce(state, (draft) => {
        draft.signUp = initialState.signUp;
        draft.signUp.auth = auth;
      }),
    [SIGN_UP_FAILURE]: (state, { e }) =>
      produce(state, (draft) => {
        draft.signUp.auth = null;
        draft.signUp.responseMessage = e.response.data.message;
        draft.signUp.status = e.response.status;
        draft.signUp.e = e;
      }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) =>
      produce(state, (draft) => {
        draft.login = initialState.login;
        draft.login.auth = auth;
      }),
    [LOGIN_FAILURE]: (state, { e }) =>
      produce(state, (draft) => {
        draft.login.auth = null;
        draft.login.responseMessage = e.response.data.message;
        draft.login.status = e.response.status;
        draft.login.e = e;
      }),
    [LOGOUT_SUCCESS]: (state, { payload }) => produce(state, (draft) => {}),
    [LOGOUT_FAILURE]: (state, { payload }) => produce(state, (draft) => {}),
    [CHECK_LOGIN_SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.check.logged = true;
      }),
    [CHECK_LOGIN_FAILURE]: (state, { e }) =>
      produce(state, (draft) => {
        draft.check.logged = false;
        draft.check.e = e;
      }),
  },
  initialState,
);

export default auth;
