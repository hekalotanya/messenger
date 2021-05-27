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
  const [errors, setErrors] = useState<Record<string, any>>({});

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
            {`${u.username}(${u.id})`}
            {errors[`${u.id}`] && (
              <span className={styles.error}>
                you already have a chat with this user
              </span>
            )}
            <button
              className={styles.createChatButton}
              type="button"
              title="create chat"
              onClick={async () => {
                const chat = await createChat(user.id, u.id);

                if (!Object.keys(chat).length) {
                  setErrors(prev => ({
                    ...prev,
                    [u.id]: true,
                  }));
                }
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
