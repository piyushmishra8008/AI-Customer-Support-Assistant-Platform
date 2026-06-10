import { useState } from "react";
import api from "../api/axios";

const FloatingChatWidget = () => {

  const [isOpen, setIsOpen] =
    useState(false);

  const [input, setInput] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const sendMessage =
    async () => {

      if (!input.trim()) return;

      const userMsg = {
        sender: "USER",
        content: input,
      };

      setMessages(prev => [
        ...prev,
        userMsg,
      ]);

      try {

        const res =
          await api.post(
            "/chat/ask",
            {
              question: input,
            }
          );

        setMessages(prev => [
          ...prev,
          {
            sender: "AI",
            content:
              res.data.answer,
          },
        ]);

      } catch (err) {

        console.log(err);

      }

      setInput("");
    };

  return (
    <>
      <button
        className="
        fixed
        bottom-5
        right-5
        bg-blue-500
        text-white
        rounded-full
        w-16
        h-16
        "
        onClick={() =>
          setIsOpen(!isOpen)
        }
      >
        Chat
      </button>

      {isOpen && (

        <div
          className="
          fixed
          bottom-24
          right-5
          w-96
          h-[500px]
          bg-white
          border
          shadow-lg
          rounded
          flex
          flex-col
          "
        >

          <div
            className="
            p-4
            border-b
            font-bold
            "
          >
            AI Assistant
          </div>

        
          <div className="flex-1 overflow-y-auto p-3">
  {messages.map((msg, i) => (
    <div key={i} className="mb-2">
      <b>{msg.sender}</b>: {msg.content}
    </div>
  ))}
</div>

{/* Suggested Questions */}
<div className="p-2 flex gap-2 flex-wrap border-t">

  <button
    onClick={() => setInput("Track my order")}
    className="border px-2 py-1 rounded text-sm"
  >
    Track my order
  </button>

  <button
    onClick={() => setInput("Pricing")}
    className="border px-2 py-1 rounded text-sm"
  >
    Pricing
  </button>

  <button
    onClick={() => setInput("Refund policy")}
    className="border px-2 py-1 rounded text-sm"
  >
    Refund policy
  </button>

  <button
    onClick={() => setInput("Contact support")}
    className="border px-2 py-1 rounded text-sm"
  >
    Contact support
  </button>

</div>



          <div className="p-3 flex">

            <input
              className="
              border
              flex-1
              p-2
              "
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
            />

            <button
              onClick={
                sendMessage
              }
              className="
              bg-blue-500
              text-white
              px-4
              "
            >
              Send
            </button>

          </div>

        </div>

      )}
    </>
  );
};

export default FloatingChatWidget;