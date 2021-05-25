import { useState, useEffect, useCallback } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styles from './App.module.scss';
import { SignUp } from './components/SignUp';
import { UserType } from './typedefs/User';
import { Chats } from './components/Chats';
import { SignIn } from './components/SignIn';
import { getAuthUser } from './helpers/getAuthUser';

export const App = () => {
  const [user, setUser] = useState<UserType | null>(null);

  const getUser = useCallback(
    async (token: string) => {
      const userFromServer = await getAuthUser(token);

      return userFromServer;
    },
    [],
  );

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('token');

      if (token) {
        getUser(token)
          .then(userFromServer => setUser(userFromServer));
      }
    }
  });

  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h1 className={styles.header}>
            Simple messenger
          </h1>

          {user && (
            <button
              className={styles.logOutButton}
              type="button"
              onClick={() => {
                setUser(null);
                localStorage.removeItem('token');
              }}
            >
              sign out
            </button>
          )}
        </header>
      </div>

      <Switch>
        <Route path="/sign-up">
          <SignUp
            user={user}
            setUser={setUser}
          />
        </Route>
        <Route path="/sign-in">
          <SignIn
            user={user}
            setUser={setUser}
          />
        </Route>
        <Route path="/chats">
          <Chats
            userId={user?.id}
          />
        </Route>
      </Switch>
    </Router>
  );
};
