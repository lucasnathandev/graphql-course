import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from './dataloaders';
import {
  createUserFn,
  deleteUserFn,
  updateUserFn,
} from './utils/user-repository';

export class UsersApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users';
    this.dataloader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParams = {}) {
    return this.get('', urlParams);
  }

  async getUser(id) {
    return this.get(`/${id}`);
  }

  async createUser(body) {
    return createUserFn(body, this);
  }
  async updateUser(userId, body) {
    return updateUserFn(userId, body, this);
  }
  async deleteUser(userId) {
    return deleteUserFn(userId, this);
  }

  userLoader(id) {
    return this.dataloader.load(id);
  }
}
