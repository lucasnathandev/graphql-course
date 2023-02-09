import { ValidationError } from 'apollo-server';

export const createUserFn = async (data, dataSource) => {
  const userInfo = await createUserInfo(data, dataSource);
  const { userName } = userInfo;

  const foundUser = await userExists(userName, dataSource);

  if (foundUser)
    throw new ValidationError(`userName ${userName} has already been taken`);

  return await dataSource.post('', userInfo);
};

const userExists = async (userName, dataSource) => {
  const found = await dataSource.get('', {
    userName,
  });
  return found[0];
};

export const updateUserFn = async (userId, data, dataSource) => {
  if (!userId) {
    throw new ValidationError('Missing userId');
  }
  const { firstName, lastName, userName } = data;

  if (!firstName && !lastName && !userName) {
    throw new ValidationError(
      'You have to send firstName or lastName or userName',
    );
  }
  if (userName) {
    const validUserName = validateText(/^[a-z]([\w.-]+)/gi, userName);
    if (!validUserName)
      throw new ValidationError(
        'Invalid username, must start with letters and is only permitted - . and _ symbols',
      );
  }

  const foundUser = await userExists(userName, dataSource);
  if (foundUser && foundUser.id !== userId)
    throw new ValidationError(`userName ${userName} has already been taken`);

  return dataSource.patch(userId, { ...data });
};

export const deleteUserFn = async (userId, dataSource) => {
  if (!userId) {
    throw new ValidationError('Missing userId');
  }
  await userExists(userId, dataSource);
  return !!(await dataSource.delete(userId));
};

const createUserInfo = async (data, dataSource) => {
  const { firstName, lastName, userName } = data;

  if (!firstName || !lastName || !userName) {
    throw new ValidationError(
      'You have to send firstName, lastName and userName',
    );
  }

  const validUserName = validateText(/^[a-z]([\w.-]+)/gi, userName);
  if (!validUserName)
    throw new ValidationError(
      'Invalid username, only permitted - . and _ symbols',
    );

  const indexRefUser = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefUser[0].indexRef + 1;

  return {
    firstName,
    lastName,
    userName,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};

const validateText = (regex, text) => {
  return text.match(regex)[0].length === text.length;
};
