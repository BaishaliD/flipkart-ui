import { useEffect, useRef, useState } from "react";
import "./ChatView.css";

const ChatView = ({ selectedChat }) => {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  const chatContainer = useRef();

  useEffect(() => {
    setChats([...selectedChat.messageList]);
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!input) {
      return;
    }
    setChats((prev) => {
      console.log("rertunr...");
      return [
        ...prev,
        {
          messageId: Date.now(),
          message: input,
          timestamp: Date.now(),
          sender: "USER",
          messageType: "text",
        },
      ];
    });
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
    setInput("");
  };

  return (
    <div className="chat-view">
      <div className="chat-header">
        <img
          src={selectedChat.imageURL}
          alt={selectedChat.title}
          height={40}
          width={40}
          className="chat-image"
        />
        <div className="chat-title">{selectedChat.title}</div>
      </div>

      <div className="chat-messages" ref={chatContainer}>
        {!chats || chats?.length === 0 ? (
          <div className="no-messages">
            <p>Send a message to start chatting</p>
          </div>
        ) : (
          chats.map((msg) => {
            return (
              <div
                key={msg.messageId}
                className={`chat-message ${msg.sender.toLowerCase()}`}
              >
                <div style={{ padding: "16px" }}>
                  <div className="message-text">{msg.message}</div>
                  <div className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                {msg.messageType === "optionedMessage" && (
                  <div>
                    {msg.options.map((option, i) => (
                      <div key={i} className="option-message">
                        <div className="option-text">{option.optionText}</div>
                        <div className="option-subtext">
                          {option.optionSubText}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <input
        type="text"
        placeholder="Type a Message..."
        className="message-input"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("Send...");
            handleSendMessage();
          }
        }}
      />
    </div>
  );
};

export default ChatView;
