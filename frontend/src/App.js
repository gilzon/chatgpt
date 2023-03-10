import "./App.css";
import "./normal.css";
import { useState } from "react";


function App() {
  const [input, setInput] = useState("");
  const [chatLog, setchatLog] = useState([
    {
      user: "me",
      message: "Hello",
    },
    { user: "gpt",
    message: "How can i help you today?",}
  ]);

  //clear chats
  function clearChat(){
    setchatLog([]);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew =[...chatLog,{ user: "me", message: `${input}` }];
    await setInput  ("");
    setchatLog(chatLogNew )
const messages =chatLogNew.map((message) => message.message).join("\n");
const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message:messages
      }),
    });
const data= await response.json();
setchatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }])
console.log(data.message);
    
  }
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
            />
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" && (
           <svg
           width="40"
           height="40"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
           strokeWidth="1.5"
           className="h-6 w-6"
         >
           <path
             d="M37.5324 
               16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864
                3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 
                14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782
                 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182
                  28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 
                  38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 
                  35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 "
         
                fill="currentColor"
              ></path>
            </svg>
          )}
        </div>
        <div className="chat-message-text">{message.message}</div>
      </div>
    </div>
  );
};

export default App;
