import { ChatMessage } from '../typedefs/ChatMessage';
import { API_URL } from './helpers';

interface CreateChat {
  (authorId: number, chatId: number, message: string): Promise<ChatMessage>;
}

export const createChatMessage: CreateChat = async (
  authorId, chatId, message,
) => {
  let result = null;

  try {
    const response = await fetch(`${API_URL}/chat/${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authorId,
        message,
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
