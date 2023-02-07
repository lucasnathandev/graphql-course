import { getUsers as getUsersApi } from '../graphql/user/utils';
import { getPosts as getPostsApi } from '../graphql/post/utils';
import { api } from '../lib/axios';
import { makeUserDataLoader } from './user/dataloaders';
import { makePostDataLoader } from './post/dataloaders';

const getUsers = getUsersApi(api);
const getPosts = getPostsApi(api);

export const context = () => {
  return {
    api: {
      userDataLoader: makeUserDataLoader(getUsers),
      postDataLoader: makePostDataLoader(getPosts),
      getUsers,
      getPosts,
    },
  };
};
