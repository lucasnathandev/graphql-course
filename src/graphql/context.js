import { api } from '../lib/axios';

export const context = () => {
  return {
    api: {
      getUsers: (path = '/') => api.get('/users' + path),
      getPosts: (path = '/') => api.get('/posts' + path),
    },
  };
};
