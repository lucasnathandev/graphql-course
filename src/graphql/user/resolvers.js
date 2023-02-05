const users = async (_, { input }, { api }) => {
  const apiFiltersInput = new URLSearchParams(input);
  const users = await api.getUsers(`?${apiFiltersInput}`);
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
