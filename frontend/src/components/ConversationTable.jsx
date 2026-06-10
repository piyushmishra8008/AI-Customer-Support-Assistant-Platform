const ConversationTable = ({
  conversations,
  selectConversation,
}) => {

  return (
    <div className="space-y-3">

      {conversations.map(
        (conversation) => (

          <div
            key={
              conversation._id
            }
            className="
              border
              p-3
              rounded
              cursor-pointer
            "
            onClick={() =>
              selectConversation(
                conversation._id
              )
            }
          >

            <h3>
              Conversation
            </h3>

            <p>
              {
                conversation.createdAt
              }
            </p>

          </div>

        )
      )}

    </div>
  );
};

export default ConversationTable;