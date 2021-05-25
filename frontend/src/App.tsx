import { useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styles from './App.module.scss';
import { SignUp } from './components/sign-up';
import { UserType } from './typedefs/User';
import { Chats } from './components/chats';

export const App = () => {
  const [user, setUser] = useState <UserType | null>(null);

  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h1>
            Simple messenger
          </h1>
        </header>
      </div>

      <Switch>
          <Route path="/sign-up">
            <SignUp
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
