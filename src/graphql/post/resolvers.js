const post = async (_, { id }, { api }) => {
  try {
    const post = await api.getPosts(`/${id}`);
    if (!post?.data.id) {
      return {
        statusCode: 404,
        message: 'Not found',
      };
    }
    return post.data;
  } catch ({ response }) {
    return {
      statusCode: response.status,
      message: response.statusText,
    };
  }
};

const posts = async (_, { input }, { api }) => {
  const apiFiltersInput = new URLSearchParams(input);
  const posts = await api.getPosts(`?${apiFiltersInput}`);
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
  PostResult: {
    __resolveType: (obj) => {
      if (typeof obj.statusCode !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.id !== 'undefined') return 'Post';
      return null;
    },
  },
};
