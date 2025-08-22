import ChatWindow from "./components/Chat Window/ChatWindow";
import Sidebar from "./components/Sidebar/Sidebar";
import { Mycontext } from "./Context";
import "./App.css";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setCurrentThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allthreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currentThreadId,
    setCurrentThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allthreads,
    setAllThreads,
  };

  return (
    <div className="app">
      <Mycontext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </Mycontext.Provider>
    </div>
  );
};

export default App;
