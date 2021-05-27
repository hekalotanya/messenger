import {
  FC, useState, useEffect, useCallback,
} from 'react';
import { getChats } from '../../helpers/getChats';
import { Chat } from '../../typedefs/Chat';
import styles from './Chats.module.scss';

interface Props {
  userId?: number | null
}

export const Chats: FC<Props> = ({ userId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = useCallback(async () => {
    if (!userId) {
      return;
    }

    setLoading(true);
    const data = await getChats(userId);

    setChats(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  if (!userId) {
    return null;
  }

  return (
    <main className={styles.container}>
      <h1>Chats</h1>
      <ul>
        {!loading && chats.map((chat) => (
          <li key={chat.id}>
            {chat.id}
          </li>
        ))}
      </ul>
    </main>
  );
};
