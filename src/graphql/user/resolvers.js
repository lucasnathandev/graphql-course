const users = (_, { input }, { dataSources }) => {
  const users = dataSources.userApi.getUsers(input);
  return users;
};

const user = (_, { id }, { dataSources }) => {
  const user = dataSources.userApi.getUser(id);
  return user;
};

// Mutations

const createUser = async (_, { body }, { dataSources }) => {
  return dataSources.userApi.createUser(body);
};
const updateUser = async (_, { userId, body }, { dataSources }) => {
  return dataSources.userApi.updateUser(userId, body);
};
const deleteUser = async (_, { userId }, { dataSources }) => {
  return dataSources.userApi.deleteUser(userId);
};

// Field resolvers

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
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  },
};
