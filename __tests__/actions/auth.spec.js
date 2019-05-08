import fetchMock from 'fetch-mock';
import faker from 'faker';
import { mockStore } from '../../enzyme.config';
import { login, signUp, logout } from '../../src/actions/auth';

describe('auth', () => {
  let user;
  let store;
  const payload = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  };
  beforeEach(() => {
    user = { username: payload.username, id: 1 };
    store = mockStore({});
    fetchMock.post('*', {
      data: [
        {
          user,
          token: 'token',
        },
      ],
    });
  });

  afterEach(() => {
    fetchMock.reset();
    store.clearActions();
  });

  it('login should dispatch correct success actions', async () => {
    await store.dispatch(
      login({
        username: payload.username,
        password: payload.password,
      })
    );

    expect(store.getActions()).toEqual([
      { type: 'AUTH_INIT' },
      { type: 'LOGGED_IN', payload: user },
      {
        type: 'CREATE_TOAST',
        payload: {
          type: 'SUCCESS',
          title: 'SUCCESS',
          messages: [`Welcome back ${user.username}.`],
        },
      },
    ]);
  });

  it('login should dispatch correct error actions', async () => {
    await store.dispatch(
      login({
        username: payload.username,
        password: 'short',
      })
    );

    expect(store.getActions()).toEqual([
      { type: 'AUTH_INIT' },
      {
        type: 'AUTH_ERROR',
        payload: ['Password must be between 8 and 20 characters long'],
      },
    ]);
  });

  it('login should dispatch correct auth error actions', async () => {
    fetchMock.post(
      '*',
      { errors: ['Username already exists'] },
      { overwriteRoutes: true }
    );

    await store.dispatch(
      login({
        username: payload.username,
        password: payload.password,
      })
    );

    expect(store.getActions()).toEqual([
      { type: 'AUTH_INIT' },
      { type: 'AUTH_ERROR', payload: ['Username already exists'] },
    ]);
  });

  it('login should dispatch correct fetch error actions', async () => {
    fetchMock.reset();

    await store.dispatch(
      login({
        username: payload.username,
        password: payload.password,
      })
    );

    expect(store.getActions()).toEqual([
      { type: 'AUTH_INIT' },
      {
        type: 'CREATE_TOAST',
        payload: {
          type: 'ERROR',
          title: 'ERROR',
          messages: ['An error occured'],
        },
      },
    ]);
  });

  it('signUp should dispatch correct success actions', async () => {
    await store.dispatch(signUp(payload));

    expect(store.getActions()).toEqual([
      { type: 'AUTH_INIT' },
      { type: 'SIGNED_UP', payload: user },
      {
        type: 'CREATE_TOAST',
        payload: {
          type: 'SUCCESS',
          title: 'SUCCESS',
          messages: [`Hi ${user.username}, welcome to iReporter.`],
        },
      },
    ]);
  });

  it('should dispatch correct logout action', async () => {
    await store.dispatch(logout());

    expect(store.getActions()).toEqual([
      { type: 'LOGOUT' },
      {
        type: 'CREATE_TOAST',
        payload: {
          type: 'SUCCESS',
          title: 'Logged out',
          messages: [`You have logged out successfully`],
        },
      },
    ]);
  });
});
