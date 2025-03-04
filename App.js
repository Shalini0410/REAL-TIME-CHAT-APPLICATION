import './App.css';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';

const socket = io('http://localhost:5001');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('send_message', message);
    setMessage('');
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <input
        type="text"
        value={message}
        placeholder="Enter message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <div>
        <h2>Messages</h2>
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;