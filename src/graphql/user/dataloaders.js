import DataLoader from 'dataloader';

export const makeUserDataLoader = (getUsers) => {
  console.log('Dataloader created');
  try {
    const userDataLoader = new DataLoader(async (postsIds) => {
      const urlQuery = postsIds.join('&id=');
      const users = await getUsers('?id=' + urlQuery);
      return postsIds.map((id) => {
        return users.find((user) => user.id === id);
      });
    });
    return userDataLoader;
  } catch (e) {
    console.log(e.response || e);
  }
};
