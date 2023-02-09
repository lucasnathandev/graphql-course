import { ValidationError } from 'apollo-server';

export const createPostFn = async (data, dataSource) => {
  const postInfo = await createPostInfo(data, dataSource);
  const { title, body, userId } = postInfo;

  if (!title && !body && !userId) {
    throw new ValidationError('You have to send title, body and userId');
  }

  return await dataSource.post('', postInfo);
};

const userExists = async (userId, dataSource) => {
  try {
    await dataSource.context.dataSources.userApi.get(userId);
  } catch {
    throw new ValidationError(`User: ${userId} does not exists.`);
  }
};

const createPostInfo = async (data, dataSource) => {
  const { title, body, userId } = data;
  await userExists(userId, dataSource);
  const indexRefPost = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefPost[0].indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};

export const updatePostFn = async (postId, data, dataSource) => {
  const { userId } = data;
  if (!postId) {
    throw new ValidationError('Missing postId');
  }

  userId && (await userExists(userId, dataSource));

  return dataSource.patch(postId, { ...data });
};

export const deletePostFn = async (postId, dataSource) => {
  if (!postId) {
    throw new ValidationError('Missing postId');
  }
  await dataSource.delete(postId);
  return true;
};
