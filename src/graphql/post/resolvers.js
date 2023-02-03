const post = () => ({
  id: '123',
  title: 'Example post',
});

const posts = () => [
  {
    id: '1',
    title: 'Post 1',
  },
  {
    id: '2',
    title: 'Post 2',
  },
  {
    id: '3',
    title: 'Post 3',
  },
  {
    id: '4',
    title: 'Post 4',
  },
];

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};
