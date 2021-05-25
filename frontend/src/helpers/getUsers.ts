import { UserType } from '../typedefs/User';
import { API_URL } from './helpers';

export const getUsers = async (userId: number): Promise<UserType[]> => {
  const users = await fetch(`${API_URL}/users/${userId}`);

  return users.json();
};
