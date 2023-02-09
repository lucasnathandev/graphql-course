import { RESTDataSource } from 'apollo-datasource-rest';
import { makePostDataLoader } from './dataloaders';
import {
  createPostFn,
  deletePostFn,
  updatePostFn,
} from './utils/post-repository';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts';
    this.dataloader = makePostDataLoader(this.getPosts.bind(this));
    this.headers = {
      'Content-type': 'application/json',
    };
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async getPost(id) {
    return this.get(`/${id}`, undefined, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async createPost(body) {
    return createPostFn(body, this);
  }

  async updatePost(id, body) {
    return updatePostFn(id, body, this);
  }

  async deletePost(id) {
    return deletePostFn(id, this);
  }

  postLoader(id) {
    return this.dataloader.load(id);
  }
}
