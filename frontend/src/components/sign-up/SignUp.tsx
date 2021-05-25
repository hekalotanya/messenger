import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { signUp } from '../../helpers/sign-up';
import { UserType } from '../../typedefs/User';
import styles from './SignUp.module.scss';

interface Props {
  user: null | UserType
  setUser: Dispatch<SetStateAction<UserType | null>>
}

export const SignUp: FC<Props> = ({ user, setUser }) => {
  console.log(user, setUser);
  
  const [state, setState] = useState<{
    username: string | null;
    password: string | null;
  }>({
    username: null,
    password: null,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { username, password } = state;

    let user = null;

    if (username && password) {
      user = await signUp(username, password);

      console.log(user);
    }
  };

  return (
    <main>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChange}
          className={styles.input}
          type="text"
          name="username"
          placeholder="username"
        />

        <input
          onChange={handleChange}
          className={styles.input}
          type="password"
          name="password"
          placeholder="password"
        />

        <button
          className={styles.button}
          type="submit"
        >
          sign up
        </button>
      </form>
    </main>
  );
};
