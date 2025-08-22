import React, { useState, useEffect } from "react";
import Style from "./Chat.module.css";
import { useContext } from "react";
import { Mycontext } from "../../Context";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const Chat = () => {
  const { newChat, prevChats, reply } = useContext(Mycontext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }

    if (!prevChats.length) {
      return;
    }

    const content = reply.split(" ");

    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;

      if (idx >= content.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  return (
    <>
      {newChat && prevChats.length === 0 && <h1>Start a new chat</h1>}
      <div className={Style.chats}>
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div
            className={chat.role === "user" ? Style.userDiv : Style.gptDiv}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className={Style.userMessage}>{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={rehypeHighlight}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {prevChats.length > 0 && (
          <>
            {latestReply === null ? (
              <div className={Style.gptDiv} key={"latestReply"}>
                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {prevChats[prevChats.length - 1].content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className={Style.gptDiv} key={"latestReply"}>
                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {latestReply}
                </ReactMarkdown>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
