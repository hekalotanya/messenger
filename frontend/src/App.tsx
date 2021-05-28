import { useState, useEffect, useCallback } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import styles from './App.module.scss';
import { SignUp } from './components/SignUp';
import { UserType } from './typedefs/User';
import { Chats } from './components/Chats';
import { SignIn } from './components/SignIn';
import { getAuthUser } from './helpers/getAuthUser';
import { UsersList } from './components/UsersList';

export const App = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const usersToken = localStorage.getItem('token');

  const getUser = useCallback(
    async (token: string) => {
      const userFromServer = await getAuthUser(token);

      setUser(userFromServer);
    },
    [],
  );

  useEffect(() => {
    if (!user && usersToken) {
      getUser(usersToken);
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
            <nav className={styles.navigation}>
              <Link
                className={styles.link}
                to="/users"
              >
                users
              </Link>
              <Link
                className={styles.link}
                to="/chats"
              >
                chats
              </Link>
            </nav>
          )}

          {user && (
            <div
              className={styles.userInfo}
              title="currently you are logged in as"
            >
              <img
                src="https://www.svgrepo.com/show/60372/profile-user.svg"
                alt="profile pic"
                className={styles.profileIcon}
              />
              <span>
                {user.username}
              </span>
            </div>
          )}

          {user && (
            <button
              className={styles.logOutButton}
              type="button"
              onClick={() => {
                setUser(null);
                localStorage.removeItem('token');
              }}
            >
              Log out
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
        {!user && !usersToken && <Redirect to="/sign-in" />}
        <Route path="/" exact>
          <Redirect to="/users" />
        </Route>
        <Route path="/users">
          {user && (
            <UsersList
              user={user}
            />
          )}
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
