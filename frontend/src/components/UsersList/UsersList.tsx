import {
  FC, useState, useEffect, useCallback,
} from 'react';
import { getUsers } from '../../helpers/getUsers';
import { createChat } from '../../helpers/createChat';
import { UserType } from '../../typedefs/User';
import styles from './UsersList.module.scss';

interface Props {
  user: UserType
}

export const UsersList: FC<Props> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Omit<UserType, 'token'>[]>([]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const data = await getUsers(user.id);

    setUsers(data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <main className={styles.container}>
      <h1>Users to chat with</h1>
      <ul className={styles.list}>
        {!loading && users.length > 0 && users.map((u) => (
          <li
            className={styles.list__item}
            key={u.id}
          >
            {u.username}
            <button
              className={styles.createChatButton}
              type="button"
              onClick={async () => {
                console.log('create');
                const chat = await createChat(user.id, u.id);

                console.log(chat);
              }}
            >
              <img src="https://www.svgrepo.com/show/59167/chat.svg" alt="send message" />
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};
