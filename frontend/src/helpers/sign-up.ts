import { UserType } from '../typedefs/User';
import { API_URL } from './helpers';

interface SignUp {
  (username: string, password: string): Promise<UserType>;
}

export const signUp: SignUp = async (username, password) => {
  let result = null;

  try {
    const response = await fetch(`${API_URL}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      result = await response.json();
    }
  } catch (e) {
    throw new Error(e);
  }

  return result;
};
