const post = async (_, { id }, { api }) => {
  try {
    const post = await api.getPosts(`/${id}`);
    return post.data;
  } catch ({ response }) {
    console.log('');
  }
};

const posts = async (_, { input }, { api }) => {
  const apiFiltersInput = new URLSearchParams(input);
  const posts = await api.getPosts(`?${apiFiltersInput}`);
  return posts.data;
};

const user = async (parent, _, { api }) => {
  return api.userDataLoader.load(parent.userId);
  // Using dataloader is not needed anymore to use the code below
  // const user = await api.getUsers(`/${parent.userId}`);
  // return user.data;
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
  Post: {
    user,
  },
};
