import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from './dataloaders';

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

  userLoader(id) {
    return this.dataloader.load(id);
  }
}
