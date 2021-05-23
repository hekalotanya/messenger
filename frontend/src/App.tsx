import { useState, useEffect } from 'react';
import { getUsers } from './helpers/getUsers';
import styles from './App.module.scss';

export const App = () => {
  const [users, setUsers] = useState <any[] | null>(null);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    console.log(users);
  }, [users]);

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>
          Simple messenger
        </h1>
      </header>

      <h2>users:</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
