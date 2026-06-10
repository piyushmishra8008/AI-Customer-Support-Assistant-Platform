import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import DashboardLayout from
"../layouts/DashboardLayout";

import ConversationTable from
"../components/ConversationTable";

const Conversations = () => {

  const [
    conversations,
    setConversations
  ] = useState([]);

  const [
    messages,
    setMessages
  ] = useState([]);

  const [
    selectedConversation,
    setSelectedConversation
  ] = useState(null);

  const fetchConversations =
    async () => {

      try {

        const res =
          await api.get(
            "/conversations"
          );

        setConversations(
          res.data.conversations
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchConversations();

  }, []);

  const selectConversation =
    async (id) => {

      try {

        setSelectedConversation(
          id
        );

        const res =
          await api.get(
            `/conversations/${id}/messages`
          );

        setMessages(
          res.data.messages
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl mb-5">
        Conversations
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div>

          <ConversationTable
            conversations={
              conversations
            }
            selectConversation={
              selectConversation
            }
          />

        </div>

        <div
          className="
          border
          p-4
          rounded
          min-h-[500px]
          "
        >

          <h2 className="text-xl mb-4">
            Messages
          </h2>

          {!selectedConversation && (
            <p>
              Select a conversation
            </p>
          )}

          {messages.map(
            (
              message
            ) => (

              <div
                key={
                  message._id
                }
                className={`
                  mb-3
                  ${
                    message.sender ===
                    "USER"
                      ? "text-right"
                      : "text-left"
                  }
                `}
              >

                <span
                  className="
                  border
                  p-2
                  rounded
                  inline-block
                  "
                >

                  <strong>
                    {
                      message.sender
                    }
                    :
                  </strong>

                  {" "}

                  {
                    message.content
                  }

                </span>

              </div>

            )
          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Conversations;