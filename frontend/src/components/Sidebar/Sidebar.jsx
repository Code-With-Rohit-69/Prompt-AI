import React, { useContext, useEffect, useState } from "react";
import Style from "./Sidebar.module.css";
import Logo from "../../assets/blacklogo.png";
import { AlignLeft, Ellipsis, NotebookPen, Trash2 } from "lucide-react";
import { Mycontext } from "../../Context";
import { v1 as uuidv1 } from "uuid";

const Sidebar = () => {
  const [sidebarOpen, setSideBarOpen] = useState(true);

  const {
    allthreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrentThreadId,
    setPrevChats,
  } = useContext(Mycontext);

  const getAllThreads = async () => {
    try {
      const res = await fetch("http://localhost:3333/api/thread");
      const data = await res.json();

      setAllThreads(data.threads);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewChat = async () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrentThreadId(uuidv1());
    setPrevChats([]);
    setReply(null);
  };

  const changeThread = async (threadId) => {
    setCurrentThreadId(threadId);
    try {
      const response = await fetch(
        `http://localhost:3333/api/thread/${threadId}`
      );
      const data = await response.json();

      console.log(data);
      setPrevChats(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const res = await fetch(`http://localhost:3333/api/thread/${threadId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);

      getAllThreads();

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  return (
    <aside
      className={
        sidebarOpen ? Style.sidebar_container : Style.sidebar_container_close
      }
    >
      <div className={Style.sidebar_top}>
        <div className={Style.sidebar_top_head}>
          <img src={Logo} alt="" className={Style.Logo} />
          <AlignLeft
            className={Style.icon}
            onClick={() => setSideBarOpen((prev) => !prev)}
          />
        </div>
        <button className={Style.new_chat} onClick={createNewChat}>
          <NotebookPen className={Style.icon} />
          <span>New Chat</span>
        </button>
      </div>
      <div className={Style.sidebar_main}>
        <h3 className={Style.heading}>Chats</h3>
        <ul>
          {allthreads.map((thread) => (
            <li
              key={thread.threadId}
              onClick={() => changeThread(thread.threadId)}
            >
              <a>{thread.title}</a>
              <span className={Style.trash}>
                <Trash2
                  size={15}
                  color="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteThread(thread.threadId);
                  }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={Style.sidebar_footer}>
        <p className={Style.copyright}>
          &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
