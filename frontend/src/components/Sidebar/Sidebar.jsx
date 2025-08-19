import React from "react";
import Style from "./Sidebar.module.css";
import Logo from "../../assets/blacklogo.png";
import { AlignLeft, Ellipsis, NotebookPen } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className={Style.sidebar_container}>
      <div className={Style.sidebar_top}>
        <div className={Style.sidebar_top_head}>
          <img src={Logo} alt="" className={Style.Logo} />
          <AlignLeft className={Style.icon} />
        </div>
        <div className={Style.new_chat}>
          <NotebookPen className={Style.icon} />
          <span>New Chat</span>
        </div>
      </div>
      <div className={Style.sidebar_main}>
        <h3 className={Style.heading}>Chats</h3>
        <ul>
          <li>
            <a>History</a>
            <Ellipsis className={Style.Ellipsis} />  
          </li>
          <li>
            <a>History</a>
            <Ellipsis className={Style.Ellipsis} />  
          </li>
          <li>
            <a>History</a>
            <Ellipsis className={Style.Ellipsis} />  
          </li>
          <li>
            <a>History</a>
            <Ellipsis className={Style.Ellipsis} />  
          </li>
          <li>
            <a>History</a>
            <Ellipsis className={Style.Ellipsis} />  
          </li>
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
