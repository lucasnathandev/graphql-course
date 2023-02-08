const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_, { input }, { dataSources }) => {
  const posts = dataSources.postApi.getPosts(input);
  return posts;
};

const user = async (parent, _, { dataSources }) => {
  return dataSources.userApi.userLoader(parent.userId);
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
