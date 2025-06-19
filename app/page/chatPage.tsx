// ~/page/chatPage.tsx
import React, { useState } from "react";

export default function AskGemini() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=AIzaSyBGbgEtONplq47P1ypu30788etWwxNw8hw`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      const data = await res.json();
      if (data.error) {
        setResponse("Алдаа: " + data.error.message);
        return;
      }
      setResponse(data.candidates?.[0]?.content?.parts?.[0]?.text || "Хариу алга.");
    } catch (error) {
      setResponse("Сүлжээний алдаа гарлаа");
    }
  };

  return (
    <div>
      <h2>BumaaGPT</h2>
      <textarea
        rows={4}
        style={{ width: "100%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>Илгээх</button>
      <div>
        <strong>Хариу:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}
