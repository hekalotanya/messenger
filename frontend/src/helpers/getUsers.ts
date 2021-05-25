import { API_URL } from './helpers';

export const getUsers = async (userId: number): Promise<any> => {
  const users = await fetch(`${API_URL}/users/${userId}`);

  return users.json();
};
