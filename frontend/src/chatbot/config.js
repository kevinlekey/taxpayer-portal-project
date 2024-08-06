import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';

const config = {
  botName: "TRA Bot",
  initialMessages: [createChatBotMessage(`Welcome to TRAgpt! How can I assist you today?`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  widgets: [],
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;
