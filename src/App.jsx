import { useEffect, useState } from "react";
import "./App.css";
import ChatList from "./components/ChatList/ChatList";
import ChatView from "./components/ChatView/ChatView";

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [filteredChats, setFilteredChats] = useState([]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const filter = (query) => {
    console.log("Search...");
    setFilteredChats(
      chats.filter(
        (item) =>
          item?.title?.toLowerCase().includes(query?.toLowerCase()) ||
          item?.orderId?.toLowerCase().includes(query?.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/codebuds-fk/chat/chats")
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
        setFilteredChats(data);
        localStorage.setItem("chats", JSON.stringify(data));
      });
  }, []);

  // function sendMessage(() => {

  // })

  return (
    <div className="app">
      <ChatList
        chats={filteredChats}
        handleSelectChat={handleSelectChat}
        filter={filter}
      />
      {selectedChat && <ChatView selectedChat={selectedChat} />}
    </div>
  );
}

export default App;
