import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

const AIConfig = () => {

  const [formData, setFormData] =
    useState({
      botName: "",
      welcomeMessage: "",
      personality: "",
    });

  useEffect(() => {

    const fetchConfig =
      async () => {

        try {

          const res =
            await api.get("/config");

          setFormData(
            res.data.config
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchConfig();

  }, []);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.put(
          "/config",
          formData
        );

        alert(
          "Configuration Updated"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl mb-5">
        AI Configuration
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="botName"
          value={formData.botName}
          onChange={handleChange}
          placeholder="Bot Name"
          className="border p-2 w-full"
        />

        <textarea
          name="welcomeMessage"
          value={
            formData.welcomeMessage
          }
          onChange={handleChange}
          placeholder="Welcome Message"
          className="border p-2 w-full"
          rows="4"
        />

        <select
          name="personality"
          value={
            formData.personality
          }
          onChange={handleChange}
          className="border p-2 w-full"
        >

          <option value="">
            Select Personality
          </option>

          <option value="Friendly">
            Friendly
          </option>

          <option value="Professional">
            Professional
          </option>

          <option value="Technical">
            Technical
          </option>

        </select>

        <button
          className="
          bg-blue-500
          text-white
          px-4
          py-2
          rounded
          "
        >
          Save
        </button>

      </form>

    </DashboardLayout>
  );
};

export default AIConfig;