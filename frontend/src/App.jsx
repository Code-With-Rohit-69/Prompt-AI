import ChatWindow from "./components/Chat Window/ChatWindow";
import Sidebar from "./components/Sidebar/Sidebar";
import { Mycontext } from "./Context";
import "./App.css";

const App = () => {
  const providerValues = {};

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
