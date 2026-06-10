import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import DashboardLayout from
"../layouts/DashboardLayout";

import TicketTable from
"../components/TicketTable";

const Tickets = () => {

  const [tickets,
    setTickets] =
      useState([]);

  const fetchTickets =
    async () => {

      try {

        const res =
          await api.get(
            "/tickets"
          );

        setTickets(
          res.data.tickets
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchTickets();

  }, []);

  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await api.patch(
          `/tickets/${id}`,
          {
            status,
          }
        );

        fetchTickets();

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl mb-5">
        Tickets
      </h1>

      <TicketTable
        tickets={tickets}
        updateStatus={
          updateStatus
        }
      />

    </DashboardLayout>
  );
};

export default Tickets;