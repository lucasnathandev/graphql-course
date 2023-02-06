const post = async (_, { id }, { api }) => {
  try {
    const post = await api.getPosts(`/${id}`);
    return post.data;
  } catch ({ response }) {
    if (Math.random() > 0.5) {
      return {
        statusCode: 500,
        message: 'Post Timeout',
        timeout: 123,
      };
    }

    if (!response?.data.id) {
      return {
        statusCode: 404,
        message: 'Post not found',
        postId: id,
      };
    }
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
      console.log(obj);
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      if (typeof obj.id !== 'undefined') return 'Post';
      return null;
    },
  },
  // Resolving interface type
  PostError: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      return null;
    },
  },
};
