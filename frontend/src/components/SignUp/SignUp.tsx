import {
  ChangeEvent, Dispatch, FC,
  FormEvent, SetStateAction, useState,
} from 'react';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../helpers/sign-up';
import { UserType } from '../../typedefs/User';
import styles from './SignUp.module.scss';

interface Props {
  user: null | UserType
  setUser: Dispatch<SetStateAction<UserType | null>>
}

export const SignUp: FC<Props> = ({ user, setUser }) => {
  const [state, setState] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });
  const [error, setError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { username, password } = state;

    let userFromServer = null;

    if (username.trim() && password.trim()) {
      userFromServer = await signUp(username, password);

      if (!Object.keys(userFromServer).length) {
        setError(true);
        setState({
          username: '',
          password: '',
        });

        return;
      }

      setUser(userFromServer);
      localStorage.setItem('token', userFromServer.token);
      setState({
        username: '',
        password: '',
      });
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
          value={state.username}
        />

        <input
          onChange={handleChange}
          className={styles.input}
          type="password"
          name="password"
          placeholder="password"
          value={state.password}
        />

        {error && <p className={styles.error}>Such user already exists</p>}

        <button
          className={styles.button}
          type="submit"
        >
          sign up
        </button>
      </form>
      {user && <Redirect to="/users" />}
    </main>
  );
};
