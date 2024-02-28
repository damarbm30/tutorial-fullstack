import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import "./App.css";

const socket = io("http://localhost:3001");

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [name, setName] = useState("");
  const [typingDisplay, setTypingDisplay] = useState("");

  useEffect(() => {
    socket.emit("findAllMessages", {}, (response) => {
      setMessages(response);
    });

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("typing", ({ name, isTyping }) => {
      if (isTyping) setTypingDisplay(`${name} is typing...`);
      else setTypingDisplay("");
    });

    return () => {
      socket.off("message");
      socket.off("typing");
    };
  }, []);

  const joinRoom = (e) => {
    e.preventDefault();

    socket.emit("join", { name }, () => {
      setIsJoined(true);
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("createMessage", { text }, () => {
      setText("");
    });
  };

  const emitTyping = () => {
    socket.emit("typing", { isTyping: true });
    setTimeout(() => {
      socket.emit("typing", { isTyping: false });
    }, 2000);
  };

  return (
    <main>
      {!isJoined ? (
        <div>
          <form onSubmit={joinRoom}>
            <label>What's your name?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <div>
          <div>
            {messages?.map((message, index) => {
              return (
                <span key={index}>
                  <p>
                    {message.name}: {message.text}
                  </p>
                </span>
              );
            })}
          </div>
          {typingDisplay && <div>{typingDisplay}</div>}
          <hr />
          <div>
            <form onSubmit={sendMessage}>
              <label>Message:</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onInput={() => emitTyping()}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
