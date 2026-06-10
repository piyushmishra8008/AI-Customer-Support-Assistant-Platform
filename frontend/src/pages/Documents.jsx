import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import DashboardLayout from
"../layouts/DashboardLayout";

import DocumentTable from
"../components/DocumentTable";

const Documents = () => {

  const [documents,
    setDocuments] =
      useState([]);

  const [file,
    setFile] =
      useState(null);

  const fetchDocuments =
    async () => {

      try {

        const res =
          await api.get(
            "/documents"
          );

        setDocuments(
          res.data.documents
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchDocuments();

  }, []);

  const uploadDocument =
    async () => {

      try {

        if (!file)
          return alert(
            "Select a file"
          );

        const formData =
          new FormData();

        formData.append(
          "document",
          file
        );

        await api.post(
          "/documents/upload",
          formData
        );

        setFile(null);

        fetchDocuments();

      } catch (error) {

        console.log(error);

      }

    };

  const deleteDocument =
    async (id) => {

      try {

        await api.delete(
          `/documents/${id}`
        );

        fetchDocuments();

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl mb-5">
        Documents
      </h1>

      <div className="mb-6">

        <input
          type="file"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <button
          onClick={
            uploadDocument
          }
          className="
          bg-green-500
          text-white
          px-4
          py-2
          rounded
          ml-3
          "
        >
          Upload
        </button>

      </div>

      <DocumentTable
        documents={
          documents
        }
        deleteDocument={
          deleteDocument
        }
      />

    </DashboardLayout>
  );
};

export default Documents;