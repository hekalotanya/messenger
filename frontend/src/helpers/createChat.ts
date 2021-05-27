import { Chat } from '../typedefs/Chat';
import { API_URL } from './helpers';

interface CreateChat {
  (senderId: number, recipientId: number): Promise<Chat>;
}

export const createChat: CreateChat = async (senderId, recipientId) => {
  let result = null;

  try {
    const response = await fetch(`${API_URL}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId,
        recipientId,
      }),
    });

    if (response.ok) {
      result = await response.json();
    }
  } catch (e) {
    throw new Error(e);
  }

  return result;
};
