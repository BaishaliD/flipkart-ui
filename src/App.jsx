import { useEffect, useState } from "react";
import "./App.css";
import ChatList from "./components/ChatList/ChatList";
import ChatView from "./components/ChatView/ChatView";

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/codebuds-fk/chat/chats")
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
        localStorage.setItem("chats", JSON.stringify(data));
      });
  }, []);

  // function sendMessage(() => {

  // })

  return (
    <div className="app">
      <ChatList chats={chats} handleSelectChat={handleSelectChat} />
      {selectedChat && <ChatView selectedChat={selectedChat} />}
    </div>
  );
}

export default App;
