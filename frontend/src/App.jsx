import { useState } from 'react'
import './App.css'

function App() {

  const [promptMsg, setPromptMsg] = useState("");
  const [imgURL, setImgURL] = useState("");

  async function sendPrompt() {

    try {
      const res = await fetch("http://localhost:8080/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: promptMsg
        })
      })

      const data = await res.json();
      console.log(data);

      if (data.success) {
        setImgURL(`data:image/png;base64, ${data.image}`); // Convert base64 string to image URL     
      } else {
        console.log(data.message);
      }

    } catch (err) {
      console.log("Frontend Error", err);
    };

  };
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "60px" }}>

        <h1>AI Image Generator</h1>

        <input
          value={promptMsg}
          onChange={(e) => setPromptMsg(e.target.value)}
          placeholder="Enter prompt..."
        />

        <button onClick={sendPrompt}>Generate </button>

        <br/>
        <br/>

        {imgURL && (
          <img
            src={imgURL}
            alt="Generated AI"
            style={{
              width: "300px",
              borderRadius: "10px"
            }}
          />
        )}
     
      </div>
    </>
  )
}

export default App;
