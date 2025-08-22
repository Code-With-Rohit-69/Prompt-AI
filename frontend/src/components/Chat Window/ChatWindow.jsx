import React, { useContext, useEffect, useState } from "react";
import Style from "./ChatWindow.module.css";
import Chat from "../Chat/Chat";
import { ChevronDown, Plus, Send, User } from "lucide-react";
import { Mycontext } from "../../Context";
import { ScaleLoader } from "react-spinners";

const ChatWindow = () => {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currentThreadId,
    prevChats,
    setPrevChats,
    setNewChat
  } = useContext(Mycontext);

  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currentThreadId,
      }),
    };

    try {
      const response = await fetch("http://localhost:3333/api/chat", options);
      const data = await response.json();
      console.log(data);
      setReply(data.reply);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prev) => [
        ...prev,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    setPrompt("");
  }, [reply]);

  return (
    <div className={Style.chatWindow}>
      <nav className={Style.navbar}>
        <div className={Style.leftSide}>
          <span>PromptAI</span>
          <ChevronDown className={Style.ChevronDown} />
        </div>
        <div className={Style.rightSide}>
          <span className={Style.user}>
            <User size={17} />
          </span>
        </div>
      </nav>

      <div className={Style.chat_section}>
        <Chat />
      </div>

      {loading && (
        <ScaleLoader color="white" className={Style.ScaleLoader}></ScaleLoader>
      )}

      <div className={Style.chat_input}>
        {/* <h1 className={Style.heading}>What's on the agenda today?</h1> */}
        <div className={Style.inputBox}>
          <Plus className={Style.icon} />
          <input
            type="text"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          />
          <Send className={Style.icon} size={20} onClick={getReply} />
        </div>
        <p className={Style.para}>
          Prompt-AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
