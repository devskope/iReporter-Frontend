// import fetchMock from 'fetch-mock';
import faker from 'faker';
import { mockStore } from '../../enzyme.config';
import createRecord from '../../src/actions/records/create';

const payload = {
  title: faker.random.alphaNumeric(10),
  comment: faker.random.alphaNumeric(50),
  mediaFiles: [],
};

describe('record creation', () => {
  it('dispatch errors on record creation failure', async () => {
    const store = mockStore({});
    const { title, comment, mediaFiles } = payload;

    await store.dispatch(createRecord({ title, comment, mediaFiles }));
    expect(store.getActions()).toEqual([
      {
        type: 'RECORD_CREATE_ERROR',
      },
      {
        type: 'CREATE_TOAST',
        payload: {
          type: 'ERROR',
          title: 'ERROR',
          messages: [`An error occured`],
        },
      },
    ]);
  });
});
