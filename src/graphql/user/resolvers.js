const user = () => ({
  id: '1',
  userName: 'Lucas',
});

const users = () => [
  {
    id: 1,
    userName: 'João',
  },
  {
    id: 2,
    userName: 'Carlos',
  },
  {
    id: 3,
    userName: 'Igor',
  },
  {
    id: 4,
    userName: 'Lucas',
  },
];

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
