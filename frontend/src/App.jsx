import { useState } from 'react'
import './App.css'

function App() {

  const [message, setMessage] = useState("");

  async function getData() {
    try {
      const res = await fetch("http://localhost:8080/api/test");
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.log("Error: " + err)
    };
  };

  async function sendData() {
    try {
      const res = await fetch("http://localhost:8080/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Lynn"
        })
      });
      const data = await res.json()
      console.log(data);
    } catch (err) {
      console.log("Error: " + err)
    }
  };

  return (
    <>
      <button onClick={getData}>Get Data</button>
      <p>{message}</p>

      <button onClick={sendData}>Send Data</button>
    </>
  )
}

export default App;
