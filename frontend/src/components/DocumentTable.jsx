const DocumentTable = ({
  documents,
  deleteDocument,
}) => {

  return (
    <table className="w-full border">

      <thead>

        <tr className="bg-gray-100">

          <th className="border p-2">
            File Name
          </th>

          <th className="border p-2">
            Status
          </th>

          <th className="border p-2">
            Action
          </th>

        </tr>

      </thead>

      <tbody>

        {documents.map(
          (document) => (

            <tr
              key={
                document._id
              }
            >

              <td className="border p-2">
                {
                  document.originalName
                }
              </td>

              <td className="border p-2">
                {
                  document.status
                }
              </td>

              <td className="border p-2">

                <button
                  onClick={() =>
                    deleteDocument(
                      document._id
                    )
                  }
                  className="
                    bg-red-500
                    text-white
                    px-3
                    py-1
                    rounded
                  "
                >
                  Delete
                </button>

              </td>

            </tr>

          )
        )}

      </tbody>

    </table>
  );
};

export default DocumentTable;