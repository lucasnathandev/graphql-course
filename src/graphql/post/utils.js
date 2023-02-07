export const getPosts = (axios) => (path) => axios.get(`/posts${path}`);
