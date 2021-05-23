import { API_URL } from './helpers';

export const getUsers = async (): Promise<any> => {
  const users = await fetch(`${API_URL}/users`);

  // eslint-disable-next-line
  console.log(users);

  return users.json();
};
