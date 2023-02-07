import DataLoader from 'dataloader';

export const makeUserDataLoader = (getUsers) => {
  console.log('Dataloader created');
  try {
    return new DataLoader(async (postsIds) => {
      const urlQuery = postsIds.join('&id=');
      const users = await getUsers('?id=' + urlQuery);

      return postsIds.map((id) => {
        return users.data.find((user) => user.id === id);
      });
    });
  } catch (e) {
    console.log(e.response || e);
  }
};
