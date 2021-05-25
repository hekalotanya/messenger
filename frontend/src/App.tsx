import { useState, useEffect } from 'react';
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

export const App = () => {
  const [user, setUser] = useState<UserType | null>(null);
  
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('token');
      
      
    }
  });

  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h1>
            Simple messenger
          </h1>
        </header>
        {user && (
          <button
            type="button"
            onClick={() => {
              setUser(null);
              localStorage.removeItem('token');
            }}
          >
            sign out
          </button>
        )}
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
