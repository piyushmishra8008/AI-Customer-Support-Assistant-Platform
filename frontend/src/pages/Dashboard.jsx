import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

const Dashboard = () => {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    const fetchData = async () => {

      const res =
        await api.get(
          "/analytics/dashboard"
        );

      setStats(
        res.data.analytics
      );

    };

    fetchData();

  }, []);

  if (!stats)
    return <h2>Loading...</h2>;

  return (
    <DashboardLayout>

      <h1 className="text-3xl mb-5">
        Dashboard
      </h1>

      <div className="grid grid-cols-5 gap-4">

        <StatCard
          title="Conversations"
          value={
            stats.totalConversations
          }
        />

        <StatCard
          title="Open Tickets"
          value={
            stats.openTickets
          }
        />

        <StatCard
          title="Resolved Tickets"
          value={
            stats.resolvedTickets
          }
        />

        <StatCard
          title="Escalated"
          value={
            stats.escalatedTickets
          }
        />

        <StatCard
          title="AI Resolution %"
          value={
            stats.aiResolutionRate
          }
        />

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;