const post = async (_, { id }, { api }) => {
  const post = await api.getPosts(`/${id}`);
  return post.data;
};

const posts = async (_, __, { api }) => {
  const posts = await api.getPosts();
  return posts.data;
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
  // Trivial resolvers
  Post: {
    unixTimestamp: ({ createdAt }) => {
      const timestamp = new Date(createdAt).getTime() / 1000;
      return Math.floor(timestamp);
    },
  },
};
