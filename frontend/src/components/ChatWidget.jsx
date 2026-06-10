import {
  useState,
} from "react";

import api from "../api/axios";

const ChatWidget = () => {

  const [input, setInput] =
    useState("");

  const [messages,
    setMessages] =
    useState([]);

  const sendMessage =
    async () => {

      if (!input.trim())
        return;

      const userMessage = {
        role: "user",
        content: input,
      };

      setMessages(
        prev => [
          ...prev,
          userMessage,
        ]
      );

      try {

        const res =
          await api.post(
            "/chat/ask",
            {
              question:
                input,
            }
          );

        const aiMessage = {
          role: "ai",
          content:
            res.data.answer,
        };

        setMessages(
          prev => [
            ...prev,
            aiMessage,
          ]
        );

      } catch (error) {

        console.log(error);

      }

      setInput("");
    };

  return (
    <div
      className="
      border
      rounded
      p-4
      h-[600px]
      flex
      flex-col
      "
    >

      <h2
        className="
        text-xl
        font-bold
        mb-4
        "
      >
        AI Assistant
      </h2>

      <div
        className="
        flex-1
        overflow-y-auto
        space-y-2
        "
      >

        {messages.map(
          (
            message,
            index
          ) => (

            <div
              key={index}
              className={
                message.role ===
                "user"
                  ? "text-right"
                  : "text-left"
              }
            >

              <span
                className="
                inline-block
                border
                px-3
                py-2
                rounded
                "
              >
                {
                  message.content
                }
              </span>

            </div>

          )
        )}

      </div>

      <div
        className="
        flex
        gap-2
        mt-4
        "
      >

        <input
          value={input}
          onChange={(e) =>
            setInput(
              e.target.value
            )
          }
          placeholder="Ask something..."
          className="
            border
            p-2
            flex-1
          "
        />

        <button
          onClick={
            sendMessage
          }
          className="
            bg-blue-500
            text-white
            px-4
            rounded
          "
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default ChatWidget;