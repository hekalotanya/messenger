import { UserType } from '../typedefs/User';
import { API_URL } from './helpers';

export const getAuthUser = async (token: string): Promise<UserType> => {
  const user = await fetch(`${API_URL}/user/${token}`);

  return user.json();
};
