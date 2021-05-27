import {
  FC, useState, useEffect, useCallback,
} from 'react';
import cn from 'classnames';
import { getChats } from '../../helpers/getChats';
import { Chat } from '../../typedefs/Chat';
import { createChatMessage } from '../../helpers/createChatMessage';
import { ChatMessage } from '../../typedefs/ChatMessage';
import styles from './Chats.module.scss';
import { getChatMessages } from '../../helpers/getChatMessages';

interface Props {
  userId?: number | null
}

export const Chats: FC<Props> = ({ userId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const fetchChats = useCallback(async () => {
    if (!userId) {
      return;
    }

    setLoading(true);
    const data = await getChats(userId);

    setChats(data);
    setLoading(false);
  }, [userId]);

  const fetchChatMessages = useCallback(async () => {
    if (currentChatId) {
      const chatMessages = await getChatMessages(currentChatId);

      setMessages(chatMessages);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChatMessages();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  if (!userId) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <aside className={styles.chatsList}>
          <ul className={styles.list}>
            {!loading && chats.map((chat) => (
              <li
                aria-hidden
                className={styles.listItem}
                key={chat.id}
                onClick={() => {
                  setCurrentChatId(chat.id);
                }}
              >
                {`Chat #${chat.id} with ${userId === chat.senderId ? chat.recipientId : chat.senderId}`}
              </li>
            ))}
          </ul>
        </aside>
        <main className={cn(styles.chat, {
          [styles.noChatSelected]: currentChatId === 0,
        })}
        >
          {!currentChatId ? <h3>select a chat</h3> : <h3>{`Selected chat #${currentChatId}`}</h3>}

          {currentChatId !== 0 && (
            <div className={styles.messagesContainer}>
              <ul className={styles.messagesList}>
                {messages.map(chatMessage => (
                  <li
                    key={chatMessage.id}
                    className={cn(styles.messageItem, {
                      [styles.messageFrom]: chatMessage.authorId === userId,
                    })}
                  >
                    {chatMessage.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentChatId !== 0 && (
            <div className={styles.inputContainer}>
              <input
                className={styles.messageInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
              />

              <button
                type="button"
                className={styles.sendButton}
                onClick={async () => {
                  await createChatMessage(userId, currentChatId, message);

                  setMessage('');
                }}
              >
                send
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};
