import "./ChatList.css";
import { formatDate } from "../../utils";
import { useEffect, useState } from "react";

const ChatList = ({ chats, handleSelectChat }) => {
  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Filter by Title / Order ID</h2>
        <input type="text" placeholder="Start typing to search" />
      </div>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="chat-item"
          onClick={() => handleSelectChat(chat)}
        >
          <img src={chat.imageURL} alt={chat.title} />
          <div className="chat-item-content">
            <h4>{chat.title}</h4>
            <h4>Order {chat.orderId}</h4>
            <p>
              {chat.messageList.length > 0
                ? chat.messageList[chat.messageList.length - 1].message
                : null}
            </p>
          </div>
          <div className="chat-item-time">
            {formatDate(chat.latestMessageTimestamp)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
