const users = async (_, __, { api }) => {
  const users = await api.getUsers();
  return users.data;
};

const user = async (_, { id }, { api }) => {
  const user = await api.getUsers(`/${id}`);
  return user.data;
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
