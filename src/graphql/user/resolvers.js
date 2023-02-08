const users = (_, { input }, { dataSources }) => {
  const users = dataSources.userApi.getUsers(input);
  return users;
};

const user = (_, { id }, { dataSources }) => {
  const user = dataSources.userApi.getUser(id);
  return user;
};

const posts = async (parent, _, { dataSources }) => {
  return dataSources.postApi.postLoader(parent.id);
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
  User: {
    posts,
  },
};
