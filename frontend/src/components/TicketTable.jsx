const TicketTable = ({
  tickets,
  updateStatus,
}) => {

  return (
    <table className="w-full border">

      <thead>

        <tr className="bg-gray-100">

          <th className="border p-2">
            Customer
          </th>

          <th className="border p-2">
            Query
          </th>

          <th className="border p-2">
            Priority
          </th>

          <th className="border p-2">
            Status
          </th>

        </tr>

      </thead>

      <tbody>

        {tickets.map(ticket => (

          <tr key={ticket._id}>

            <td className="border p-2">
              {ticket.customerName}
            </td>

            <td className="border p-2">
              {ticket.query}
            </td>

            <td className="border p-2">
              {ticket.priority}
            </td>

            <td className="border p-2">

              <select
                value={ticket.status}
                onChange={(e) =>
                  updateStatus(
                    ticket._id,
                    e.target.value
                  )
                }
              >

                <option value="OPEN">
                  OPEN
                </option>

                <option value="IN_PROGRESS">
                  IN PROGRESS
                </option>

                <option value="RESOLVED">
                  RESOLVED
                </option>

                <option value="CLOSED">
                  CLOSED
                </option>

              </select>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
};

export default TicketTable;