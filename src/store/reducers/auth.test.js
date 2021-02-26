import * as actionTypes from './../actions/actionTypes';

import reducer from './auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      idToken: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          idToken: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'token',
          userId: 'userId',
        }
      )
    ).toEqual({
      idToken: 'token',
      userId: 'userId',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
