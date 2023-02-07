export const getUsers = (axios) => (path) => axios.get(`/users${path}`);
