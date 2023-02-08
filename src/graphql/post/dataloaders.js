import DataLoader from 'dataloader';

export const makePostDataLoader = (getPosts) => {
  console.log('Post dataloader created');
  try {
    const postDataLoader = new DataLoader(async (usersIds) => {
      const urlQuery = usersIds.join('&userId=');
      const posts = await getPosts('?userId=' + urlQuery);
      return usersIds.map((id) => {
        return posts.filter((post) => post.userId === id);
      });
    });
    return postDataLoader;
  } catch (e) {
    console.log(e.response || e);
  }
};
